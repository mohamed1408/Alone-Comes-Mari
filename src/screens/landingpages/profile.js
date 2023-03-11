import React from 'react';
import { View, ScrollView, Image, Text, ActivityIndicator, Alert, Pressable, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Bottommenu from '../components/bottommenu';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Listskeleton from '../components/listskeleton';

const ProfileScreen = ({ navigation }) => {

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

    const handlelogout = async () => {
        Alert.alert("Hold on!", "Are you sure do you want to logout?", [
            {
                text: "No",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "YES", onPress: () => {
                    handlelogout_functions();
                }
            }
        ]);
    }

    const handlelogout_functions = async () => {
        const userid = await AsyncStorage.getItem('userid');
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        setspinner(true);
        let JsonValue = {
            "customerId": userid,
            "fcmtoken": fcmToken,
        }
        axiosInstance.post('mobile_login/logout/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setandredirect();
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

    async function setandredirect() {
        await AsyncStorage.removeItem('loggedin');
        await AsyncStorage.removeItem('userid');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Loginscreen' }],
        });
    }

    return (
        <SafeAreaView style={styles.body}>
            <Header navigation={navigation} backvisible='true' display='custom_btn' type='text_btn' distplaytext='Profile' icon='yes' btn_text='Edit' />
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
                                    <View style={[styles._productdetails, styles.mT_02, styles.mL_015]}>
                                        {
                                            userdetails[0].CustomerImage !== null ?
                                                <Image
                                                    resizeMode="contain"
                                                    source={{ uri: userdetails[0].CustomerImage }}
                                                    style={{
                                                        height: 120,
                                                        width: 120,
                                                        borderRadius: 120 / 2
                                                    }}
                                                />
                                                :
                                                <Image
                                                    resizeMode="contain"
                                                    source={require('../../../assets/img/propic.png')}
                                                    style={{
                                                        height: 120,
                                                        width: 120,
                                                        borderRadius: 120 / 2
                                                    }}
                                                />
                                        }
                                        <View style={styles.mL_025}>
                                            <Text style={[styles.fs_018, styles.fc_brown, styles.mB_01]}>
                                                {userdetails[0].first_name} {userdetails[0].last_name}
                                            </Text>
                                            <Text style={[styles.fs_018, styles.fc_brown]}>{userdetails[0].customer_phone}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles._productdetails, styles.mT_02, styles.mL_015]}>
                                        <View >
                                            <Text style={[styles.fs_018, styles.fc_brown]}>Address :</Text>
                                            <Text style={[styles.fs_15, styles.fc_brown, styles.mL_025, styles.mT_01]}>
                                                {userdetails[0].customer_address}
                                            </Text>
                                            <Text style={[styles.fs_15, styles.fc_brown, styles.mL_025, styles.mT_01]}>City :&nbsp;{userdetails[0].customer_city}</Text>
                                            <Text style={[styles.fs_15, styles.fc_brown, styles.mL_025, styles.mT_01]}>Zipcode :&nbsp;{userdetails[0].customer_zipcode}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles._productdetails, styles.mT_02, styles.mL_015]}>
                                        <View >
                                            <Text style={[styles.fs_018, styles.fc_brown, styles.mB_03]}>Your Id : {userdetails[0]['customer_reg_id']}</Text>
                                            <Text style={[styles.fs_018, styles.fc_brown, styles.mB_03]}>
                                                Status  : <Text style={[styles.fc_blue]}>{userdetails[0]['customer_verified']}</Text>
                                            </Text>
                                            <Text style={[styles.fs_018, styles.fc_brown, styles.mB_03]}>Contact us</Text>
                                            <Text style={[styles.fs_018, styles.fc_brown, styles.mB_03]}>Refer a friend</Text>
                                            <Text style={[styles.fs_018, styles.fc_brown, styles.mB_03]}>Terms and Conditions</Text>
                                            <Pressable onPress={() => handlelogout()}>
                                                <Text style={[styles.fs_018, styles.fc_blue, styles.mB_03]}>Logout</Text>
                                            </Pressable>
                                        </View>
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
        </SafeAreaView>
    );
};

export default ProfileScreen;
