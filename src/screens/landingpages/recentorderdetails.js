import React from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert, Modal, ToastAndroid, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Productlist from '../components/productlist';
import Bottommenu from '../components/bottommenu';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Listskeleton from '../components/listskeleton';
import { Platform } from 'react-native';
import Snackbar from 'react-native-snackbar';

const RecentorderdetailScreen = ({ navigation }) => {
    const [spinner, setspinner] = React.useState(false);
    const [orderdetails, setorderdetails] = React.useState([]);
    const [apiloading, setapiloading] = React.useState(false);

    React.useEffect(() => {
        getdata();
    }, []);

    async function getdata() {
        const userid = await AsyncStorage.getItem('userid');
        const orderID = await AsyncStorage.getItem('orderID');
        const order_product_id = await AsyncStorage.getItem('order_product_id');
        setapiloading(true);
        let JsonValue = {
            "CustomerId": userid,
            "orderID": orderID,
            "productId": order_product_id,
        }
        axiosInstance.post('mobile_order/product_details/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setorderdetails(res.data.data);
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

    const handlenavigationproduct = async (id) => {
        await AsyncStorage.setItem('product_id', id);
        navigation.navigate('Productsdetailsscreen');
    }

    const handlebyagain = async (id) => {
        const userid = await AsyncStorage.getItem('userid');
        setapiloading(true);
        let JsonValue = {
            "customerId": userid,
            "orderid": id,
        }
        axiosInstance.post('mobile_order/buyagain/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setredirect();
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
                setapiloading(false);
            })
            .catch(() => {
                setapiloading(false);
            });
    }

    const setredirect = async () => {
        navigation.navigate('Cartscreen');
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='true' display='custom' type='text' distplaytext='Recent Orders' icon='yes' />
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
                            orderdetails.length > 0 ?
                                <ScrollView
                                    style={styles.maincontent}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                >

                                    <View style={{ flex: 1, alignItems: "center", width: "93%", justifyContent: "flex-start", margin: 13 }}>
                                        <View style={{ backgroundColor: "#FFFF", overflow: 'hidden', width: "100%", padding: 15, borderRadius: 10 }}>
                                            <View style={[styles.orderdetails, styles.mB_02,]}>
                                                <Text style={[styles.fs_018, styles.fc_brown, styles.fw_bold]}>
                                                    Order #{orderdetails[0].orderId}
                                                </Text>
                                                {/* <Text style={[styles.fs_14, styles.fc_brown]}>
    Order date {value.order_date}
</Text> */}
                                                <Pressable style={styles.button_order} onPress={() => handlebyagain(orderdetails[0].id, orderdetails[0].productId)} >
                                                    <Text style={styles.btntext}>By again</Text>
                                                </Pressable>
                                            </View>

                                            <View style={[styles.orderdetails, styles.mB_02]}>
                                                <Text style={[styles.fs_14, styles.fc_brown]}>
                                                    Order date : {orderdetails[0].order_date}
                                                </Text>
                                            </View>
                                            <View style={[styles.orderdetails, styles.mB_02, styles.brbp]}>
                                                <Text style={[styles.fs_14, styles.fc_brown]}>
                                                    Order Status : {orderdetails[0].order_status}
                                                </Text>
                                            </View>



                                            {
                                                orderdetails.map((value2, index2) => {
                                                    return (
                                                        <Pressable style={[styles.cartdetails_disp, styles.mB_02, styles.mT_01]} key={index2} onPress={() => handlenavigationproduct(value2.productId)}>
                                                            <View style={{ width: '20%' }}>
                                                                {
                                                                    value2.product_image !== null ?
                                                                        <Image
                                                                            source={{ uri: value2.product_image }}
                                                                            style={{
                                                                                height: 60,
                                                                                width: 60,
                                                                                borderRadius: 10
                                                                            }}
                                                                        />
                                                                        :
                                                                        <Image
                                                                            source={require('../../../assets/img/prod_2.png')}
                                                                            style={{
                                                                                height: 60,
                                                                                width: 60,
                                                                                borderRadius: 10
                                                                            }}
                                                                        />
                                                                }
                                                            </View>

                                                            <View style={[{ width: '75%' }, styles.mL_015]}>
                                                                <Text style={[styles.fs_12, styles.mB_001]}>
                                                                    {value2.category_name}
                                                                </Text>
                                                                <Text style={[styles.fs_14, styles.fw_bold, styles.fc_brown, styles.mB_01]}>
                                                                    {value2.product_name}
                                                                </Text>
                                                                <View style={[styles.orderproddetsils]}>
                                                                    <Text style={[styles.fs_12, styles.mT_001]}>
                                                                        Grams/Size: {value2.gm_size} gr
                                                                    </Text>
                                                                    <View style={styles.qtystyle}>
                                                                        <Text style={[styles.fs_10, styles.fc_brown]}>Qty : {value2.product_qty} </Text>
                                                                    </View>
                                                                </View>


                                                                <View style={[styles.orderproddetsils]}>
                                                                    <View
                                                                        style={{
                                                                            display: "flex",
                                                                            flexWrap: "wrap",
                                                                            flexDirection: 'row',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'center',
                                                                            alignContent: 'center',
                                                                            marginTop: 4,
                                                                            borderWidth: 0,
                                                                        }}>
                                                                        {
                                                                            value2.discount_flag !== '0' ?
                                                                                <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                                    <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 10, color: '#5B4C51', fontWeight: '400' }}>$ {value2.total_price}</Text> $ {value2.final_price} &nbsp; {value2.discount_percentage} off
                                                                                </Text>
                                                                                :
                                                                                <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                                    $ {value2.final_price}
                                                                                </Text>
                                                                        }
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </Pressable>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, alignItems: "center", width: "93%", justifyContent: "flex-start", margin: 13, marginTop: 5 }}>
                                        <View style={{ backgroundColor: "#FFFF", overflow: 'hidden', width: "100%", padding: 15, paddingBottom: 25, borderRadius: 10 }}>
                                            <Text style={[styles.fs_018, styles.mB_01, styles.fc_brown, styles.fw_bold]}>Shipping Address</Text>
                                            <Text style={[styles.fs_018, styles.mT_02, styles.fc_brown]}>Address :</Text>

                                            <Text style={[styles.fs_018, styles.mT_02, styles.pdL_05, styles.fc_brown]}>
                                                {orderdetails[0].shipping_address}, {orderdetails[0].city}, {orderdetails[0].zipcode}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, alignItems: "center", width: "93%", justifyContent: "flex-start", margin: 13, borderRadius: 25, marginTop: 2 }}>
                                        <View style={{ backgroundColor: "#FFFF", overflow: 'hidden', width: "100%", padding: 15, borderRadius: 10 }}>
                                            <Text style={[styles.fs_018, styles.mB_01, styles.fc_brown, styles.fw_bold]}>Order Summary</Text>
                                            <View style={styles.orderdetails}>
                                                <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>Price ( {orderdetails.length} item)</Text>
                                                <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>$ {orderdetails[0].total_price}</Text>
                                            </View>
                                            {
                                                orderdetails[0].discount_flag !== '0' ?
                                                    <View style={styles.orderdetails}>
                                                        <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>Discount</Text>
                                                        <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_blue]}>$ {orderdetails[0].discount_value}</Text>
                                                    </View>
                                                    :
                                                    null
                                            }
                                            <View style={styles.orderdetails}>
                                                <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>Delivery Charges</Text>
                                                <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_blue]}>Free Delivery</Text>
                                            </View>
                                            <View style={styles.orderdetails}>
                                                <Text style={[styles.fs_018, styles.mT_02, styles.fc_brown]}>Total Amount</Text>
                                                <Text style={[styles.fs_018, styles.mT_02, styles.pdL_05, styles.fc_brown]}>$ {orderdetails[0].final_price}</Text>
                                            </View>
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
                <Bottommenu singlebtn="no" bnt_txtt="" navigation={navigation} active_style="recentorders" />
            </View>
        </SafeAreaView>
    );
};

export default RecentorderdetailScreen;
