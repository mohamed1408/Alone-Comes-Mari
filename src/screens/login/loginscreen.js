import React from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Image, Alert, BackHandler, ToastAndroid, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';
import Snackbar from 'react-native-snackbar';

const LoginScreen = ({ navigation }) => {


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

    const [username, onChangeusername] = React.useState("");
    const [password, onChangepassword] = React.useState("");
    const [spinner, setspinner] = React.useState(false);

    function handlenavigate() {
        navigation.navigate('Drivinglicensefrontscreen');
    }

    const [formerror, setformerror] = React.useState({
        username: '',
        password: ''
    });

    const validateform = () => {
        let usernameerrormsg = '';
        let passworderrormsg = '';

        if (username === '') {
            usernameerrormsg = 'User name is required!';
        }
        if (password === '') {
            passworderrormsg = 'Password is required!';
        }

        if (usernameerrormsg || passworderrormsg) {
            setformerror({
                username: usernameerrormsg,
                password: passworderrormsg
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
                username: '',
                password: ''
            });
            let JsonValue = {
                "username": username,
                "password": password,
                "fcmtoken": fcmToken
            }

            console.log(JsonValue);
            axiosInstance.post('mobile_login/', JsonValue)
                .then((res) => {
                    if (res.data.status === 201) {
                        setandredirect(res.data.userid, res.data.cust_image, res.data.proof_front, res.data.proof_back);
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

    async function setandredirect(userid, cust_image, proof_front, proof_back) {
        setspinner(true);
        await AsyncStorage.setItem('loggedin', 'true');
        await AsyncStorage.setItem('userid', userid);
        if (cust_image === null || cust_image === '') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Profilepicscreen' }],
            });
        }
        else if (proof_front === null || proof_front === '') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Drivinglicensefrontscreen' }],
            });
        }
        else if (proof_back === null || proof_back === '') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Drivinglicensebackscreen' }],
            });
        }
        else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Homescreen' }],
            })
        }
        // navigation.navigate('Homescreen');
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='false' display='' type='' distplaytext='' icon='no' />
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
                    <Text style={[styles.headerlabletext, styles.fs_32]}>Welcome!</Text>
                </View>

                <View style={[styles.formgroup, styles.mT_07]}>
                    <Text style={styles.textlable}>A unique user name for you!</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeusername}
                        value={username}
                        placeholder="username"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.username !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.username}</Text>
                            </>
                            :
                            <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{''}</Text>
                    }
                </View>

                <View style={[styles.formgroup, styles.mT_05]}>
                    <Text style={styles.textlable}>Shhh… secret word…?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangepassword}
                        value={password}
                        secureTextEntry
                        placeholder="password"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.password !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.password}</Text>
                            </>
                            :
                            <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{''}</Text>
                    }
                </View>
                <View style={[styles.forgotpass]}>
                    <Pressable onPress={() => {
                        navigation.navigate('Forgetpasswordscreen');
                    }}>
                        <Text style={styles.forgotpasstext}>Forgot Username/Password?</Text>
                    </Pressable>
                </View>
                <View style={styles.loginbtn}>
                    <Pressable style={[styles.button, styles.loginbutton]} onPress={() => handlesubmitform()}>
                        <Text style={styles.btntext}> {'Login >'}</Text>
                    </Pressable>
                </View>
                <View style={[styles.formgroup, styles.mT_05, styles.mB_02]}>
                    <Pressable onPress={() => handlenavigate()}>
                        <Text style={styles.registertxt}>Register</Text>
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

export default LoginScreen;
