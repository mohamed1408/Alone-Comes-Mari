import React from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Alert, BackHandler, ActivityIndicator, ToastAndroid, SafeAreaView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';
import { Platform } from 'react-native';
import Snackbar from 'react-native-snackbar';

const MobileEditScreen = ({ navigation }) => {
    const [errortext, setErrortext] = React.useState("");
    const [username, setusername] = React.useState("");
    const [mail, setusermail] = React.useState("");
    const [spinner, setspinner] = React.useState(false);
    const [userdetails, setuserdetails] = React.useState([]);

    React.useEffect(() => {
        getdata();
    }, []);

    async function getdata() {
        const userid = await AsyncStorage.getItem('userid');
        setspinner(true);
        let JsonValue = {
            "customerId": userid
        }
        axiosInstance.post('mobile_profile/get/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setuserdetails(res.data.data);
                    setusername(res.data.data[0].customer_phone)
                    setusermail(res.data.data[0].customer_email)
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

    const onChangeusername = (e) => {
        setusername(e);
    }

    const handlevalidation = async () => {
        setErrortext('');
        if (username == '') {
            setErrortext('Phone number is required!');
        }
        else {
            const userid = await AsyncStorage.getItem('userid');
            setspinner(true);
            let otp_json = {
                "customerId": userid,
                "customer_phone": username,
                "mail": mail,
            }
            axiosInstance.post('mobile_profile/mobile_update/', otp_json)
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
                    console.log('');
                });
        }
    }

    async function setandredirect() {
        await AsyncStorage.setItem('updatedmobile', username);
        await AsyncStorage.setItem('updatedmobileemail', mail);
        navigation.navigate('Mobileeditotpscreen');
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
                <Text style={[styles.fs_23, styles.mT_01, styles.mL_005, styles.fc_brown]}>Edit phone number</Text>
                {/* Name input start here */}
                <View style={[styles.formgroup, styles.mT_15,]}>
                    <Text style={styles.textlable}>Enter phone number</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => onChangeusername(e)}
                        value={username}
                        placeholder="Phone number"
                        placeholderTextColor='#fff'
                        keyboardType="phone-pad"
                    />
                    {
                        errortext !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext]}>{errortext}</Text>
                            </>
                            :
                            <Text style={[styles.textlable, styles.errortext]}>{''}</Text>
                    }
                </View>
                {/* Name input end here */}

                <View style={[styles.centeredView]}>
                    <Pressable style={[styles.button, styles.mB_05]} onPress={() => handlevalidation()}>
                        <Text style={styles.btntext}>{'Update'}</Text>
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

export default MobileEditScreen;
