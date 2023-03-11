import React from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert, Modal, ToastAndroid, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Bottommenu from '../components/bottommenu'
import Orderlist from '../components/orderlist';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Listskeleton from '../components/listskeleton';

const RecentordersScreen = ({ navigation }) => {
    const [zipcode, onChangezipcode] = React.useState("");

    const [spinner, setspinner] = React.useState(false);
    const [orderdetails, setorderdetails] = React.useState([]);
    const [apiloading, setapiloading] = React.useState(false);

    React.useEffect(() => {
        getdata();
    }, []);

    async function getdata() {
        const userid = await AsyncStorage.getItem('userid');
        setapiloading(true);
        let JsonValue = {
            "CustomerId": userid
        }
        axiosInstance.post('mobile_order/get_details/', JsonValue)
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

    const handlenavigation = async (id, prodId) => {
        console.log(id);
        console.log(prodId);
        await AsyncStorage.setItem('orderID', id);
        await AsyncStorage.setItem('order_product_id', prodId);
        navigation.navigate('Recentorderdetailsscreen');
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='true' display='custom' type='search' distplaytext='Recent Orders' icon='yes' />
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
                                    <Text style={[styles.fs_024, styles.mT_01, styles.mL_005, styles.mB_02, styles.fc_brown]}>Recent Orders</Text>
                                    {
                                        orderdetails.map((value, index) => {
                                            return (
                                                <Pressable style={styles.mainCardView} onPress={() => handlenavigation(value.id, value.productId)} key={index}>

                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '68%' }}>
                                                        <View style={styles.subCardView}>
                                                            {
                                                                value.product_image !== null ?
                                                                    <Image
                                                                        source={{ uri: value.product_image }}
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
                                                        <View style={[styles.mL_025, styles.mT_01]}>
                                                            <Text
                                                                style={[styles.product_name, { width: 160 }]} numberOfLines={1} ellipsizeMode='tail'>
                                                                {value.product_name}
                                                            </Text>
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
                                                                    value.discount_flag !== '0' ?
                                                                        <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 10, color: '#5B4C51', fontWeight: '400' }}>$ {value.total_price}</Text> $ {value.final_price}
                                                                        </Text>
                                                                        :
                                                                        <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                            $ {value.final_price}
                                                                        </Text>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={[styles.product_btn, styles.mL_015, styles.mR_01]}>
                                                        <Text style={[styles.fc_white, styles.fs_14]}>
                                                            {value.order_status}
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                            );
                                        })
                                    }
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

export default RecentordersScreen;
