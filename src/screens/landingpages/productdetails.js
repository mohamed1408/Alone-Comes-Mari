import React from 'react';
import { View, ScrollView, Image, Text, Pressable, Modal, useWindowDimensions, ToastAndroid, ActivityIndicator, Alert, Platform, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Bottommenu from '../components/bottommenu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalStraps from '../straps/modalstraps';
import SelectDropdown from 'react-native-select-dropdown'
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import Snackbar from 'react-native-snackbar';

const ProductsdetailsScreen = ({ navigation }) => {
    const childCompRef = React.useRef(null);

    const [spinner, setspinner] = React.useState(false);
    const [products, setproducts] = React.useState([]);
    const [htmlcontent, sethtmlcontent] = React.useState('');

    React.useEffect(() => {
        getdata();
    }, []);

    async function getdata() {
        const product_id = await AsyncStorage.getItem('product_id');
        const userid = await AsyncStorage.getItem('userid');
        setspinner(true);
        let JsonValue = {
            "productid": product_id,
            "customerId": userid,
        }
        axiosInstance.post('mobile_product/productdetails_get/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setproducts(res.data.data);
                    if (res.data.data.length > 0) {
                        sethtmlcontent(res.data.data[0]['product_description']);
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
    }

    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisibletwo, setModalVisibletwo] = React.useState(false);
    const [selectedquantity, setselectedquantity] = React.useState('');
    const [quantityerror, setquantityerror] = React.useState('');
    const countries = ["1", "2", "3", "4", "5"]

    const handlecartdetails = (handlecartdetails) => {
        if (handlecartdetails === 1) {
            setModalVisible(true);
        }
        else {
            setModalVisibletwo(true);
        }
    };

    const handlealreadycartdetails = () => {
        if (Platform.OS != 'android') {
            Snackbar.show({
                text: 'This product already added to cart',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'Okay',
                    textColor: 'green',
                    onPress: () => { /* Do something. */ },
                },
            });
        } else {
            ToastAndroid.showWithGravity(
                'This product already added to cart',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    };

    function closeModal() {
        setModalVisible(false);
        setquantityerror('');
        setselectedquantity('');
    }

    function closeModaltwo() {
        setModalVisibletwo(false);
    }
    var modalBackgroundStyle = {
        backgroundColor: 'rgba(130, 200, 192, 0.4)'
    };
    var innerContainerTransparentStyle = { backgroundColor: '#fff' };

    const source = {
        html: htmlcontent
    };

    const { width } = useWindowDimensions();

    const handlecartsubmit = async () => {
        if (!selectedquantity) {
            setquantityerror('Please select the quantity');
        }
        else {
            const product_id = await AsyncStorage.getItem('product_id');
            const userid = await AsyncStorage.getItem('userid');
            setquantityerror('');
            setspinner(true);
            let JsonValue = {
                "qty": selectedquantity,
                "customerId": userid,
                "productId": product_id
            }
            axiosInstance.post('mobile_cart/add/', JsonValue)
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

    const handlewishlist = async (id, flag) => {

        if (flag === 0) {
            const product_id = await AsyncStorage.getItem('product_id');
            const userid = await AsyncStorage.getItem('userid');
            setquantityerror('');
            setspinner(true);
            let JsonValue = {
                "customerId": userid,
                "productId": product_id
            }
            axiosInstance.post('mobile_wishlist/add/', JsonValue)
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
        }
        else {
            const product_id = await AsyncStorage.getItem('product_id');
            const userid = await AsyncStorage.getItem('userid');
            setquantityerror('');
            setspinner(true);
            let JsonValue = {
                "customerId": userid,
                "productId": product_id
            }
            axiosInstance.post('mobile_wishlist/delete/', JsonValue)
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
        }
    }

    const handleshareproducts = async (data) => {

        const imagurl = data.main_image;
        const url = data.main_image;
        const title = data.product_name;
        const message = 'Please check this out.';

        const options = Platform.select({
            ios: {
                activityItemSources: [
                    {
                        placeholderItem: { type: 'url', content: url },
                        item: { default: { type: 'url', content: url } },
                        subject: { default: title },
                        linkMetadata: { originalUrl: url, url, title },
                    }
                ],
            },
            default: {
                url: imagurl,
                title,
                subject: title,
                message: `${message} ${title} on Alone comes mari`
            },
        });

        Share.open(options);


        // console.log(data.brand_name);
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header ref={childCompRef} navigation={navigation} backvisible='true' display='' type='' distplaytext='Recent Orders' icon='yes' />
            {
                spinner === true ?
                    <View style={styles.spinnerView}>
                        <ActivityIndicator size="large" color="#FFFF" />
                    </View>
                    :
                    null
            }
            <ScrollView
                style={styles.maincontent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >

                {
                    products.length > 0 ?
                        <>
                            <View style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "flex-start" }}>
                                <View style={{ backgroundColor: "#FFFF", borderBottomEndRadius: 10, overflow: 'hidden', width: "100%", borderRadius: 0 }}>
                                    <View style={{ height: 226, width: "100%", overflow: 'hidden' }}>
                                        <Image
                                            resizeMode="cover"
                                            source={{ uri: products[0]['main_image'] }}
                                            style={{
                                                height: 226,
                                                width: '100%'
                                            }}
                                        />
                                        <View style={styles.imageoverlypp_two}>
                                            <Text style={[styles.fs_30, styles.fc_yellow, styles.custbc]}>
                                                <MaterialIcons style={[styles.fs_30, styles.fc_yellow, styles.custopacity]} name='arrow-back' />
                                            </Text>
                                            <View style={styles.orderdetails}>
                                                <Pressable onPress={() => handleshareproducts(products[0])}>
                                                    <Text style={[styles.fs_30, styles.fc_yellow, styles.custbc, styles.mR_01]}>
                                                        <MaterialIcons style={[styles.fs_30, styles.fc_yellow, styles.custopacity]} name='share' />
                                                    </Text>
                                                </Pressable>

                                                {
                                                    products[0]['Wishlist'] === 0 ?
                                                        <Pressable onPress={() => handlewishlist(products[0]['product_id'], products[0]['Wishlist'])}>
                                                            <Text style={[styles.fs_30, styles.fc_yellow, styles.custbc, styles.mR_01]}>
                                                                <MaterialIcons style={[styles.fs_30, styles.fc_yellow, styles.custopacity]} name='favorite-border' />
                                                            </Text>
                                                        </Pressable>
                                                        :
                                                        <Pressable onPress={() => handlewishlist(products[0]['product_id'], products[0]['Wishlist'])}>
                                                            <Text style={[styles.fs_30, styles.fc_yellow, styles.custbc, styles.mR_01]}>
                                                                <MaterialIcons style={[styles.fs_30, styles.fc_yellow, styles.custopacity]} name='favorite' />
                                                            </Text>
                                                        </Pressable>

                                                }

                                                <Text style={[styles.fs_30, styles.fc_yellow, styles.custbc, styles.mR_01]}>
                                                    <MaterialIcons style={[styles.fs_30, styles.fc_yellow, styles.custopacity]} name='more-vert' />
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.orderdetails, styles.mT_02, styles.mL_005, styles.mB_02]}>
                                        <View style={{ width: '65%' }}>
                                            <Text style={[styles.fs_018, styles.fc_brown, styles.mB_01]}>{products[0]['product_name']}</Text>
                                            <Text style={[styles.fs_14, styles.fc_brown]}>{products[0]['category_name']}</Text>
                                            <Text style={[styles.fs_14, styles.fc_brown]}>Grams/Size: {products[0]['gm_size']}</Text>
                                        </View>
                                        <View style={styles.mR_01}>
                                            <Text style={[styles.fs_018, styles.fc_blue, styles.fw_bold, styles.text_right]}>
                                                {
                                                    products[0]['product_discount'] !== '0' ?
                                                        <>
                                                            $ {products[0]['discounted_price']}
                                                        </>
                                                        :
                                                        <>
                                                            $ {products[0]['product_price']}
                                                        </>
                                                }


                                            </Text>
                                            <Text style={[styles.fs_14, styles.fc_brown, styles.text_right]}>
                                                {products[0]['product_discount'] !== '0' ?
                                                    <>
                                                        <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>$ {products[0]['product_price']}</Text> {products[0]['discount_percentage']}% off
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                                }
                                            </Text>
                                            <Image
                                                resizeMode="contain"
                                                source={require('../../../assets/img/review.png')}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                            <Text style={[styles.fs_010, styles.fc_brown, styles.text_right]}>See Reviews</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>

                            <View style={[styles.orderdetails, styles.mT_035, styles.mB_04]}>
                                <View style={[styles.orderdetails, styles.mL_005]}>
                                    <Text style={[styles.fs_30, styles.fc_blue, styles.mR_01]}>
                                        <MaterialIcons style={styles.fs_45} name='fiber-manual-record' />
                                    </Text>
                                    <Text style={[styles.fc_brown, styles.fs_14]}>Along Came Mari</Text>
                                </View>
                                <View
                                    style={[styles.product_btn, styles.mR_01]}>
                                    <Text style={[styles.fc_white, styles.fs_18]}>
                                        Follow
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "flex-start" }}>
                                <View style={{ backgroundColor: "#FFFF", borderBottomEndRadius: 10, overflow: 'hidden', width: "100%", borderRadius: 15 }}>
                                    <View style={[styles.mT_01, styles.mL_005, styles.mB_04, styles.content_center]}>
                                        <View style={[{ padding: 15, }, styles.fc_brown]}>
                                            {/* <Text style={[styles.fs_26, styles.fc_brown, styles.text_justify]}>
                                                {products[0]['product_description']}
                                            </Text> */}
                                            <RenderHtml
                                                contentWidth={width}
                                                source={source}
                                                tagsStyles={{ p: { color: '#5B4C51' } }}
                                            />
                                            {/* <Text style={[styles.fs_26, styles.fc_brown, styles.text_justify, styles.mT_02]}>
                                                Non commodo, a justo massa porttitor sed placerat in. Orci tristique etiam tempus sed. Mi varius morbi egestas dictum tempor nisl. In
                                            </Text> */}
                                        </View>

                                        {
                                            products[0]['cart'] !== 1 ?
                                                <Pressable style={styles.button_addtocart} onPress={() => handlecartdetails(products[0]['customer_verified'])}>
                                                    <Text style={styles.btntext}>Add To Cart </Text>
                                                </Pressable>
                                                :
                                                <Pressable style={styles.button_addtocart} onPress={() => handlealreadycartdetails()}>
                                                    <Text style={styles.btntext}>Already In Cart </Text>
                                                </Pressable>
                                        }
                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "flex-start", marginTop: 20 }}>
                                <View style={{ backgroundColor: "#FFFF", borderBottomEndRadius: 10, overflow: 'hidden', width: "100%", padding: 25, borderRadius: 15 }}>
                                    <View style={[styles.orderdetails]}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={[styles.fs_14, styles.text_left, styles.mB_01, styles.fc_brown]}>Condition</Text>
                                            <Text style={[styles.fs_14, styles.mB_01, styles.fc_brown]}>Price Type</Text>
                                            <Text style={[styles.fs_14, styles.mB_01, styles.fc_brown]}>Category</Text>
                                            <Text style={[styles.fs_14, styles.mB_01, styles.fc_brown]}>Brand</Text>
                                        </View>
                                        <View style={{ width: '50%' }}>
                                            <Text style={[styles.fs_14, styles.fc_brown, styles.text_left, styles.mB_01]}> {products[0]['condition_name']}</Text>
                                            <Text style={[styles.fs_14, styles.fc_brown, styles.text_left, styles.mB_01]}> {products[0]['price_type_name']}</Text>
                                            <Text style={[styles.fs_14, styles.fc_brown, styles.text_left, styles.mB_01]}> {products[0]['category_name']}</Text>
                                            <Text style={[styles.fs_14, styles.fc_brown, styles.text_left, styles.mB_01]}> {products[0]['brand_name']}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "flex-start", marginTop: 20, marginBottom: 20 }}>
                                <View style={{ backgroundColor: "#FFFF", borderBottomEndRadius: 10, overflow: 'hidden', width: "100%", padding: 25, borderRadius: 15 }}>
                                    <Text style={[styles.fs_018, styles.text_left, styles.fc_black, styles.mB_02]}>Additional Details</Text>
                                    <View style={[styles.orderdetails]}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={[styles.fs_14, styles.fc_brown]}>Delivery Details</Text>
                                            <Text style={[styles.fs_14]}> </Text>
                                        </View>
                                        <View style={{ width: '50%' }}>
                                            <Text style={[styles.fs_14, styles.fc_brown, styles.text_left]}>{products[0]['delivery_detail_name']}</Text>
                                            <Text style={[styles.fs_14, styles.fc_brown, styles.text_left]}>Cash On Delivery</Text>
                                        </View>
                                        {/* <Text style={[styles.fs_26, styles.text_left]}>Home Delivery Available</Text> */}

                                    </View>
                                </View>
                            </View>
                        </>
                        :
                        <>
                        </>
                }

            </ScrollView>
            <View >
                <Bottommenu singlebtn="no" bnt_txtt="" navigation={navigation} active_style="store" />
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
                        <View style={styles.centeredView}>
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
                <View style={[styles.container, modalBackgroundStyle, styles.mymodal_cont]}>
                    <View style={[innerContainerTransparentStyle, styles.modal_body]}>
                        <View style={styles.modal_body_cnt}>
                            <Text style={[styles.modal_body_txt, styles.fc_brown]}>Sorry, further action cannot be taken until your account has been verified by admin.</Text>
                            <Pressable onPress={() => closeModaltwo()}>
                                <Text style={[styles.modal_body_txt, styles.mT_04, styles.fs_45, styles.fc_brown]}>ok</Text>
                            </Pressable>
                        </View>
                        <ModalStraps />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ProductsdetailsScreen;
