import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import HeadStraps from '../straps/headstraps';
import OTPTextView from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../services';
import ModalStraps from '../straps/modalstraps';

const OtpScreen = ({navigation}) => {
  const otpInput = React.useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };

  const [customerphone, setcustomerphone] = React.useState('');
  const [customeremail, setcustomeremail] = React.useState('');
  const [otpcode, setotpcode] = React.useState('');
  const [otperrormsg, setotperrormsg] = React.useState('');
  const [registerdata, setregisterdata] = React.useState({});
  const [spinner, setspinner] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibletwo, setModalVisibletwo] = React.useState(false);

  React.useEffect(() => {
    async function getdata() {
      const userid = await AsyncStorage.getItem('userid');
      const jsonValue = await AsyncStorage.getItem('register_data');
      const register_data = jsonValue != null ? JSON.parse(jsonValue) : null;
      setcustomerphone(register_data.customer_phone);
      setcustomeremail(register_data.email);
      setregisterdata(register_data);
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

  const handlechange = () => {
    if (!navigation.canGoBack()) {
      Alert.alert('Hold on!', 'Are you sure do you want to exit?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
    } else {
      navigation.goBack();
    }
  };

  const handleresend = () => {
    setspinner(true);
    let otp_json = {
      customer_phone: customerphone,
      emailid: customeremail,
    };
    axiosInstance
      .post('mobile_registartion/send_otp/', otp_json)
      .then(res => {
        if (res.data.status === 201) {
          Alert.alert('Info', res.data.message, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else {
          Alert.alert('Error', res.data.message, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        setspinner(false);
      })
      .catch(() => {
        setspinner(false);
      });
  };

  const handleTextChange = e => {
    setotpcode(e);
  };

  const validateform = () => {
    let otperrormsg_w = '';
    if (otpcode === '') {
      otperrormsg_w = 'OTP code is required!';
    } else if (otpcode.length !== 6) {
      otperrormsg_w = 'OTP code is invalid!';
    }

    if (otperrormsg_w) {
      setotperrormsg(otperrormsg_w);
      return false;
    } else {
      return true;
    }
  };

  const handlesubmitform = async () => {
    // setModalVisibletwo(true);
    // openModaltwo();
    var validate = validateform();
    if (validate) {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      setspinner(true);
      setotperrormsg('');
      registerdata.otpcode = otpcode;
      registerdata.fcm_token = fcmToken;
      axiosInstance
        .post('mobile_registartion/insert/', registerdata)
        .then(res => {
          if (res.data.status === 201) {
            setandredirect(res.data.last_insert_id, res.data.email_id);
          } else {
            Alert.alert('Error', res.data.message, [
              {text: 'OK', onPress: () => console.log('OK Pressed')}, // setandredirect("0", registerdata.email) }
            ]);
          }
          setspinner(false);
        })
        .catch(() => {
          setspinner(false);
        });
    }
  };

  async function setandredirect(Value, email_id) {
    await AsyncStorage.setItem('userid', Value);
    await AsyncStorage.setItem('useremail', email_id);
    openModaltwo();
  }

  function openModaltwo() {
    setModalVisibletwo(true);
  }

  function closeModaltwo() {
    setModalVisibletwo(false);
    navigation.navigate('Profilepicscreen');
  }

  var modalBackgroundStyle = {
    backgroundColor: 'rgba(130, 200, 192, 0.4)',
  };

  var innerContainerTransparentStyle = {backgroundColor: '#fff'};

  return (
    <SafeAreaView style={[styles.body]}>
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

        <View style={[styles.formgroup, styles.mT_04]}>
          <Text style={[styles.textlable, styles.fc_brown]}>
            We have sent a one time code to your phone. Please enter the code in
            the below space to confirm your phone
          </Text>
        </View>
        <View style={[styles.formgroup, styles.mT_01]}>
          <Text
            onPress={() => handlechange()}
            style={[styles.textlable, styles.fc_brown]}>
            {customerphone} &nbsp;
            <Text style={[styles.fs_22, styles.color_b]}>Change</Text>
          </Text>
        </View>
        <View style={[styles.formgroup, styles.mT_01, styles.formgroup_otp]}>
          <OTPTextView
            handleTextChange={e => handleTextChange(e)}
            defaultValue=""
            textInputStyle={styles.otpbox}
            tintColor={'#5B4C51'}
            offTintColor={'#5B4C51'}
            inputCount={6}
            inputCellLength={1}
            containerStyle={styles.otpcontainer}
            keyboardType="numeric"
          />
          {otperrormsg !== '' ? (
            <>
              <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>
                {otperrormsg}
              </Text>
            </>
          ) : null}
        </View>
        <View style={[styles.formgroup, styles.mT_02]}>
          <Text
            style={[styles.textlable, styles.color_b, styles.text_center]}
            onPress={() => handleresend()}>
            Resend again
          </Text>
        </View>
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
        visible={modalVisibletwo}
        onRequestClose={() => {
          closeModaltwo();
        }}>
        <View
          style={[styles.container, modalBackgroundStyle, styles.mymodal_cont]}>
          <View style={[innerContainerTransparentStyle, styles.modal_body]}>
            <View style={[styles.modal_body_cnt, styles.mT_03]}>
              <Text
                style={[
                  styles.modal_body_txt,
                  styles.text_center,
                  styles.fc_brown,
                ]}>
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

export default OtpScreen;
