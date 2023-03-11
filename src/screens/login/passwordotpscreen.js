import React from 'react';
import { Text, View, ScrollView, Modal, TextInput, Pressable, Image, TouchableOpacity, PermissionsAndroid, Alert, BackHandler, ActivityIndicator, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import HeadStraps from '../straps/headstraps';
import OTPTextView from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';
import ModalStraps from '../straps/modalstraps';

const PasswordOtpScreen = ({ navigation }) => {

    const otpInput = React.useRef(null);

    const clearText = () => {
        otpInput.current.clear();
    }

    const setText = () => {
        otpInput.current.setValue("1234");
    }

    const [customeremail, setcustomeremail] = React.useState("");
    const [otpcode, setotpcode] = React.useState("");
    const [otperrormsg, setotperrormsg] = React.useState("");
    const [spinner, setspinner] = React.useState(false);


    React.useEffect(() => {

        async function getdata() {
            const reset_emailid = await AsyncStorage.getItem('reset_emailid');
            setcustomeremail(reset_emailid);
        }
        getdata();

        // Exit app event handler
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            backHandler.remove();
        }
    }, []);

    const backAction = () => {
        if (!navigation.canGoBack()) {
            Alert.alert("Hold on!", "Are you sure do you want to exit?", [
                {
                    text: "No",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
        else {
            return false;
        }
    };

    const handlechange = () => {
        if (!navigation.canGoBack()) {
            Alert.alert("Hold on!", "Are you sure do you want to exit?", [
                {
                    text: "No",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
        }
        else {
            navigation.goBack();
        }
    }

    const handleresend = () => {
        setspinner(true);
        let otp_json = {
            "email": customeremail,
        }
        axiosInstance.post('mobile_resetpassword/check/', otp_json)
            .then((res) => {
                if (res.data.status === 201) {
                    Alert.alert(
                        "Info",
                        res.data.message,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
                else {
                    Alert.alert(
                        "Error",
                        res.data.message,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
                setspinner(false);
            })
            .catch(() => {
                setspinner(false);
            });
    }

    const handleTextChange = (e) => {
        setotpcode(e);
    }

    const validateform = () => {
        let otperrormsg_w = '';
        if (otpcode === '') {
            otperrormsg_w = 'OTP code is required!';
        }
        else if (otpcode.length !== 6) {
            otperrormsg_w = 'OTP code is invalid!';
        }

        if (otperrormsg_w) {
            setotperrormsg(otperrormsg_w);
            return false;
        }
        else {
            return true;
        }
    }

    const handlesubmitform = async () => {

        var validate = validateform();
        if (validate) {
            setspinner(true);
            setotperrormsg('');
            let JsonValue = {
                "email": customeremail,
                "otp": otpcode,
            }
            axiosInstance.post('mobile_resetpassword/verify_otp/', JsonValue)
                .then((res) => {
                    if (res.data.status === 201) {
                        setandredirect(customeremail);
                    }
                    else {
                        Alert.alert(
                            "Error",
                            res.data.message,
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
                    setspinner(false);
                })
                .catch(() => {
                    setspinner(false);
                });
        }
    }

    async function setandredirect(Value) {
        await AsyncStorage.setItem('reset_emailid', Value);
        navigation.navigate('Passwordresetscreen');
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='true' display='' type='' distplaytext='' icon='no' />
            {
                spinner === true ?
                    <View style={styles.spinnerView}>
                        <ActivityIndicator size="large" color="#FFFF" />
                    </View>
                    :
                    null
            }
            {/* Main content start */}
            <ScrollView
                style={styles.maincontent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.headerlable}>
                    <Text style={[styles.headerlabletext, styles.fs_32]}>Forgot password</Text>
                </View>

                <View style={[styles.formgroup, styles.mT_04]}>
                    <Text style={[styles.textlable, styles.fc_brown]}>We have sent a one time code to your email. Please enter the code in the below space to confirm your email</Text>
                </View>
                <View style={[styles.formgroup, styles.mT_01]}>
                    <Text onPress={() => handlechange()} style={[styles.textlable, styles.fc_brown]}>{customeremail} &nbsp;
                        <Text style={[styles.fs_22, styles.color_b]}>Change</Text>
                    </Text>
                </View>
                <View style={[styles.formgroup, styles.mT_01, styles.formgroup_otp]}>
                    <OTPTextView
                        handleTextChange={(e) => handleTextChange(e)}
                        defaultValue=""
                        textInputStyle={styles.otpbox}
                        tintColor={'#5B4C51'}
                        offTintColor={'#5B4C51'}
                        inputCount={6}
                        inputCellLength={1}
                        containerStyle={styles.otpcontainer}
                        keyboardType="numeric"
                    />
                    {
                        otperrormsg !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{otperrormsg}</Text>
                            </>
                            : null
                    }
                </View>
                <View style={[styles.formgroup, styles.mT_02]}>
                    <Text style={[styles.textlable, styles.color_b, styles.text_center]} onPress={() => handleresend()} >
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

        </SafeAreaView>
    );
};

export default PasswordOtpScreen;
