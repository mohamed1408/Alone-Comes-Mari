import React from 'react';
import { View, FlatList, ImageBackground, Text, Image, ScrollView, ActivityIndicator, TouchableWithoutFeedback, Alert, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Productlist from '../components/productlist';
import Bottommenu from '../components/bottommenu'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Listskeleton from '../components/listskeleton';

const PaymentScreen = ({ navigation }) => {
    const childCompRef = React.useRef(null);

    const [spinner, setspinner] = React.useState(false);
    const [cartdetails, setcartdetails] = React.useState([]);
    const [addressdetails, setaddressdetails] = React.useState([]);
    const [paymentdetails, setpaymentdetails] = React.useState([]);
    const [originaltotal, setoriginaltotal] = React.useState('');
    const [discountTotal, setdiscountTotal] = React.useState('');
    const [final_value, setfinal_value] = React.useState('');
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
            "customerId": userid,
        }
        axiosInstance.post('mobile_cart/get/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setcartdetails(res.data.data);
                    setoriginaltotal(res.data.originaltotal);
                    setdiscountTotal(res.data.discountTotal);
                    setfinal_value(res.data.final_value);
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
                setapiloading(false);
            });

        axiosInstance.post('mobile_profile/address_details/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setaddressdetails(res.data.address);
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

        axiosInstance.post('mobile_payment/paymentType_get/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setpaymentdetails(res.data.data);
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

    const [selectedPayment, setselectedPayment] = React.useState('');

    const handelpaymentoption = (id, index) => {
        setselectedPayment(id);
        let dummyarray = paymentdetails;
        for (let i = 0; i < dummyarray.length; i++) {
            if (dummyarray[i].id === id) {
                dummyarray[i].selected_flag = "1";
            }
            else {
                dummyarray[i].selected_flag = "0";
            }
        }
        setpaymentdetails([...dummyarray])
    }

    const openpaymentprocess = async () => {

        if (cartdetails.length > 0) {
            const userid = await AsyncStorage.getItem('userid');
            const oddate = await AsyncStorage.getItem('Deliverydate');
            const odtime = await AsyncStorage.getItem('DeliveryTime');
            // const userid = await AsyncStorage.getItem('userid');

            setspinner(true);
            let JsonValue = {
                "customerId": userid,
                "deliveryDate": oddate,
                "deliveryTime": odtime,
                "paymentmethod": selectedPayment
            }

            console.log(JsonValue);

            axiosInstance.post('mobile_order/add/', JsonValue)
                .then((res) => {
                    if (res.data.status === 201) {
                        childCompRef.current.cartdetails();
                        setandredirect(res.data.last_inserted_orderid);
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
        else {
            Alert.alert(
                "Info",
                'Something went wrong please try again later',
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    const setandredirect = async (id) => {
        await AsyncStorage.setItem('orderID', id);
        navigation.navigate('Orderconfirmscreen');
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header ref={childCompRef} navigation={navigation} backvisible='true' display='custom' type='text' distplaytext='Payment Option' icon='yes' />
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
                            cartdetails.length > 0 ?
                                <ScrollView
                                    style={styles.maincontent}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {
                                        cartdetails.length > 0 ?
                                            <>
                                                <View style={{ flex: 1, alignItems: "center", width: "93%", justifyContent: "flex-start", margin: 13, borderRadius: 25 }}>
                                                    <View style={{ backgroundColor: "#FFFF", overflow: 'hidden', width: "100%", padding: 25, borderRadius: 10 }}>
                                                        <Text style={[styles.fs_024, styles.fc_brown]}>Delivery details</Text>
                                                        <Text style={[styles.fs_018, styles.mT_02, styles.fc_brown]}>Address :</Text>
                                                        {
                                                            addressdetails.length > 0 ?
                                                                <>
                                                                    <Text style={[styles.fs_018, styles.mT_02, styles.pdL_05, styles.fc_brown]}>
                                                                        {addressdetails[0]['customer_address']}, {addressdetails[0]['customer_city']}, {addressdetails[0]['customer_zipcode']}
                                                                    </Text>
                                                                </>
                                                                :
                                                                null
                                                        }
                                                    </View>
                                                </View>

                                                <View style={{ flex: 1, alignItems: "center", width: "93%", justifyContent: "flex-start", margin: 13, borderRadius: 25, marginTop: 2 }}>
                                                    <View style={{ backgroundColor: "#FFFF", overflow: 'hidden', width: "100%", padding: 15, borderRadius: 10 }}>
                                                        <Text style={[styles.fs_024, styles.mB_01, styles.fc_brown]}>Price Details</Text>

                                                        {
                                                            cartdetails.length > 0 ?
                                                                <>
                                                                    <View style={styles.orderdetails}>
                                                                        <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>Price ( {cartdetails.length} item)</Text>
                                                                        <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>$ {originaltotal}</Text>
                                                                    </View>
                                                                    {
                                                                        discountTotal > 0 ?
                                                                            <View style={styles.orderdetails}>
                                                                                <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>Discount</Text>
                                                                                <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_blue]}>$ {discountTotal}</Text>
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
                                                                        <Text style={[styles.fs_018, styles.mT_02, styles.pdL_05, styles.fc_brown]}>$ {final_value}</Text>
                                                                    </View>
                                                                </>
                                                                :
                                                                null
                                                        }
                                                    </View>
                                                </View>

                                                <View style={{ flex: 1, alignItems: "center", width: "93%", justifyContent: "flex-start", margin: 13, borderRadius: 25, marginTop: 2 }}>
                                                    <View style={{ backgroundColor: "#FFFF", overflow: 'hidden', width: "100%", padding: 15, borderRadius: 10 }}>
                                                        <Text style={[styles.fs_024, styles.mB_02, styles.fc_brown]}>Payment options</Text>

                                                        {
                                                            paymentdetails.map((value, index) => {
                                                                return (
                                                                    <TouchableWithoutFeedback onPress={() => handelpaymentoption(value.id, index)} key={index}>
                                                                        {
                                                                            value.selected_flag === '1' ?
                                                                                <View style={[styles._productdetails, styles.paymentdetls_dd]} >
                                                                                    <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_blue]}>
                                                                                        <MaterialIcons style={[styles.fs_018, styles.fc_blue]} name='radio-button-checked' />
                                                                                    </Text>
                                                                                    <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_blue]}>
                                                                                        {value.type_name}
                                                                                    </Text>
                                                                                </View>
                                                                                :
                                                                                <View style={[styles._productdetails, styles.paymentdetls_dd]} >
                                                                                    <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>
                                                                                        <MaterialIcons style={[styles.fs_018, styles.fc_brown]} name='radio-button-unchecked' />
                                                                                    </Text>
                                                                                    <Text style={[styles.fs_14, styles.mT_02, styles.pdL_05, styles.fc_brown]}>
                                                                                        {value.type_name}
                                                                                    </Text>
                                                                                </View>
                                                                        }
                                                                    </TouchableWithoutFeedback>
                                                                )
                                                            })
                                                        }
                                                        <Text style={[styles.textlable, styles.errortext, styles.pb_02]}></Text>
                                                    </View>
                                                </View>
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                </ScrollView>
                                :
                                <ScrollView
                                    style={styles.maincontent}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <View style={styles.noproductdiv}>
                                        <Text style={styles.noproducttext}>Oops! Something went wrong</Text>
                                    </View>
                                </ScrollView>
                        }
                    </>
            }

            <View >
                <Bottommenu paymentprocess={openpaymentprocess} singlebtn="yes" bnt_txtt="Checkout" navigation={navigation} active_style="store" />
            </View>
        </SafeAreaView >
    );
};

export default PaymentScreen;
