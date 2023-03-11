import React from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Image, Modal, BackHandler, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import ModalStraps from '../straps/modalstraps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../services';

const ZipcodeScreen = ({ navigation }) => {

    const [zipcode, onChangezipcode] = React.useState("");
    const [email, onChangeemail] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [spinner, setspinner] = React.useState(false);

    const [formerror, setformerror] = React.useState({
        zipcode: '',
        email: ''
    });

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


    function openModal() {
        setModalVisible(true);
    }
    function closeModal() {
        setModalVisible(false);
    }
    var modalBackgroundStyle = {
        backgroundColor: 'rgba(130, 200, 192, 0.4)'
    };
    var innerContainerTransparentStyle = { backgroundColor: '#fff' };

    const validateform = () => {
        let zipcodeerrormsg = '';
        let emailerrormsg = '';
        var mailformat = /(^\w.*@\w+\.\w)/;
        const re = /^[0-9\b]+$/;

        if (zipcode === '') {
            zipcodeerrormsg = 'Please fill the zip code *';
        }
        else if (zipcode.length !== 5) {
            zipcodeerrormsg = 'Please enter valid zipcode *';
        }
        else if (re.test(zipcode) === false) {
            zipcodeerrormsg = "Please enter valid zipcode *";
        }

        if (email === '') {
            emailerrormsg = 'Please fill your email *';
        }
        else if (mailformat.test(email) === false) {
            emailerrormsg = 'Please enter valid email *';
        }

        if (zipcodeerrormsg || emailerrormsg) {
            setformerror({
                zipcode: zipcodeerrormsg,
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
            setspinner(true);
            setformerror({
                zipcode: '',
                email: ''
            });
            let JsonValue = {
                'zipcode': zipcode,
            }
            axiosInstance.post('pre_register_validation/zipcode_validate/', JsonValue)
                .then((res) => {
                    if (res.data.status === 201) {
                        setandredirect();
                    }
                    else if (res.data.status === 422) {
                        setspinner(false);
                        openModal();
                    }
                })
                .catch((Error) => {
                    setspinner(false);
                    Alert.alert(
                        "Error",
                        "Error",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                });
        }
    }

    async function setandredirect() {
        setspinner(true);
        await AsyncStorage.setItem('useremail', email);
        await AsyncStorage.setItem('userzipcode', zipcode);
        await AsyncStorage.setItem('preregistration', 'true');
        setspinner(false);
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
                {/* Name input start here */}
                <View style={[styles.formgroup, styles.mT_15,]}>
                    <Text style={styles.textlable}>What is your delivery zip code?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangezipcode}
                        value={zipcode}
                        keyboardType='number-pad'
                        maxLength={5}
                        textContentType='postalCode'
                        placeholder="Zip Code"
                        placeholderTextColor='#fff'
                    />
                    {
                        formerror.zipcode !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext]}>{formerror.zipcode}</Text>
                            </>
                            :
                            <Text style={[styles.textlable, styles.errortext]}>{''}</Text>
                    }
                </View>
                <View style={[styles.formgroup, styles.mT_05]}>
                    <Text style={styles.textlable}>What is your email?</Text>
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
                {/* Name input end here */}

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
                visible={modalVisible}
                onRequestClose={() => { closeModal() }}
            >
                <View style={[styles.container, modalBackgroundStyle, styles.mymodal_cont]}>
                    <View style={[innerContainerTransparentStyle, styles.modal_body]}>
                        <Pressable onPress={() => closeModal()} style={styles.modalclosenn}>
                            <Text>
                                <MaterialIcons style={[styles.fs_33, styles.fc_brown]} name='cancel' />
                            </Text>
                        </Pressable>
                        <View style={[styles.modal_body_cnt]}>
                            <Text style={[styles.modal_body_txt, styles.text_center, styles.fc_brown]}>Sorry, we are not there yet. We are happy to notify you once we are there</Text>
                            <Pressable>
                                <Text style={[styles.modal_body_txt, styles.mT_02, styles.fs_40, styles.fc_brown]}>{': ('}</Text>
                            </Pressable>
                        </View>
                        <ModalStraps />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ZipcodeScreen;
