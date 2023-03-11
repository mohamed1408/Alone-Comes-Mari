import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Image, TextInput, Text, Pressable, Alert, BackHandler, Modal, TouchableWithoutFeedback } from 'react-native';
import styles from '../../styles/style';
import HeadStraps from '../straps/headstraps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeadStrapscustom from '../straps/headstrapscustom';
import HeadStrapsfilter from '../straps/headstrapsfilter';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import ForegroundHandler from '../../utils/ForegroundHandler';

const Header = forwardRef((props, ref) => {
    function gobackscreen() {
        if (!props.navigation.canGoBack()) {
            Alert.alert("Hold on!", "Are you sure do you want to exit?", [
                {
                    text: "No",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
        }
        else {
            if (props.navigation !== undefined) {
                props.navigation.goBack();
            }
        }
    }
    React.useEffect(() => {
        cartdetails();
    }, []);

    React.useEffect(() => {
        const unsubscribeInternet = NetInfo.addEventListener(state => {
            // setisOnline(state.isInternetReachable);
            if (state.isInternetReachable === false) {
                if (props.navigation !== undefined) {
                    props.navigation.navigate('Internetconnectionscreen');
                }
            }
        });
        return () => {
            unsubscribeInternet();
        }
    }, [props.navigation]);

    async function cartdetails() {
        const userid = await AsyncStorage.getItem('userid');
        let JsonValue = {
            "customerId": userid,
        }
        axiosInstance.post('mobile_cart/count/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setcartcount(res.data.data[0]['cart_nos']);
                }
                else { }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const [catfilteractive, setcatfilteractive] = React.useState(false);
    const [brandfilteractive, setbrandfilteractive] = React.useState(false);
    const [shortfilteractive, setshortfilteractive] = React.useState(false);

    useImperativeHandle(ref, () => ({
        cartdetails, updatecategoryfinterstatus, updatebrandsfinterstatus,
        updateshortfinterstatus
    }))

    const updatecategoryfinterstatus = (data) => {
        setcatfilteractive(data);
    }

    const updatebrandsfinterstatus = (data) => {
        setbrandfilteractive(data);
    }

    const updateshortfinterstatus = (data) => {
        setshortfilteractive(data);
    }

    const handlecartnavigate = async () => {
        if (props.navigation !== undefined) {
            props.navigation.navigate('Cartscreen');
        }
    }



    const handleaccountedit = async (data) => {
        if (data === 'Edit') {
            if (props.navigation !== undefined) {
                props.navigation.navigate('Editprofilescreen');
            }
        }
        if (data === 'Add more') {

            if (props.navigation !== undefined) {
                props.navigation.navigate('Productsscreen');
            }
        }
    }

    const [cartcount, setcartcount] = React.useState(0);
    const [searchinput, setsearchinput] = React.useState("");
    const [searchmodal, setsearchmodal] = React.useState(false);
    const [searchresult, setsearchresult] = React.useState([]);

    const onChangezipcode = (e) => {
        setsearchinput(e);
        if (e !== '') {
            let JsonValue = {
                "productName": e,
            }
            axiosInstance.post('mobile_search/get/', JsonValue)
                .then((res) => {
                    if (res.data.status === 201) {
                        setsearchresult(res.data.data);
                    }
                    else { }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            setsearchresult([]);
        }
    };

    const handleOpensearchmodal = () => {
        setsearchresult([]);
        setsearchmodal(true);
    };

    const handleClosesearchmodal = () => {
        setsearchmodal(false);
        setsearchinput('');
    };

    const handleonclicksearch = async (id) => {
        await AsyncStorage.setItem('product_id', id);
        props.navigation.navigate('Productsdetailsscreen');
        setsearchmodal(false);
        setsearchinput('');
    };

    var modalBackgroundStyle = {
        backgroundColor: '#fff'
    };
    var innerContainerTransparentStyle = { backgroundColor: '#fff' };

    return (
        <>
            <View style={styles.backshad}>
                <View style={props.display === 'custom' ? styles.hed_cust_dd : props.display === 'filter' ? styles.hed_filter_dd : props.display === 'custom_btn' ? styles.hed_cust_dd : styles.newiosheader}>

                    <View style={styles.logo_nd_icon}>
                        <View style={styles.headicon}>
                            {
                                props.backvisible == 'false' ? <></>
                                    :
                                    <>
                                        <MaterialIcons name='arrow-back' style={[styles.fs_33, styles.fc_brown, styles.mL_005]} onPress={() => gobackscreen()} />
                                    </>
                            }
                            <Image style={[styles.headerlogo_custom]} resizeMode="contain" source={require('../../../assets/img/logo.png')} />
                        </View>
                        <View style={styles.headicon}>
                            {props.icon === 'yes' ?
                                <Pressable style={[styles.mR_02]} onPress={() => handlecartnavigate()}>
                                    <MaterialIcons name='shopping-cart' style={[styles.fs_30, styles.fc_white]} />
                                    <Text style={styles.cart_bag}>{cartcount}</Text>
                                </Pressable>
                                :
                                <>
                                </>
                            }
                            <MaterialIcons name='more-vert' style={[styles.fs_30, styles.fc_white, styles.mR_01]} />
                        </View>
                    </View>
                    {props.type === 'search' ?
                        <>
                            <View style={[styles.searchformgroup]}>
                                <Pressable onPress={() => handleOpensearchmodal()} >
                                    <TextInput
                                        inlineImageLeft='search_icon'
                                        inlineImagePadding={30}
                                        style={[styles.searchinput]}
                                        value={''}
                                        editable={false}
                                        placeholder="Search Product"
                                        placeholderTextColor='#5B4C51'
                                    />
                                </Pressable>
                            </View>
                        </>
                        : props.type === 'text' ?
                            <>
                                <Text style={[styles.fs_23, styles.mT_02, styles.custheadertext, styles.fc_brown]}>{props.distplaytext}</Text>
                            </>
                            : props.type === 'text_btn' ?
                                <>
                                    <View style={[styles.orderdetails]}>
                                        <View>
                                            <Text style={[styles.fs_23, styles.mT_02, styles.custheadertext, styles.fc_brown]}>{props.distplaytext}</Text>
                                        </View>
                                        <View style={[styles.custheadertext, styles.mR_02]}>
                                            <Pressable style={styles.button_order} onPress={() => handleaccountedit(props.btn_text)} >
                                                <Text style={styles.btntext}>{props.btn_text}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </>
                                : props.type === 'filter' ?
                                    <>
                                        <View style={[styles.searchformgrouptwo]}>
                                            <Pressable onPress={() => handleOpensearchmodal()} >
                                                <TextInput
                                                    inlineImageLeft='search_icon'
                                                    inlineImagePadding={30}
                                                    style={[styles.searchinput]}
                                                    value={''}
                                                    editable={false}
                                                    placeholder="Search Product"
                                                    placeholderTextColor='#5B4C51'
                                                />
                                            </Pressable>
                                        </View>
                                        <View style={[styles.filtergroups]}>
                                            {
                                                shortfilteractive === true ?
                                                    <Text onPress={() => props.getdataalert('Sort')} style={styles.filterbtnstyleactive} > <MaterialIcons name='sort' /> Sort by</Text>
                                                    :
                                                    <Text onPress={() => props.getdataalert('Sort')} style={styles.filterbtnstyle} > <MaterialIcons name='sort' /> Sort by</Text>
                                            }
                                            {
                                                brandfilteractive === true ?
                                                    <Text onPress={() => props.getdataalert('Brands')} style={styles.filterbtnstyleactive} > <MaterialIcons name='favorite-border' /> Brands</Text>
                                                    :
                                                    <Text onPress={() => props.getdataalert('Brands')} style={styles.filterbtnstyle} > <MaterialIcons name='favorite-border' /> Brands</Text>

                                            }
                                            {
                                                catfilteractive === true ?
                                                    <Text onPress={() => props.getdataalert('Category')} style={styles.filterbtnstyleactive} > <MaterialIcons name='view-list' /> Category</Text>
                                                    :
                                                    <Text onPress={() => props.getdataalert('Category')} style={[styles.filterbtnstyle,]} > <MaterialIcons name='view-list' /> Category</Text>
                                            }
                                        </View>
                                    </>
                                    :
                                    <>
                                    </>
                    }



                    {props.display === 'custom' ?
                        <HeadStrapscustom />
                        : props.display === 'filter' ?
                            <HeadStrapsfilter /> :
                            props.display === 'custom_btn' ?
                                <HeadStrapscustom />
                                :
                                <HeadStraps />
                    }

                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={searchmodal}
                onRequestClose={() => { handleClosesearchmodal() }}
            >
                <View style={[styles.searchcontainer, modalBackgroundStyle]}>
                    <View style={[styles.orderdetails]}>
                        <TextInput
                            style={[styles.searchinputmodal]}
                            onChangeText={onChangezipcode}
                            value={searchinput}
                            autoFocus={true}
                            clearButtonMode="always"
                            clearTextOnFocus={true}
                            placeholder="Search Product"
                            placeholderTextColor='#5B4C51'
                        />
                        <Pressable onPress={() => handleClosesearchmodal()} >
                            <Text style={[styles.fc_brown, styles.fs_14]}>cancel</Text>
                        </Pressable>
                    </View>

                    <View>
                        {
                            searchresult.map((value, index) => {
                                return (
                                    <Pressable style={[styles.orderdetails]} onPress={() => handleonclicksearch(value.product_id)} >
                                        <Pressable style={[styles.searchsuggestion]} key={index}>
                                            <Text style={[styles.fs_14]}>{value.product_name}</Text>
                                        </Pressable>

                                        <Text style={[styles.fs_14]}>
                                            <MaterialIcons name='call-made' style={[styles.fs_018, styles.fc_brown]} />
                                        </Text>

                                    </Pressable>
                                )
                            })
                        }
                    </View>
                </View>
            </Modal>
            {/* <ForegroundHandler /> */}
        </>

    );
});

export default Header;