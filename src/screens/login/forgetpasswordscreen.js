import React from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Image, Alert, BackHandler, ToastAndroid, ActivityIndicator, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';
import { Platform } from 'react-native';
import Snackbar from 'react-native-snackbar';

const ForgetpasswordScreen = ({ navigation }) => {


    React.useEffect(() => {
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

    const [email, onChangeemail] = React.useState("");
    const [spinner, setspinner] = React.useState(false);


    const [formerror, setformerror] = React.useState({
        email: ''
    });

    const validateform = () => {
        let emailerrormsg = '';

        if (email === '') {
            emailerrormsg = 'Email is required!';
        }

        if (emailerrormsg) {
            setformerror({
                email: emailerrormsg
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
            let fcmToken = await AsyncStorage.getItem('fcmToken');
            setspinner(true);
            setformerror({
                email: ''
            });
            let JsonValue = {
                "email": email
            }

            console.log(JsonValue);
            axiosInstance.post('mobile_resetpassword/check/', JsonValue)
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
        await AsyncStorage.setItem('reset_emailid', email);
        navigation.navigate('Passwordotpscreen');
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

                <View style={[styles.formgroup, styles.mT_07, styles.mB_02]}>
                    <Text style={[styles.textlable, styles.mB_02]}>Enter your email for the verification process we will send 6 digits code to your email </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeemail}
                        keyboardType='email-address'
                        value={email}
                        placeholder="Email"
                        placeholderTextColor='#fff'
                    />

                    {
                        formerror.email !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext]}>{formerror.email}</Text>
                            </>
                            : null
                    }
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

export default ForgetpasswordScreen;
