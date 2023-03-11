import React from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert, Modal, ToastAndroid, ActivityIndicator, TextInput, SafeAreaView, Platform } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import SelectDropdown from 'react-native-select-dropdown'
import Bottommenu from '../components/bottommenu';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalStraps from '../straps/modalstraps';
import DatePicker from 'react-native-date-picker';
import CheckoutStraps from '../straps/checkoutstraps';
import Gridskeleton from '../components/gridskeleton';
import Listskeleton from '../components/listskeleton';
import Snackbar from 'react-native-snackbar';

const CartScreen = ({ navigation }) => {

    const childCompRef = React.useRef(null);

    const [zipcode, onChangezipcode] = React.useState("");
    // const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const [spinner, setspinner] = React.useState(false);
    const [cartdetails, setcartdetails] = React.useState([]);
    const [apiloading, setapiloading] = React.useState(false);

    React.useEffect(() => {
        getdata();
    }, [navigation]);

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
                    childCompRef.current.cartdetails();
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

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedquantity, setselectedquantity] = React.useState('');
    const [quantityerror, setquantityerror] = React.useState('');
    const [cartid, setcartid] = React.useState('');

    const countries = ["1", "2", "3", "4", "5"]

    const handleupdateqty = (qty, id) => {
        setselectedquantity(qty);
        setcartid(id);
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
        setquantityerror('');
        setselectedquantity('');
        setcartid('');
    }

    var modalBackgroundStyle = {
        backgroundColor: 'rgba(130, 200, 192, 0.4)'
    };
    var innerContainerTransparentStyle = { backgroundColor: '#fff' };

    const handlecartsubmit = async () => {
        if (!selectedquantity) {
            setquantityerror('Please select the quantity');
        }
        else {
            const userid = await AsyncStorage.getItem('userid');
            setquantityerror('');
            setspinner(true);
            let JsonValue = {
                "qty": selectedquantity,
                "customerId": userid,
                "cartId": cartid,
            }
            axiosInstance.post('mobile_cart/update/', JsonValue)
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
                        closeModal();
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
    };

    const handlecartremove = async (id) => {
        const userid = await AsyncStorage.getItem('userid');
        setquantityerror('');
        setspinner(true);
        let JsonValue = {
            "customerId": userid,
            "cartId": id,
        }
        axiosInstance.post('mobile_cart/delete/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    getdata();
                    childCompRef.current.cartdetails();
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
            });
    };


    const [modalVisibletwo, setModalVisibletwo] = React.useState(false);
    const [openDatepicker, setopenDatepicker] = React.useState(false);
    const [openTimepicker, setopenTimepicker] = React.useState(false);
    const [Deliverydate, setDeliverydate] = React.useState('');
    const [DeliveryTime, setDeliveryTime] = React.useState('');
    const [DeliveryTimeerror, setDeliveryTimeerror] = React.useState('');
    const [Deliverydateerror, setDeliverydateerror] = React.useState('');

    const [date, setdate] = React.useState(new Date());

    const openpaymentmodal = () => {
        if (cartdetails.length > 0) {
            setModalVisibletwo(true);
        }
        else {
            Alert.alert(
                "Info",
                'Your cart is empty',
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }
    function onChangebirthday() {
        setopenDatepicker(true)
    }
    function onDeliverytime() {
        setopenTimepicker(true)
    }

    function closeModaltwo() {
        setModalVisibletwo(false);
        setDeliverydate('');
        setDeliveryTime('');
        setDeliveryTimeerror('');
        setDeliverydateerror('');
    }

    const handledeliverysubmit = async () => {
        setDeliveryTimeerror('');
        setDeliverydateerror('');
        if (Deliverydate === '') {
            setDeliverydateerror('Date is required!');
        }
        if (DeliveryTime === '') {
            setDeliveryTimeerror('Time is required!');
        }

        if (Deliverydate !== '' && DeliveryTime !== '') {
            setModalVisibletwo(false);
            await AsyncStorage.setItem('Deliverydate', Deliverydate);
            await AsyncStorage.setItem('DeliveryTime', DeliveryTime);
            navigation.navigate('Paymentscreen');
        }
    }

    const handlenavigationproduct = async (id) => {
        await AsyncStorage.setItem('product_id', id);
        navigation.navigate('Productsdetailsscreen');
    }

    return (
        <SafeAreaView style={styles.body}>
            <Header ref={childCompRef} navigation={navigation} backvisible='true' display='custom_btn' type='text_btn' distplaytext='My Cart' btn_text='Add more' icon='yes' />
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
                                    <Text style={styles.mT_001}></Text>
                                    {
                                        cartdetails.map((value, index) => {
                                            return (
                                                <View style={styles.CardView} key={index}>
                                                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                                                        <Pressable style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
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
                                                        </Pressable>

                                                        <View style={[{ width: '78%' }, styles.mL_005]}>
                                                            <Text style={[styles.fs_12, styles.mB_001]}>
                                                                {value.category_name}
                                                            </Text>
                                                            <Text style={[styles.fs_14, styles.fw_bold, styles.fc_brown]}>
                                                                {value.product_name}
                                                            </Text>
                                                            <View style={[styles.orderproddetsils]}>
                                                                <Text style={[styles.fs_12, styles.mT_001]}>
                                                                    Grams/Size: {value.gm_size} gr
                                                                </Text>
                                                                <View style={styles.qtystyle}>
                                                                    <Text style={[styles.fs_10, styles.fc_brown]}>Qty : {value.total_quantity} </Text>
                                                                    <MaterialIcons name='arrow-drop-down' style={[styles.fs_33, styles.fc_brown]} onPress={() => handleupdateqty(value.total_quantity, value.id)} />
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
                                                                        value.discount_flag !== '0' ?
                                                                            <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                                <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 10, color: '#5B4C51', fontWeight: '400' }}>$ {value.total_amount_before_discount}</Text> $ {value.total_amount_after_discount} &nbsp; {value.product_discount} off
                                                                            </Text>
                                                                            :
                                                                            <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                                                                $ {value.total_amount_after_discount}
                                                                            </Text>
                                                                    }
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View style={[styles.orderdetails, styles.mB_02]}>
                                                        <Text style={[styles.fs_010, styles.fc_black]}>

                                                        </Text>

                                                        <Pressable onPress={() => handlecartremove(value.id)}>
                                                            <Text style={[styles.fs_15, styles.fc_brown, styles.mR_01]}>
                                                                <MaterialIcons name='delete' style={[styles.fs_12, styles.fc_brown]} /> Remove
                                                            </Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
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
                <Bottommenu getmydatas={openpaymentmodal} singlebtn="yes" bnt_txtt="Continue to Payment" navigation={navigation} active_style="store" />
            </View>


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { closeModal() }}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={[innerContainerTransparentStyle, styles.modal_body]}>

                        <Pressable onPress={() => closeModal()} style={styles.modalclosenn}>
                            <Text>
                                <MaterialIcons style={[styles.fs_33, styles.fc_brown]} name='cancel' />
                            </Text>
                        </Pressable>
                        <Text style={[styles.fs_20, styles.mT_02, styles.text_center, styles.fc_brown]}>Select Quantity</Text>
                        <View style={[styles.mb_view]}>
                            <SelectDropdown
                                buttonStyle={styles.dropdown1BtnStyle}
                                data={countries}
                                defaultValue={selectedquantity}
                                onSelect={(selectedItem, index) => {
                                    setselectedquantity(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                            {/* <Text style={[styles.fs_40, styles.mL_005, styles.mT_02]}></Text> */}
                        </View>
                        {
                            quantityerror !== '' ?
                                <>
                                    <Text style={[styles.fs_30, styles.mT_03, styles.text_center, styles.errortext]}>{quantityerror}</Text>
                                </>
                                : null
                        }
                        <View style={[styles.centeredView, styles.mT_0]}>
                            <Pressable onPress={() => handlecartsubmit()}>
                                <Text style={[styles.modal_body_txt, styles.mT_04, styles.fs_45, styles.fc_brown]}>ok</Text>
                            </Pressable>
                        </View>
                        <ModalStraps />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibletwo}
                onRequestClose={() => { closeModaltwo() }}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={[innerContainerTransparentStyle, styles.modal_body_checkout]}>

                        <Pressable onPress={() => closeModaltwo()} style={styles.modalclosenn}>
                            <Text>
                                <MaterialIcons style={[styles.fs_33, styles.fc_brown]} name='cancel' />
                            </Text>
                        </Pressable>
                        <Text style={[styles.fs_20, styles.mT_02, styles.mB_01, styles.text_center, styles.fc_brown]}>Delivery Details</Text>
                        <View style={[styles.mb_view]}>
                            <Text style={[styles.fs_20, styles.mR_01, styles.mT_02, styles.fc_brown]}>Date</Text>
                            <TextInput
                                style={styles.deviverydate}
                                onPressIn={onChangebirthday}
                                value={Deliverydate}
                                placeholder="DD/MM/YY"
                            />
                            <DatePicker
                                modal
                                mode="date"
                                open={openDatepicker}
                                date={date}
                                minimumDate={date}
                                onConfirm={(date) => {
                                    setopenDatepicker(false)
                                    setdate(date);
                                    const yyyy = date.getFullYear();
                                    let mm = date.getMonth() + 1; // Months start at 0!
                                    let dd = date.getDate();
                                    setDeliverydate(dd + "/" + mm + "/" + yyyy)
                                }}
                                onCancel={() => {
                                    setopenDatepicker(false)
                                }}
                            />
                        </View>
                        {
                            Deliverydateerror !== '' ?
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02, styles.text_center]}>
                                    {Deliverydateerror}
                                </Text>
                                :
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02, styles.text_center]}></Text>
                        }
                        <View style={[styles.mb_view]}>
                            <Text style={[styles.fs_20, styles.mR_01, styles.mT_02, styles.fc_brown]}>Time</Text>
                            <TextInput
                                style={styles.deviverydate}
                                onPressIn={onDeliverytime}
                                value={DeliveryTime}
                                placeholder="00:00 am"
                            />
                            <DatePicker
                                modal
                                mode="time"
                                open={openTimepicker}
                                date={date}
                                onConfirm={(date) => {
                                    var time = date.toLocaleTimeString();
                                    setopenTimepicker(false)
                                    setdate(date);
                                    setDeliveryTime(time);
                                }}
                                onCancel={() => {
                                    setopenTimepicker(false)
                                }}
                            />
                        </View>
                        {
                            DeliveryTimeerror !== '' ?
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02, styles.text_center]}>
                                    {DeliveryTimeerror}
                                </Text>
                                :
                                <Text style={[styles.textlable, styles.errortext, styles.pb_02, styles.text_center]}></Text>
                        }
                        <View style={{ width: '70%', marginLeft: 25, marginTop: 1 }}>
                            <Text style={[styles.modal_body_txt, styles.fc_brown, styles.text_center]}>
                                Someone who is 21+ should be in person to accept delivery
                            </Text>
                        </View>

                        <View style={[styles.centeredView, styles.mT_0]}>
                            <Pressable onPress={() => handledeliverysubmit()}>
                                <Text style={[styles.modal_body_txt, styles.fc_brown]}>Ok</Text>
                            </Pressable>
                        </View>
                        {/* <CheckoutStraps /> */}
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default CartScreen;
