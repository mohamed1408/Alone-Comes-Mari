import React from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Alert, BackHandler, ActivityIndicator, ToastAndroid, SafeAreaView, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';
import Snackbar from 'react-native-snackbar';

const AddressEditScreen = ({ navigation }) => {
    const [errortextaddress, seterrortextaddress] = React.useState("");
    const [errortextcity, seterrortextcity] = React.useState("");
    const [errortextzipcode, seterrortextzipcode] = React.useState("");

    const [address, setaddress] = React.useState("");
    const [city, setcity] = React.useState("");
    const [zipcode, setzipcode] = React.useState("");
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
                    setaddress(res.data.data[0].customer_address)
                    setcity(res.data.data[0].customer_city)
                    setzipcode(res.data.data[0].customer_zipcode)
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

    const onChangeaddress = (e) => {
        setaddress(e);
    }

    const onChangecity = (e) => {
        setcity(e);
    }

    const onChangezipcode = (e) => {
        setzipcode(e);
    }

    const handlevalidation = async () => {
        seterrortextaddress('');
        seterrortextcity('');
        seterrortextzipcode('');
        const re = /^[0-9\b]+$/;
        if (address == '') {
            seterrortextaddress('Address is required!');
        }
        else if (city == '') {
            seterrortextcity('City is required!');
        }
        else if (zipcode == '') {
            seterrortextzipcode('Zip code is required!');
        }
        else if (zipcode.length !== 5) {
            seterrortextzipcode('Please enter valid zipcode');
        }
        else if (re.test(zipcode) === false) {
            seterrortextzipcode('Please enter valid zipcode');
        }

        else {
            const userid = await AsyncStorage.getItem('userid');
            setspinner(true);
            let otp_json = {
                "customerId": userid,
                "address": address,
                "city": city,
                "zipcode": zipcode,
            }
            axiosInstance.post('mobile_profile/address_update/', otp_json)
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
        //setspinner(true);
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
                <Text style={[styles.fs_23, styles.mT_01, styles.mL_005, styles.fc_brown]}>Edit Address</Text>
                {/* Name input start here */}
                <View style={[styles.formgroup, styles.mT_04,]}>
                    <Text style={styles.textlable}>Enter address</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => onChangeaddress(e)}
                        value={address}
                        placeholder="Address"
                        placeholderTextColor='#fff'
                    />
                    {
                        errortextaddress !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext]}>{errortextaddress}</Text>
                            </>
                            :
                            <Text style={[styles.textlable, styles.errortext]}>{''}</Text>
                    }
                </View>

                <View style={[styles.formgroup, styles.mT_01,]}>
                    <Text style={styles.textlable}>Enter city</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => onChangecity(e)}
                        value={city}
                        placeholder="City"
                        placeholderTextColor='#fff'
                    />
                    {
                        errortextcity !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext]}>{errortextcity}</Text>
                            </>
                            :
                            <Text style={[styles.textlable, styles.errortext]}>{''}</Text>
                    }
                </View>

                <View style={[styles.formgroup, styles.mT_01,]}>
                    <Text style={styles.textlable}>Enter Zip code</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => onChangecity(e)}
                        value={zipcode}
                        keyboardType='number-pad'
                        maxLength={5}
                        textContentType='postalCode'
                        placeholder="Zip Code"
                        placeholderTextColor='#fff'
                    />
                    {
                        errortextzipcode !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext]}>{errortextzipcode}</Text>
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

export default AddressEditScreen;
