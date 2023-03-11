import React from 'react';
import { Text, View, ScrollView, ToastAndroid, TextInput, Pressable, Image, TouchableOpacity, PermissionsAndroid, Alert, BackHandler, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import HeadStraps from '../straps/headstraps';
import OTPTextView from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';
import ModalStraps from '../straps/modalstraps';
import Snackbar from 'react-native-snackbar';

const MobileEditotpScreen = ({ navigation }) => {

    const otpInput = React.useRef(null);
    const [customerphone, setcustomerphone] = React.useState("");
    const [otpcode, setotpcode] = React.useState("");
    const [otperrormsg, setotperrormsg] = React.useState("");
    const [spinner, setspinner] = React.useState(false);

    React.useEffect(() => {
        async function getdata() {
            const updatedmobile = await AsyncStorage.getItem('updatedmobile');
            setcustomerphone(updatedmobile);
        }
        getdata();
    }, []);

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

    const handleresend = async () => {
        const userid = await AsyncStorage.getItem('userid');
        const updatedmobileemail = await AsyncStorage.getItem('updatedmobileemail');
        setspinner(true);
        let otp_json = {
            "customerId": userid,
            "customer_phone": customerphone,
            "mail": updatedmobileemail,
        }
        axiosInstance.post('mobile_profile/mobile_update/', otp_json)
            .then((res) => {
                if (res.data.status === 201) {
                    setotpcode('');
                    if (Platform.OS != 'android') {
                        Snackbar.show({
                            text: res.data.message,
                            duration: Snackbar.LENGTH_SHORT,
                            action: {
                                text: 'Okay',
                                textColor: 'green',
                                onPress: () => { /* Do something. */ },
                            },
                        });
                    } else {
                        ToastAndroid.showWithGravity(
                            res.data.message,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    }
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
                console.log('');
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
        // setModalVisibletwo(true);
        // openModaltwo();
        var validate = validateform();
        if (validate) {
            const userid = await AsyncStorage.getItem('userid');
            setspinner(true);
            setotperrormsg('');
            let JsonValue = {
                "customerId": userid,
                "mobile_no": customerphone,
                "otpcode": otpcode,
            }
            axiosInstance.post('mobile_profile/verify_mobile/', JsonValue)
                .then((res) => {
                    if (res.data.status === 201) {
                        setandredirect();
                        if (Platform.OS != 'android') {
                            Snackbar.show({
                                text: res.data.message,
                                duration: Snackbar.LENGTH_SHORT,
                                action: {
                                    text: 'Okay',
                                    textColor: 'green',
                                    onPress: () => { /* Do something. */ },
                                },
                            });
                        } else {
                            ToastAndroid.showWithGravity(
                                res.data.message,
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                            );
                        }
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

    async function setandredirect() {
        await AsyncStorage.removeItem('updatedmobile');
        await AsyncStorage.removeItem('updatedmobileemail');
        navigation.navigate('Profilescreen');
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='true' display='' type='' distplaytext='' icon='yes' btn_text='' />
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
                    <Text style={[styles.headerlabletext, styles.fs_32]}>Registration</Text>
                </View>

                <View style={[styles.formgroup, styles.mT_04]}>
                    <Text style={[styles.textlable, styles.fc_brown]}>We have sent a one time code to your phone. Please enter the code in the below space to confirm your phone</Text>
                </View>
                <View style={[styles.formgroup, styles.mT_01]}>
                    <Text onPress={() => handlechange()} style={[styles.textlable, styles.fc_brown]}>{customerphone} &nbsp;
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

                <View style={[styles.centeredView]}>
                    <Pressable style={[styles.button, styles.mB_05]} onPress={() => handlesubmitform()}>
                        <Text style={styles.btntext}>{'Submit'}</Text>
                    </Pressable>
                </View>

            </ScrollView>
            {/* Main content end */}

            {/* Bottom Strap design start */}
            <BottomStraps />
            {/* Bottom Strap design end */}

        </SafeAreaView>
    );
};

export default MobileEditotpScreen;
