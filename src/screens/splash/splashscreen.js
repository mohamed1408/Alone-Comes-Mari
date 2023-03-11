import React from 'react';
import { View, Image } from 'react-native';
import styles from '../../styles/style';
import SplashStraps from '../straps/splashstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';
import { NotificationServices, requestUserPermission } from '../../utils/PushNotifications';
import ForegroundHandler from '../../utils/ForegroundHandler';

const SplashScreen = ({ navigation }) => {

    const [userid, setuserid] = React.useState("");
    React.useEffect(() => {
        requestUserPermission();
        async function getdata() {
            const preregistration = await AsyncStorage.getItem('preregistration');
            const loggedin = await AsyncStorage.getItem('loggedin');
            const registerstatus = await AsyncStorage.getItem('registerstatus');
            const userid_te = await AsyncStorage.getItem('userid');
            // setpreregistration(preregistration);
            // setloggedin(loggedin);
            // setregisterstatus(registerstatus);
            setuserid(userid_te);

            if (preregistration === 'true') {
                if (loggedin === 'true') {
                    if (registerstatus === 'true') {
                        setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Homescreen' }],
                            });
                        }, 1500);
                    }
                    if (registerstatus === null) {
                        checkregisterstatus(userid_te);
                    }
                }
                if (loggedin === null) {
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Loginscreen' }],
                        });
                    }, 1500);
                }
            }
            if (preregistration === null) {
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Namescreen' }],
                    });
                }, 1500);
            }
        }
        getdata();
        updatefcmtokendata();
    }, []);

    async function updatefcmtokendata() {
        const userid_te = await AsyncStorage.getItem('userid');
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        let JsonValue = {
            "customer_id": userid_te,
            "token_value": fcmToken,
        }
        axiosInstance.post('mobile_fcm/', JsonValue)
            .then((res) => {
                console.log(res.data.message);
            })
            .catch(() => {
                console.log('');
            });
    }

    const checkregisterstatus = (userid_te) => {
        let JsonValue = {
            "userid": userid_te,
        }
        axiosInstance.post('mobile_registartion/checkregisterstatus/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    if (res.data.cust_image === null || res.data.cust_image === '') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Profilepicscreen' }],
                        });
                    }
                    else if (res.data.proof_front === null || res.data.proof_front === '') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Drivinglicensefrontscreen' }],
                        });
                    }
                    else if (res.data.proof_back === null || res.data.proof_back === '') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Drivinglicensebackscreen' }],
                        });
                    }
                    else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Homescreen' }],
                        });
                    }
                }
                if (res.data.status === 422) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Loginscreen' }],
                    });
                }
            })
            .catch(() => {
                setspinner(false);
                console.log('');
            });
    }

    return (
        <>
            <View style={[styles.body]}>
                {/* Logo design start */}
                <View style={styles.splashlogo}>
                    <Image source={require('../../../assets/img/logo.png')} />
                </View>
                {/* Logo design end */}

                {/* Bottom Strap design start */}
                <SplashStraps />
                {/* Bottom Strap design end */}
            </View>
            <ForegroundHandler/>
        </>
    );
};

export default SplashScreen;
