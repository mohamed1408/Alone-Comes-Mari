import React from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Image, Alert, BackHandler, ToastAndroid, ActivityIndicator, SafeAreaView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import CheckBox from 'react-native-checkbox/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';

const PasswordresetScreen = ({ navigation }) => {

    const [customeremail, setcustomeremail] = React.useState("");
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

    const [spinner, setspinner] = React.useState(false);
    const [password, onChangepassword] = React.useState("");
    const [cpassword, onChangecpassword] = React.useState("");
    const [formerror, setformerror] = React.useState({
        password: '',
        cpassword: ''
    });

    const validateform = () => {
        let passworderrormsg = '';
        let cpassworderrormsg = '';
        var mailformat = /(^\w.*@\w+\.\w)/;
        const re = /^[0-9\b]+$/;
        const re_text = /^[A-Za-z ]+$/;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#%&])(?=.{8,})");

        if (password === '') {
            passworderrormsg = 'Password is required!';
        }
        else if (password.length < 8) {
            passworderrormsg = "Password must have at least 8 characters";
        }
        else if (!strongRegex.test(password)) {
            passworderrormsg = "use special character, number and capital letter";
        }

        if (password !== cpassword) {
            cpassworderrormsg = "The password and confirmation password do not match.";
        }

        if (passworderrormsg || cpassworderrormsg) {
            setformerror({
                password: passworderrormsg,
                cpassword: cpassworderrormsg
            });
            return false;
        }
        else {
            return true;
        }
    }

    const handlesubmitform = async () => {
        var validate = validateform();
        if (validate) {
            const reset_emailid = await AsyncStorage.getItem('reset_emailid');
            setspinner(true);
            setformerror({
                password: '',
                cpassword: '',
            });
            let JsonValue = {
                "email": reset_emailid,
                "reset_password": password,
                "confirm_reset_password": cpassword
            }
            axiosInstance.post('mobile_resetpassword/reset_password/', JsonValue)
                .then((res) => {
                    if (res.data.status === 201) {
                        setspinner(false);
                        Alert.alert(
                            "Info",
                            res.data.message,
                            [
                                {
                                    text: "OK", onPress: () => {
                                        setandredirect();
                                    }
                                }
                            ]
                        );
                    }
                    else {
                        setspinner(false);
                        Alert.alert(
                            "Error",
                            res.data.message,
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
                })
                .catch(() => {
                    setspinner(false);
                    console.log('');
                });
        }
    }

    async function setandredirect() {
        setspinner(true);
        // navigation.navigate('Otpscreen');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Loginscreen' }],
        });
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
                    <Text style={[styles.headerlabletext, styles.fs_32]}>Reset Password</Text>
                </View>


                <View style={[styles.formgroup, styles.mT_07]}>
                    <Text style={styles.textlable}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangepassword}
                        secureTextEntry
                        value={password}
                        placeholder="Password"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.password !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.password}</Text>
                            </>
                            : null
                    }
                </View>
                <View style={[styles.formgroup, styles.mT_05]}>
                    <Text style={styles.textlable}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangecpassword}
                        value={cpassword}
                        secureTextEntry
                        placeholder="Confirm password"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.cpassword !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.cpassword}</Text>
                            </>
                            : null
                    }
                </View>
                <View style={[styles.loginbtn, styles.mB_006]}>
                    <Pressable style={[styles.button, styles.loginbutton]} onPress={() => handlesubmitform()}>
                        <Text style={styles.btntext}> {'Update >'}</Text>
                    </Pressable>
                </View>

                {/* <View style={[styles.registernextbtn, styles.mB_006]}>
                    <Pressable style={styles.button} onPress={() => handlesubmitform()}>
                        <Text style={styles.btntext}>{'Next >'}</Text>
                    </Pressable>
                </View> */}

            </ScrollView>
            {/* Main content end */}

            {/* Bottom Strap design start */}
            <BottomStraps />
            {/* Bottom Strap design end */}
        </SafeAreaView>
    );
};

export default PasswordresetScreen;
