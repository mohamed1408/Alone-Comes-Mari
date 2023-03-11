import React from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Image, Alert, BackHandler, ToastAndroid, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import CheckBox from 'react-native-checkbox/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';
import Snackbar from 'react-native-snackbar';

const RegistrationScreen = ({ navigation }) => {
    React.useEffect(() => {
        async function getdata() {
            const username = await AsyncStorage.getItem('username');
            const useremail = await AsyncStorage.getItem('useremail');
            onChangefirstname(username);
            onChangeemail(useremail);
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
    const [date, setdate] = React.useState(new Date());
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    const [openDatepicker, setopenDatepicker] = React.useState(false);
    const [firstname, onChangefirstname] = React.useState("");
    const [lastname, onChangelastname] = React.useState("");
    const [birthday, setbirthday] = React.useState("");
    const [address, onChangeaddress] = React.useState("");
    const [city, onChangecity] = React.useState("");
    const [email, onChangeemail] = React.useState("");
    const [phone, onChangephone] = React.useState("");
    const [username, onChangeusername] = React.useState("");
    const [password, onChangepassword] = React.useState("");
    const [cpassword, onChangecpassword] = React.useState("");
    const [formerror, setformerror] = React.useState({
        firstname: '',
        lastname: '',
        birthday: '',
        address: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        cpassword: '',
        city: '',
    });
    const [selectedcheckbox, setselectedcheckbox] = React.useState(true);

    function onChangebirthday() {
        setopenDatepicker(true)
    }

    const validateform = () => {
        let firstnameerrormsg = '';
        let lastnameerrormsg = '';
        let birthdayerrormsg = '';
        let addresserrormsg = '';
        let cityerrormsg = '';
        let emailerrormsg = '';
        let phoneerrormsg = '';
        let usernameerrormsg = '';
        let passworderrormsg = '';
        let cpassworderrormsg = '';
        var mailformat = /(^\w.*@\w+\.\w)/;
        const re = /^[0-9\b]+$/;
        const re_text = /^[A-Za-z ]+$/;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#%&])(?=.{8,})");

        if (firstname === '') {
            firstnameerrormsg = 'First name is required!';
        }
        if (lastname === '') {
            lastnameerrormsg = 'Last name is required!';
        }
        if (birthday === '') {
            birthdayerrormsg = 'Birthday is required!';
        }
        if (address === '') {
            addresserrormsg = 'Address is required!';
        }
        if (city === '') {
            cityerrormsg = 'City is required!';
        }

        if (email === '') {
            emailerrormsg = 'Email is required!';
        }
        else if (mailformat.test(email) === false) {
            emailerrormsg = 'Invalid Email!';
        }

        if (phone === '') {
            phoneerrormsg = 'Phone is required!';
        }
        else if (re.test(phone) === false) {
            phoneerrormsg = "Invalid Phone!";
        }

        if (username === '') {
            usernameerrormsg = 'User name is required!';
        }
        else if (re_text.test(username) === false) {
            usernameerrormsg = "User name cannot contain special characters";
        }

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

        if (firstnameerrormsg || lastnameerrormsg || birthdayerrormsg || addresserrormsg || emailerrormsg || phoneerrormsg || usernameerrormsg || passworderrormsg || cpassworderrormsg || cityerrormsg) {
            setformerror({
                firstname: firstnameerrormsg,
                lastname: lastnameerrormsg,
                birthday: birthdayerrormsg,
                address: addresserrormsg,
                email: emailerrormsg,
                phone: phoneerrormsg,
                username: usernameerrormsg,
                password: passworderrormsg,
                cpassword: cpassworderrormsg,
                city: cityerrormsg,
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
            const userzipcode = await AsyncStorage.getItem('userzipcode');
            setspinner(true);
            setformerror({
                firstname: '',
                lastname: '',
                birthday: '',
                address: '',
                email: '',
                phone: '',
                username: '',
                password: '',
                cpassword: '',
            });
            let JsonValue = {
                "username": username,
                "customer_reg_id": "",
                "password": password,
                "confirm_password": cpassword,
                "firstName": firstname,
                "lastName": lastname,
                "customer_birthdate": birthday,
                "customer_phone": phone,
                "email": email,
                "customer_address": address,
                "customer_city": city,
                "customer_zipcode": userzipcode,
                "selectedcheckbox": selectedcheckbox,
            }
            axiosInstance.post('mobile_registartion/check_availability/', JsonValue)
                .then((res) => {
                    if (res.data.status === 201) {
                        sendotp(JsonValue);
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

    function sendotp(JsonValue) {
        setspinner(true);
        let otp_json = {
            "customer_phone": phone,
            "emailid": email,
        }
        axiosInstance.post('mobile_registartion/send_otp/', otp_json)
            .then((res) => {
                if (res.data.status === 201) {
                    setandredirect(JsonValue);
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

    async function setandredirect(Value) {
        const jsonValue = JSON.stringify(Value)
        await AsyncStorage.setItem('register_data', jsonValue);
        navigation.navigate('Otpscreen');
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
                    <Text style={[styles.headerlabletext, styles.fs_32]}>Registration</Text>
                </View>

                <View style={[styles.formgroup, styles.mT_05]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangefirstname}
                        value={firstname}
                        placeholder="First name"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.firstname !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.firstname}</Text>
                            </>
                            : null
                    }
                </View>

                <View style={[styles.formgroup, styles.mT_02]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangelastname}
                        value={lastname}
                        placeholder="Last name"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.lastname !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.lastname}</Text>
                            </>
                            : null
                    }
                </View>

                <View style={[styles.formgroup, styles.mT_02]}>
                    <TextInput
                        style={styles.input}
                        onPressIn={onChangebirthday}
                        value={birthday}
                        placeholder="Birthday 01/01/2022"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.birthday !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.birthday}</Text>
                            </>
                            : null
                    }
                </View>
                <DatePicker
                    modal
                    mode="date"
                    open={openDatepicker}
                    date={date}
                    onConfirm={(date) => {
                        setopenDatepicker(false)
                        setdate(date);
                        const yyyy = date.getFullYear();
                        let mm = date.getMonth() + 1; // Months start at 0!
                        let dd = date.getDate();
                        setbirthday(dd + "/" + mm + "/" + yyyy)
                    }}
                    onCancel={() => {
                        setopenDatepicker(false)
                    }}
                />
                <View style={[styles.formgroup, styles.mT_02]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeaddress}
                        value={address}
                        placeholder="Address"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.address !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.address}</Text>
                            </>
                            : null
                    }
                </View>
                <View style={[styles.formgroup, styles.mT_02]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangecity}
                        value={city}
                        placeholder="City"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.city !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.city}</Text>
                            </>
                            : null
                    }
                </View>

                <View style={[styles.formgroup, styles.mT_02]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeemail}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.email !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.email}</Text>
                            </>
                            : null
                    }
                </View>
                <View style={[styles.formgroup, styles.mT_02]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangephone}
                        value={phone}
                        placeholder="Phone"
                        keyboardType="phone-pad"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.phone !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.phone}</Text>
                            </>
                            : null
                    }
                </View>
                <View style={[styles.formgroup, styles.mT_02]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeusername}
                        value={username}
                        placeholder="User name"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.username !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02]}>{formerror.username}</Text>
                            </>
                            : null
                    }
                </View>
                <View style={[styles.formgroup, styles.mT_02]}>
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
                <View style={[styles.formgroup, styles.mT_02]}>
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
                <View style={[styles.ceheckboxlable, styles.mB_015]}>
                    <CheckBox
                        checked={selectedcheckbox}
                        labelStyle={styles.checklabelStyle}
                        label='Allow text messages from Along Comes Mari'
                        onChange={(checked) => setselectedcheckbox(!selectedcheckbox)}
                    />
                </View>
                <View style={[styles.registernextbtn, styles.mB_006]}>
                    <Pressable style={styles.button} onPress={() => handlesubmitform()}>
                        <Text style={styles.btntext}>{'Next >'}</Text>
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

export default RegistrationScreen;
