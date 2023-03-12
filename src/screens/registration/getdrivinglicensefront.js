import React, {useRef} from 'react';
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
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import HeadStraps from '../straps/headstraps';
import ModalStraps from '../straps/modalstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../services';
import {SafeAreaView} from 'react-native';
import TextRecognition from 'react-native-text-recognition';
import cities from './azcities.json';
import FaceDetection, { FaceDetectorContourMode, FaceDetectorLandmarkMode, FaceContourType } from "react-native-face-detection";

// import Tesseract, {createWorker} from 'tesseract.js';
// import TesseractOcr, {
//   LANG_ENGLISH,
//   useEventListener,
// } from 'react-native-tesseract-ocr';

const DrivinglicensefrontScreen = ({navigation}) => {
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

  //   const workerRef = (useRef < Tesseract.Worker) | (null > null);

  //   React.useEffect(() => {
  //     workerRef.current = createWorker({
  //       //   logger: message => {
  //       //     if ('progress' in message) {
  //       //       console.log(message.progress);
  //       //     }
  //       //   },
  //     });
  //     return () => {
  //       workerRef.current?.terminate();
  //       workerRef.current = null;
  //     };
  //   }, []);

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

  //   useEventListener('onProgressChange', p => {
  //     setProgress(p.percent / 100);
  //   });
  const getcityname = rawcityname => {
    console.log(rawcityname);
    let matchedchars = '',
      CITY = '',
      matchedcities,
      wordcount = rawcityname.trim().split(' ').length;
    rawcityname
      .toLowerCase()
      .split('')
      .forEach(c => {
        matchedchars += c;
        let rgx = new RegExp('^' + matchedchars);
        matchedcities = cities.filter(
          x =>
            rgx.test(x.toLowerCase()) &&
            x.toLowerCase().trim().split(' ').length == wordcount,
        );
        if (matchedcities.length == 1) {
          CITY = matchedcities[0];
        } else {
          CITY = matchedcities.filter(
            x => x.toLowerCase() == rawcityname.toLowerCase(),
          );
        }
      });
    console.log(matchedcities, CITY);
    return CITY;
  };
  const extractUserDetails = l => {
    let details = {
      firstname: '',
      lastname: '',
      dob: '',
      address: '',
      city: '',
    };
    let date1Regex =
      /(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}/g;
    let date2Regex =
      /(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{2}/g;
    let date1 = [],
      date2 = [];
    let cityrgx = new RegExp(/.+?(?=, AZ)/g);
    l.forEach((a, ai) => {
      if (a.toLowerCase().includes('rest none')) {
        //console.log(l[ai+1])
      }
      if (a.match(date1Regex)) {
        // console.log(a.match(date1Regex))
        date1 = [...date1, ...a.match(date1Regex)];
      }
      if (a.match(date2Regex)) {
        //console.log(a.match(date2Regex))
        date2 = [...date2, ...a.match(date2Regex)];
      }
    });
    date1.forEach(d => {
      let isBirthday = false;
      let dregex = new RegExp('^(' + d.slice(0, 6) + ')(' + d.slice(-2) + ')$');
      //console.log(d, dregex)
      date2.forEach(d2 => {
        //console.log(dregex.test(d2))
        isBirthday = isBirthday || dregex.test(d2);
      });
      //console.log("-".repeat(30))
      if (isBirthday) {
        details.dob = d;
      }
    });
    let az_index = l.findIndex(x => x.toLowerCase().includes('az'));
    let name_address = l[az_index].split('\n');
    name_address = l[az_index]
      .split('\n')
      .slice(
        0,
        l[az_index].split('\n').findIndex(x => x.toLowerCase().includes('az')) +
          1,
      );
    //.slice(-4);
    console.log(
      'name_address: ',
      name_address,
      l[az_index].split('\n').findIndex(x => x.toLowerCase().includes('az')),
    );
    if (name_address.length < 4) {
      // let rest = l[az_index - 1]
      //   .split('\n')
      //   .slice(-1 * (4 - name_address.length));
      console.log(
        extract_name_address(l, az_index - 1, 4 - name_address.length),
      );
      name_address = [
        ...extract_name_address(l, az_index - 1, 4 - name_address.length),
        ...name_address,
      ];
    }
    details.firstname = name_address[1].replace(/(2 )|(2)/g, '');
    details.lastname = name_address[0].replace(/(1 )|(1)/g, '');
    details.address = name_address[2].replace(/^8 /, '');
    details.city = getcityname(name_address[3].match(cityrgx)[0]);
    console.log(name_address, details);
    console.log("First Name: " + details.firstname)
    console.log("Last Name: " + details.lastname)
    console.log("Address: " + details.address)
    console.log("City: " + details.city)
  };
  const extract_name_address = (l, index, rest_length) => {
    let rest = l[index].split('\n').slice(-1 * rest_length);
    console.log(rest, rest_length);
    if (rest.length < rest_length) {
      rest = [
        ...extract_name_address(l, index - 1, rest_length - rest.length),
        ...rest,
      ];
    }
    return rest;
  };

  const extractText = async imageUri => {
    // storeagePerm();
    const result = await TextRecognition.recognize(imageUri, {
      visionIgnoreThreshold: 0.5,
    });
    console.log(result);
    // const worker = workerRef.current;
    // await worker.load();
    // await worker.loadLanguage('eng');
    // await worker.initialize('eng');
    // const response = await worker.recognize(imageUri);
    // console.log(response.data.text);
    // console.log(response.data);
    // const tessOptions = {level: LEVEL_WORD};
    // TesseractOcr.recognizeTokens(imageSource, LANG_ENGLISH, tessOptions);
    extractUserDetails(result);
  };

  const handlesubmitform = async () => {
    if (resourcePath.mime === undefined) {
      setimageuploaderror('Driving license is required!');
    } else {
      setspinner(true);
      setimageuploaderror('');
      console.log(resourcePath);
      extractText(resourcePath.path);
      setspinner(false);
      return;

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
        .post('mobile_registartion/license_front/', uploadData, {
          headers: headers,
        })
        .then(res => {
          if (res.data.status === 201) {
            navigation.navigate('Drivinglicensebackscreen');
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
          FRONT
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
              source={require('../../../assets/img/Rectangle.png')}
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

export default DrivinglicensefrontScreen;

// let details = {
// 	firstname: "",
// 	lastname: "",
// 	birthday: "",
// 	address: "",
// 	email: ""
// }
