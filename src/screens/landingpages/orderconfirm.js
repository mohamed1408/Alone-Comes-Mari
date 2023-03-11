import React from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert, Modal, ToastAndroid, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Productlist from '../components/productlist';
import Bottommenu from '../components/bottommenu';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Listskeleton from '../components/listskeleton';

const OrderconfirmScreen = ({ navigation }) => {
    const [spinner, setspinner] = React.useState(false);
    const [orderdetails, setorderdetails] = React.useState([]);
    const [apiloading, setapiloading] = React.useState(false);
    const [price_before_discount, setprice_before_discount] = React.useState(0);
    const [discount_total, setdiscount_total] = React.useState(0);
    const [price_after_discount, setprice_after_discount] = React.useState(0);

    React.useEffect(() => {
        getdata();
    }, []);

    async function getdata() {
        const userid = await AsyncStorage.getItem('userid');
        const orderID = await AsyncStorage.getItem('orderID');
        setapiloading(true);
        let JsonValue = {
            "CustomerId": userid,
            "orderID": orderID,
        }
        axiosInstance.post('mobile_order/details/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setorderdetails(res.data.data);
                    setprice_before_discount(res.data.price_before_discount);
                    setdiscount_total(res.data.discount_total);
                    setprice_after_discount(res.data.price_after_discount);
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



    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='true' display='custom' type='text' distplaytext='Thanks for your Order' icon='yes' />
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

                                    <View style={{ flex: 1, alignItems: "center", width: "93%", justifyContent: "center", margin: 20, borderRadius: 10 }}>
                                        <Image resizeMode="contain" source={require('../../../assets/img/Done.png')} />
                                        <Text style={[styles.fs_024, styles.mT_05, styles.fw_bold, styles.fc_brown]}>Thanks for Order</Text>
                                    </View>

                                    <View style={{ flex: 1, alignItems: "center", width: "93%", justifyContent: "flex-start", margin: 13 }}>
                                        <View style={{ backgroundColor: "#FFFF", overflow: 'hidden', width: "100%", padding: 15, borderRadius: 10 }}>
                                            <View style={[styles.orderdetails, styles.mB_02, styles.brbp]}>
                                                <Text style={[styles.fs_018, styles.fc_brown, styles.fw_bold]}>
                                                    Order #{orderdetails[0].orderId}
                                                </Text>
                                                <Text style={[styles.fs_14, styles.fc_brown]}>
                                                    Order date {orderdetails[0].order_date}
                                                </Text>
                                            </View>
                                            {
                                                orderdetails.map((value2, index2) => {
                                                    return (
                                                        <View style={[styles.cartdetails_disp, styles.mB_02, styles.mT_01]} key={index2}>
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
                                                        </View>
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
                                                <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>$ {price_before_discount}</Text>
                                            </View>
                                            {
                                                discount_total > 0 ?
                                                    <View style={styles.orderdetails}>
                                                        <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>Discount</Text>
                                                        <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_blue]}>$ {discount_total}</Text>
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
                                                <Text style={[styles.fs_018, styles.mT_02, styles.pdL_05, styles.fc_brown]}>$ {price_after_discount}</Text>
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
                <Bottommenu singlebtn="yes" bnt_txtt="Back To Home" navigation={navigation} active_style="recentorders" />
            </View>
        </SafeAreaView>
    );
};

export default OrderconfirmScreen;
