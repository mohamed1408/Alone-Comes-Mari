import React from 'react';
import { View, ScrollView, Image, Text, ActivityIndicator, Alert, Pressable, Modal, PermissionsAndroid, ToastAndroid, SafeAreaView, Platform } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Bottommenu from '../components/bottommenu';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalStraps from '../straps/modalstraps';
import ImagePicker from 'react-native-image-crop-picker';
import Listskeleton from '../components/listskeleton';
import Snackbar from 'react-native-snackbar';

const EditProfileScreen = ({ navigation }) => {

    const [spinner, setspinner] = React.useState(false);
    const [userdetails, setuserdetails] = React.useState([]);
    const [apiloading, setapiloading] = React.useState(false);

    React.useEffect(() => {
        getdata();
    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getdata();
        });
        return () => {
            unsubscribe();
        }
    }, [navigation]);

    async function getdata() {
        const userid = await AsyncStorage.getItem('userid');
        setapiloading(true);
        let JsonValue = {
            "customerId": userid
        }
        axiosInstance.post('mobile_profile/get/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setuserdetails(res.data.data);
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
                setapiloading(false);
            })
            .catch(() => {
                setapiloading(false);
            });
    }

    const handlemobiledit = () => {
        navigation.navigate('Mobileeditscreen');
    }

    const handleemailedit = () => {
        navigation.navigate('Emaileditscreen');
    }

    const handleaddressedit = () => {
        navigation.navigate('Addresseditscreen');
    }

    const [resourcePath, setresourcePath] = React.useState({});
    const [imageuploaderror, setimageuploaderror] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleprofileedit = () => {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    const opengallery = async () => {
        const grantedstorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
            ImagePicker.openPicker({
                width: 3000,
                height: 3000,
                cropping: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
            }).then(res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res.error) {
                    console.log('ImagePicker Error: ', res.error);
                } else if (res.customButton) {
                    console.log('User tapped custom button: ', res.customButton);
                    alert(res.customButton);
                } else {
                    let source = res;
                    updatepicture(source);
                    setModalVisible(false);
                }
            }).catch(e => {
                setModalVisible(false);
            });
        } else {
            console.log("Camera permission denied");
        }
    }

    const opencamera = async () => {
        const grantedcamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
            ImagePicker.openCamera({
                width: 3000,
                height: 3000,
                cropping: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
                useFrontCamera: true
            }).then(res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res.error) {
                    console.log('ImagePicker Error: ', res.error);
                } else if (res.customButton) {
                    console.log('User tapped custom button: ', res.customButton);
                    alert(res.customButton);
                } else {
                    let source = res;
                    updatepicture(source);
                    setModalVisible(false);
                }
            }).catch(e => {
                setModalVisible(false);
            });
        } else {
            console.log("Camera permission denied");
        }
    }


    var modalBackgroundStyle = {
        backgroundColor: 'rgba(130, 200, 192, 0.4)'
    };

    var innerContainerTransparentStyle = { backgroundColor: '#fff' };


    const updatepicture = async (source) => {
        setspinner(true);
        const userid = await AsyncStorage.getItem('userid');
        let uploadData = new FormData();
        uploadData.append('customerId', userid);
        uploadData.append('customerimg', { type: source.mime, uri: source.path, name: source.path.split("/").pop() });

        const headers = {
            'Content-Type': 'multipart/form-data;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        }
        axiosInstance.post('mobile_profile/image_update/', uploadData, { headers: headers })
            .then((res) => {
                if (res.data.status === 201) {
                    getdata();
                    
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
                console.log('error data');
            });
    }


    return (
        <SafeAreaView style={styles.body}>
            <Header navigation={navigation} backvisible='true' display='' type='' distplaytext='' icon='yes' btn_text='' />
            {
                spinner === true ?
                    <View style={styles.spinnerView}>
                        <ActivityIndicator size="large" color="#FFFF" />
                    </View>
                    :
                    null
            }

            {
                apiloading === true ?
                    <Listskeleton />
                    :
                    <>
                        {
                            userdetails.length > 0 ?
                                <ScrollView
                                    style={styles.maincontent}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <View style={[styles.logo_nd_icon, styles.mT_02, styles.mL_015, styles.mR_02]}>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.fw_bold]}>Groovy Picture</Text>
                                        <Pressable onPress={() => handleprofileedit()} >
                                            <Text style={[styles.fs_018, styles.fc_blue]}>Edit</Text>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.centeredView, styles.mT_02, styles.mL_015, styles.mR_02, styles.brtp]}>
                                        {
                                            userdetails[0].CustomerImage !== null ?
                                                <Image
                                                    resizeMode="contain"
                                                    source={{ uri: userdetails[0].CustomerImage }}
                                                    style={{
                                                        height: 150,
                                                        width: 150,
                                                        borderRadius: 150 / 2
                                                    }}
                                                />
                                                :
                                                <Image
                                                    resizeMode="contain"
                                                    source={require('../../../assets/img/propic.png')}
                                                    style={{
                                                        height: 150,
                                                        width: 150,
                                                        borderRadius: 150 / 2
                                                    }}
                                                />
                                        }
                                    </View>

                                    <View style={[styles.logo_nd_icon, styles.mT_02, styles.mL_015, styles.mR_02]}>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.fw_bold]}>Phone Number</Text>
                                        <Pressable onPress={() => handlemobiledit()} >
                                            <Text style={[styles.fs_018, styles.fc_blue]}>Edit</Text>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.logo_nd_icon, styles.mT_02, styles.mL_015, styles.mR_02, styles.brtp]}>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.mL_015]}>{userdetails[0].customer_phone}</Text>
                                        <Text style={[styles.fs_14, styles.fc_brown, styles.mR_04]}>{userdetails[0].mobile_verified}</Text>
                                    </View>

                                    <View style={[styles.logo_nd_icon, styles.mT_02, styles.mL_015, styles.mR_02]}>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.fw_bold]}>Email Id</Text>
                                        <Pressable onPress={() => handleemailedit()} >
                                            <Text style={[styles.fs_018, styles.fc_blue]}>Edit</Text>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.logo_nd_icon, styles.mT_02, styles.mL_015, styles.mR_02, styles.brtp]}>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.mL_015]}>{userdetails[0].customer_email}</Text>
                                        <Text style={[styles.fs_14, styles.fc_brown, styles.mR_04]}>{userdetails[0].email_verified}</Text>
                                    </View>

                                    <View style={[styles.logo_nd_icon, styles.mT_02, styles.mL_015, styles.mR_02]}>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.fw_bold]}>Address</Text>
                                        <Pressable onPress={() => handleaddressedit()} >
                                            <Text style={[styles.fs_018, styles.fc_blue]}>Edit</Text>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.mT_02, styles.mL_015, styles.mR_02]}>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.mL_015, styles.mB_01]}>
                                            {userdetails[0].customer_address}
                                        </Text>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.mL_015, styles.mB_01]}>
                                            City : {userdetails[0].customer_city}
                                        </Text>
                                        <Text style={[styles.fs_018, styles.fc_brown, styles.mL_015, styles.mB_01]}>
                                            Zipcode : {userdetails[0].customer_zipcode}
                                        </Text>
                                    </View>

                                </ScrollView>
                                :
                                <ScrollView
                                    style={styles.maincontent}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <View style={styles.noproductdiv}>
                                        <Text style={styles.noproducttext}> No result found</Text>
                                    </View>
                                </ScrollView>
                        }
                    </>
            }

            <View >
                <Bottommenu singlebtn="no" bnt_txtt="" navigation={navigation} active_style="profile" />
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { closeModal() }}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={[innerContainerTransparentStyle, styles.modal_body]}>
                        <View style={styles.pd_20}>
                            <Text style={[styles.fs_26, styles.fw_bold, styles.fc_brown]}>Select Image</Text>
                            <View style={[styles.imageselectoption, styles.mT_04]}>
                                <Pressable onPress={() => opengallery()}>
                                    <Text style={[styles.fs_22, styles.fc_blue]}>Choose from gallery</Text>
                                </Pressable>
                            </View>
                            <View style={[styles.imageselectoption]}>
                                <Pressable onPress={() => opencamera()}>
                                    <Text style={[styles.fs_22, styles.fc_blue]}>Take a photo</Text>
                                </Pressable>
                            </View>
                            <View style={[styles.imageselectoption, styles.bb_0]}>
                                <Pressable onPress={() => closeModal()}>
                                    <Text style={[styles.fs_22, styles.fc_blue]}>Cancle</Text>
                                </Pressable>
                            </View>
                        </View>
                        <ModalStraps />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default EditProfileScreen;
