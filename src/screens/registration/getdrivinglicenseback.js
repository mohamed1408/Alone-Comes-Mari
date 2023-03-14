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

const DrivinglicensebackScreen = ({navigation}) => {
  const [userid, setuserid] = React.useState('');
  const [useremail, setuseremail] = React.useState('');
  React.useEffect(() => {
    async function getdata() {
      const userid = await AsyncStorage.getItem('userid');
      const useremail = await AsyncStorage.getItem('useremail');
      setuserid(userid);
      setuseremail(useremail);
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
        width: 3300,
        height: 2300,
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
        width: 3300,
        height: 2300,
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
    if (resourcePath.mime === undefined) {
      setimageuploaderror('Driving license is required!');
    } else {
      setspinner(true);
      setimageuploaderror('');

      let uploadData = new FormData();
      uploadData.append('customerId', userid);
      uploadData.append('email', useremail);
      uploadData.append('customerProof', {
        type: resourcePath.mime,
        uri: resourcePath.path,
        name: resourcePath.path.split('/').pop(),
      });

      const headers = {
        'Content-Type': 'multipart/form-data;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      };
      axiosInstance
        .post('mobile_registartion/license_back/', uploadData, {
          headers: headers,
        })
        .then(res => {
          if (res.data.status === 201) {
            navigation.navigate('Registrationscreen'); // ('Registerconfirmscreen');
          } else {
            Alert.alert('Error', res.data.message, [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
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

        <View style={[styles.formgroup, styles.mT_02, styles.mB_0]}>
          <Text
            style={[
              styles.textlable,
              styles.fc_brown,
              styles.mB_0,
              styles.pb_02,
            ]}>
            Upload front and back of driving license
          </Text>
        </View>

        <Text
          style={[
            styles.text_center,
            styles.fs_30,
            styles.fc_brown,
            styles.mB_015,
            styles.mT_01,
          ]}>
          BACK
        </Text>

        {resourcePath.path !== undefined ? (
          <TouchableOpacity style={styles.propic}>
            <Image
              source={{uri: resourcePath.path}}
              style={styles.licenseimage_d}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.propic}>
            <Image
              source={require('../../../assets/img/dr_back.png')}
              style={styles.licenseimage_d}
            />
          </TouchableOpacity>
        )}
        {imageuploaderror !== '' ? (
          <>
            <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>
              {imageuploaderror}
            </Text>
          </>
        ) : (
          <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>
            {''}
          </Text>
        )}

        <Pressable
          style={[styles.propic, styles.mT_02]}
          onPress={() => requestCameraPermission()}>
          <View style={styles.btnupload_c}>
            <Text style={[styles.mT_038, styles.text_center, styles.fs_22]}>
              CAPTURE
            </Text>
          </View>
        </Pressable>
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
        <View style={[styles.container, modalBackgroundStyle]}>
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

export default DrivinglicensebackScreen;
