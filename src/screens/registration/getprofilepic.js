import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import HeadStraps from '../straps/headstraps';
import ModalStraps from '../straps/modalstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../services';

const ProfilepicScreen = ({navigation}) => {
  const [userid, setuserid] = React.useState('');
  const [useremail, setuseremail] = React.useState('');

  React.useEffect(() => {
    async function getdata() {
      const userid = await AsyncStorage.getItem('userid');
      const useremail = await AsyncStorage.getItem('useremail');
      setuserid(userid);
      setuseremail(useremail);
      profilePicFromLicense();
    }
    getdata();

    // Exit app event handler
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  const backAction = () => {
    if (!navigation.canGoBack()) {
      Alert.alert('Hold on!', 'Are you sure do you want to exit?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    } else {
      return false;
    }
  };

  const [resourcePath, setresourcePath] = React.useState({});
  const [imageuploaderror, setimageuploaderror] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibletwo, setModalVisibletwo] = React.useState(false);
  const [spinner, setspinner] = React.useState(false);

  function requestCameraPermission() {
    setModalVisible(true);
  }

  const profilePicFromLicense = async () => {
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
      let imageUri = await AsyncStorage.getItem('license_front_image_path');
      ImagePicker.openCropper({
        width: 3000,
        height: 3000,
        path: imageUri,
        cropperCircleOverlay: true,
        cropping: true,
        cropperToolbarTitle: 'Align the face inside the circle',
      }).then(
        res => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = res;
            setresourcePath(source);
            setModalVisible(false);
          }
        },
        err => {
          console.log(err);
        },
      );
    } else {
      console.log('Camera permission denied');
    }
  };

  const opengallery = async () => {
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.openPicker({
        width: 3000,
        height: 3000,
        cropping: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      })
        .then(res => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = res;
            setresourcePath(source);
            setModalVisible(false);
          }
        })
        .catch(e => {
          setModalVisible(false);
        });
    } else {
      console.log('Camera permission denied');
    }
  };

  const opencamera = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.openCamera({
        width: 3000,
        height: 3000,
        cropping: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
        useFrontCamera: true,
      })
        .then(res => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = res;
            setresourcePath(source);
            setModalVisible(false);
          }
        })
        .catch(e => {
          setModalVisible(false);
        });
    } else {
      console.log('Camera permission denied');
    }
  };

  function closeModal() {
    setModalVisible(false);
  }

  function openModaltwo() {
    setModalVisibletwo(true);
  }

  function closeModaltwo() {
    setModalVisibletwo(false);
    // navigation.navigate('Otpscreen');
  }

  var modalBackgroundStyle = {
    backgroundColor: 'rgba(130, 200, 192, 0.4)',
  };

  var innerContainerTransparentStyle = {backgroundColor: '#fff'};

  const handlesubmitform = async () => {
    // navigation.navigate('Drivinglicensefrontscreen');
    if (resourcePath.mime === undefined) {
      setimageuploaderror('Profile image is required!');
    } else {
      setimageuploaderror('');
      setspinner(true);
      let uploadData = new FormData();
      uploadData.append('customerId', userid);
      uploadData.append('email', useremail);
      uploadData.append('customerimg', {
        type: resourcePath.mime,
        uri: resourcePath.path,
        name: resourcePath.path.split('/').pop(),
      });

      const headers = {
        'Content-Type': 'multipart/form-data;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      };
      axiosInstance
        .post('mobile_registartion/img/', uploadData, {headers: headers})
        .then(res => {
          if (res.data.status === 201) {
            navigation.navigate('Drivinglicensefrontscreen');
          } else {
            Alert.alert('Error', res.data.message, [
              {text: 'OK', onPress: () => console.log('OK Pressed1')},
            ]);
          }
          setspinner(false);
        })
        .catch(() => {
          setspinner(false);
          console.log('error data');
        });
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <Header
        navigation={navigation}
        backvisible="true"
        display=""
        type=""
        distplaytext=""
        icon="no"
      />
      {spinner === true ? (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#FFFF" />
        </View>
      ) : null}
      {/* Main content start */}
      <ScrollView
        style={styles.maincontent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.headerlable}>
          <Text style={[styles.headerlabletext, styles.fs_32]}>
            Registration
          </Text>
        </View>

        <View style={[styles.headerlable]}>
          <Text style={[styles.headerlabletext, styles.mB_06, styles.ls_0]}>
            Add a Groovy Picture of You
          </Text>
        </View>

        {resourcePath.path !== undefined ? (
          <TouchableOpacity
            style={styles.propic}
            onPress={requestCameraPermission}>
            <Image
              source={{uri: resourcePath.path}}
              style={styles.proimage_d}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.propic}
            onPress={requestCameraPermission}>
            <Image
              source={require('../../../assets/img/propic.png')}
              style={styles.proimage_d}
            />
          </TouchableOpacity>
        )}
        {imageuploaderror !== '' ? (
          <>
            <Text style={[styles.text_center, styles.errortext, styles.mT_03]}>
              {imageuploaderror}
            </Text>
          </>
        ) : (
          <Text style={[styles.text_center, styles.errortext, styles.pb_02]}>
            {''}
          </Text>
        )}
      </ScrollView>
      {/* Main content end */}

      {/* button start here */}
      <View style={styles.nextbtn}>
        <Pressable style={styles.button} onPress={() => handlesubmitform()}>
          <Text style={styles.btntext}>{'Next >'}</Text>
        </Pressable>
      </View>
      {/* button end here */}

      {/* Bottom Strap design start */}
      <BottomStraps />
      {/* Bottom Strap design end */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}>
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[innerContainerTransparentStyle, styles.modal_body]}>
            <View style={styles.pd_20}>
              <Text style={[styles.fs_26, styles.fw_bold, styles.fc_brown]}>
                Select Image
              </Text>
              <View style={[styles.imageselectoption, styles.mT_04]}>
                <Pressable onPress={() => opengallery()}>
                  <Text style={[styles.fs_22, styles.fc_blue]}>
                    Choose from gallery
                  </Text>
                </Pressable>
              </View>
              <View style={[styles.imageselectoption]}>
                <Pressable onPress={() => opencamera()}>
                  <Text style={[styles.fs_22, styles.fc_blue]}>
                    Take a photo
                  </Text>
                </Pressable>
              </View>
              <View style={[styles.imageselectoption, styles.bb_0]}>
                <Pressable onPress={() => closeModal()}>
                  <Text style={[styles.fs_22, styles.fc_blue]}>Cancle</Text>
                </Pressable>
              </View>
            </View>
            <ModalStraps />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibletwo}
        onRequestClose={() => {
          closeModaltwo();
        }}>
        <View
          style={[styles.container, modalBackgroundStyle, styles.mymodal_cont]}>
          <View style={[innerContainerTransparentStyle, styles.modal_body]}>
            <View style={styles.modal_body_cnt}>
              <Text style={[styles.modal_body_txt, styles.fc_brown]}>
                We have sent a link to your email. Please click on the link to
                confirm your email
              </Text>
              <Pressable onPress={() => closeModaltwo()}>
                <Text
                  style={[
                    styles.modal_body_txt,
                    styles.mT_04,
                    styles.fs_45,
                    styles.fc_brown,
                  ]}>
                  ok
                </Text>
              </Pressable>
            </View>
            <ModalStraps />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfilepicScreen;
