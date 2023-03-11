import React from 'react';
import { View, FlatList, Alert, BackHandler, ActivityIndicator, Text, Modal, TouchableWithoutFeedback, Pressable, ScrollView, Image, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Productlist from '../components/productlist';
import Bottommenu from '../components/bottommenu';
import { axiosInstance } from '../../services';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Gridskeleton from '../components/gridskeleton';
import { ImageSlider } from "react-native-image-slider-banner";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

    const [spinner, setspinner] = React.useState(false);
    const [apiloading, setapiloading] = React.useState(false);
    const [products, setproducts] = React.useState([]);
    const [productsbestsell, setproductsbestsell] = React.useState([]);
    const [bannerimg, setbannerimg] = React.useState([]);

    const childCompRef = React.useRef(null);

    React.useEffect(() => {
        getdata();
        getbannerdata();
        getbestsellingdata();
        // Exit app event handler
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            backHandler.remove();
        }
    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getdata();
            getbannerdata();
            getbestsellingdata();
        });
        return () => {
            unsubscribe();
        }
    }, [navigation]);

    async function getdata() {
        const userid = await AsyncStorage.getItem('userid');
        // console.log(selectedcategory);
        setapiloading(true);
        let JsonValue = {
            "customerId": userid,
        }
        axiosInstance.post('product/recent_product_get/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setproducts(res.data.data);
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

    async function getbestsellingdata() {
        const userid = await AsyncStorage.getItem('userid');
        // console.log(selectedcategory);
        setapiloading(true);
        let JsonValue = {
            "customerId": userid,
        }
        axiosInstance.post('product/bestselling/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setproductsbestsell(res.data.data);
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

    async function getbannerdata() {
        const userid = await AsyncStorage.getItem('userid');
        // console.log(selectedcategory);
        setapiloading(true);
        let JsonValue = {
            "customerId": userid,
        }
        axiosInstance.post('dashboard_mobile_notification/img_notify_get/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    if (res.data.data.length > 0) {
                        let myarray = [];
                        for (let i = 0; i < res.data.data.length; i++) {
                            // const element = array[i];
                            let myimg = {
                                "img": res.data.data[i]['notify_image']
                            }
                            myarray.push(myimg);
                        }
                        setbannerimg(myarray);
                        // console.log(myarray);
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
                setapiloading(false);
            })
            .catch(() => {
                setapiloading(false);
            });
    }


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

    const handlegetproductdetail = async (product_id) => {
        await AsyncStorage.setItem('product_id', product_id);
        navigation.navigate('Productsdetailsscreen');
    }

    const handelviewmore = async () => {
        navigation.navigate('Productsscreen');
    }


    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='false' display='custom' type='search' distplaytext='Recent Orders' icon='yes' />
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
                    <Gridskeleton />
                    :
                    <>
                        <ScrollView
                            style={styles.maincontent}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={{ padding: 2, borderRadius: 5, overflow: 'hidden' }}>
                                <ImageSlider
                                    data={bannerimg}
                                    autoPlay={true}
                                    preview={false}
                                    timer={3000}
                                    caroselImageStyle={{ resizeMode: 'contain', height: 150 }}
                                    caroselImageContainerStyle={{ padding: 0, margin: 0, height: 150, maxHeight: 150 }}
                                    closeIconColor="#fff"
                                />
                            </View>


                            {
                                products.length > 0 ?
                                    <>
                                        <View style={[styles.logo_nd_icon]}>
                                            <Text style={[styles.fs_018, styles.mT_01, styles.mL_005, styles.mB_02, styles.fc_brown, styles.fw_bold]}>
                                                Popular Products
                                            </Text>
                                            <Pressable onPress={() => handelviewmore()}>
                                                <Text style={[styles.fs_15, styles.mT_01, styles.mR_01, styles.mB_02, styles.fc_brown,]}>
                                                    View more
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <ScrollView
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}>
                                                {products.map((item, key) => (
                                                    <View key={key} style={{ backgroundColor: "#FFFF", borderRadius: 10, margin: 5, overflow: 'hidden', width: 170 }}>
                                                        <Pressable onPress={() => handlegetproductdetail(item.product_id)}>
                                                            <View style={{ height: 140, width: "100%", overflow: 'hidden' }}>
                                                                {
                                                                    item.main_image !== null ?
                                                                        <Image
                                                                            source={{ uri: item.main_image }}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: 170
                                                                            }}
                                                                        />
                                                                        :
                                                                        <Image
                                                                            source={require('../../../assets/img/prod_2.png')}
                                                                            style={{
                                                                                width: '100%'
                                                                            }}
                                                                        />
                                                                }

                                                                <Text style={[styles.imageoverlypp, styles.fs_14]}>{item.category_name}</Text>
                                                            </View>
                                                            <View style={{ padding: 10, width: '100%' }}>
                                                                <Text style={[styles.fs_14, styles.fc_black, styles.mB_01, styles.fw_500]}>{item.product_name}</Text>
                                                                <Text style={[styles.fs_010, styles.fc_black, styles.mB_01,]}>{item.gm_size} gr</Text>
                                                                <View style={styles.orderdetails}>
                                                                    <Text style={[styles.fc_blue,]}>
                                                                        <MaterialIcons style={[styles.fs_22]} name='fiber-manual-record' />
                                                                    </Text>
                                                                    <Text style={[styles.fs_14, styles.colo_acmari,]}>ACMari</Text>
                                                                    {
                                                                        item.product_discount !== '0' ?
                                                                            <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                                <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 10, color: '#5B4C51', fontWeight: '400' }}>$ {item.product_price}</Text> $ {item.discounted_price}
                                                                            </Text>
                                                                            :
                                                                            <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                                $ {item.product_price}
                                                                            </Text>
                                                                    }
                                                                </View>
                                                            </View>
                                                        </Pressable>

                                                    </View>
                                                ))}
                                            </ScrollView>
                                        </View>

                                    </>
                                    :
                                    <>
                                    </>
                            }

                            {
                                productsbestsell.length > 0 ?
                                    <>
                                        <View style={[styles.logo_nd_icon, styles.mT_01]}>
                                            <Text style={[styles.fs_018, styles.mT_01, styles.mL_005, styles.mB_02, styles.fc_brown, styles.fw_bold]}>
                                                Bestselling
                                            </Text>
                                            <Pressable onPress={() => handelviewmore()}>
                                                <Text style={[styles.fs_15, styles.mT_01, styles.mR_01, styles.mB_02, styles.fc_brown,]}>
                                                    View more
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <View style={[{ flexDirection: 'row', width: '100%' }, styles.mB_02]}>
                                            <ScrollView
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}>
                                                {productsbestsell.map((item, key) => (
                                                    <View key={key} style={{ backgroundColor: "#FFFF", borderRadius: 10, margin: 5, overflow: 'hidden', width: 170 }}>
                                                        <Pressable onPress={() => handlegetproductdetail(item.product_id)}>
                                                            <View style={{ height: 140, width: "100%", overflow: 'hidden' }}>
                                                                {
                                                                    item.main_image !== null ?
                                                                        <Image
                                                                            source={{ uri: item.main_image }}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: 170
                                                                            }}
                                                                        />
                                                                        :
                                                                        <Image
                                                                            source={require('../../../assets/img/prod_2.png')}
                                                                            style={{
                                                                                width: '100%'
                                                                            }}
                                                                        />
                                                                }

                                                                <Text style={[styles.imageoverlypp, styles.fs_14]}>{item.category_name}</Text>
                                                            </View>
                                                            <View style={{ padding: 10, width: '100%' }}>
                                                                <Text style={[styles.fs_14, styles.fc_black, styles.mB_01, styles.fw_500]}>{item.product_name}</Text>
                                                                <Text style={[styles.fs_010, styles.fc_black, styles.mB_01,]}>{item.gm_size} gr</Text>
                                                                <View style={styles.orderdetails}>
                                                                    <Text style={[styles.fc_blue,]}>
                                                                        <MaterialIcons style={[styles.fs_22]} name='fiber-manual-record' />
                                                                    </Text>
                                                                    <Text style={[styles.fs_14, styles.colo_acmari,]}>ACMari</Text>
                                                                    {
                                                                        item.product_discount !== '0' ?
                                                                            <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                                <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 10, color: '#5B4C51', fontWeight: '400' }}>$ {item.product_price}</Text> $ {item.discounted_price}
                                                                            </Text>
                                                                            :
                                                                            <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                                $ {item.product_price}
                                                                            </Text>
                                                                    }
                                                                </View>
                                                            </View>
                                                        </Pressable>

                                                    </View>
                                                ))}
                                            </ScrollView>
                                        </View>

                                    </>
                                    :
                                    <>
                                    </>
                            }

                        </ScrollView>
                    </>
            }

            <View >
                <Bottommenu singlebtn="no" bnt_txtt="" navigation={navigation} active_style="home" />
            </View>

        </SafeAreaView>
    );
};

export default HomeScreen;
