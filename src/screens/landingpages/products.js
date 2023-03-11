import React from 'react';
import { View, FlatList, Alert, BackHandler, ActivityIndicator, Text, Modal, TouchableWithoutFeedback, Pressable, ScrollView, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Productlist from '../components/productlist';
import Bottommenu from '../components/bottommenu';
import { axiosInstance } from '../../services';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Gridskeleton from '../components/gridskeleton';

const ProductsScreen = ({ navigation }) => {

    const [spinner, setspinner] = React.useState(false);
    const [apiloading, setapiloading] = React.useState(false);

    const [Categoryfilter, setCategoryfilter] = React.useState(false);
    const [brandfilter, setbrandfilter] = React.useState(false);
    const [sortfilter, setsortfilter] = React.useState(false);

    const [products, setproducts] = React.useState([]);
    const [brandlist, setbrandlist] = React.useState([]);
    const [categorylist, setcategorylist] = React.useState([]);

    const [selectedcategory, setselectedcategory] = React.useState([]);
    const [selectedbrands, setselectedbrands] = React.useState([]);
    const [selectedsort, setselectedsort] = React.useState('relevance');

    const childCompRef = React.useRef(null);

    React.useEffect(() => {
        getdata();
        // Exit app event handler
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            backHandler.remove();
        }
    }, []);

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         getdata();
    //     });
    //     return () => {
    //         unsubscribe();
    //     }
    // }, [navigation]);

    async function getdata() {
        // console.log(selectedcategory);
        setapiloading(true);
        let JsonValue = {
            "test": '1'
        }
        axiosInstance.post('mobile_product/get/', JsonValue)
            .then((res) => {
                if (res.data.status === 201) {
                    setproducts(res.data.data);
                    setbrandlist(res.data.fetch_data.brand);
                    setcategorylist(res.data.fetch_data.category);
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

    function getdataalert(data) {
        if (data === 'Brands') {
            setbrandfilter(true);
        }
        if (data === 'Category') {
            setCategoryfilter(true);
        }
        if (data === 'Sort') {
            setsortfilter(true);
        }
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

    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
        setInterval(() => {
            setVisible(!visible);
        }, 2000);
    }, []);

    var modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    };

    const handlecategoryonpress = (data, index, id) => {
        let dummyarray = categorylist;
        for (let i = 0; i < dummyarray.length; i++) {
            if (data === 'unselect') {
                if (dummyarray[i]['cate_id'] === id) {
                    categorylist[i]['selected_flag'] = "0"
                }
            }
            if (data === 'select') {
                if (dummyarray[i]['cate_id'] === id) {
                    categorylist[i]['selected_flag'] = "1"
                }
            }
        }
        setcategorylist([...categorylist]);
    }

    const handelbrandonpress = (data, index, id) => {
        let dummyarray = brandlist;
        for (let i = 0; i < dummyarray.length; i++) {
            if (data === 'unselect') {
                if (dummyarray[i]['brand_id'] === id) {
                    brandlist[i]['selected_flag'] = "0"
                }
            }
            if (data === 'select') {
                if (dummyarray[i]['brand_id'] === id) {
                    brandlist[i]['selected_flag'] = "1"
                }
            }
        }
        setbrandlist([...brandlist]);
    }

    const handelsortonpress = (data) => {
        setselectedsort(data);
        handlesubmitform(data);
    }

    const closeModal = () => {
        let dummyarray = categorylist;
        if (selectedcategory.length > 0) {
            for (let k = 0; k < selectedcategory.length; k++) {
                for (let j = 0; j < dummyarray.length; j++) {
                    if (selectedcategory[k] === dummyarray[j]['cate_id']) {
                        categorylist[j]['selected_flag'] = "1"
                    }
                }
            }
            setcategorylist([...categorylist]);
        }
        else {
            for (let i = 0; i < dummyarray.length; i++) {
                categorylist[i]['selected_flag'] = "0";
            }
            setcategorylist([...categorylist]);
        }
        setCategoryfilter(false);
    }

    const closeModalbrand = () => {
        let dummyarray = brandlist;
        if (selectedbrands.length > 0) {
            for (let k = 0; k < selectedbrands.length; k++) {
                for (let j = 0; j < dummyarray.length; j++) {
                    if (selectedbrands[k] === dummyarray[j]['brand_id']) {
                        brandlist[j]['selected_flag'] = "1"
                    }
                }
            }
            setbrandlist([...brandlist]);
        }
        else {
            for (let i = 0; i < dummyarray.length; i++) {
                brandlist[i]['selected_flag'] = "0";
            }
            setbrandlist([...brandlist]);
        }
        setbrandfilter(false);
    }

    const closeModalsort = () => {
        setsortfilter(false);
    }

    const handlesubmitform = (sortdata) => {

        setbrandfilter(false);
        setCategoryfilter(false);
        setsortfilter(false);
        setspinner(true);

        let dummyarray = categorylist;
        let selectedcategorylist = [];
        for (let i = 0; i < dummyarray.length; i++) {
            if (categorylist[i]['selected_flag'] === "1") {
                selectedcategorylist.push(dummyarray[i]['cate_id']);
            }
        }
        setselectedcategory([...selectedcategorylist]);

        let dummyarray_brand = brandlist;
        let selectedbrantlits = [];
        for (let j = 0; j < dummyarray_brand.length; j++) {
            if (brandlist[j]['selected_flag'] === "1") {
                selectedbrantlits.push(dummyarray_brand[j]['brand_id']);
            }
        }
        setselectedbrands([...selectedbrantlits]);

        let selectedsort_l = '';
        if (sortdata === undefined) {
            selectedsort_l = selectedsort;
        }
        else {
            selectedsort_l = sortdata;
        }

        let fynalsort = '';
        if (selectedsort_l === 'relevance') {
            fynalsort = '';
        }
        else {
            fynalsort = selectedsort_l;
        }

        if (selectedcategorylist.length > 0) {
            childCompRef.current.updatecategoryfinterstatus(true);
        }
        else {
            childCompRef.current.updatecategoryfinterstatus(false);
        }

        if (selectedbrantlits.length > 0) {
            childCompRef.current.updatebrandsfinterstatus(true);
        }
        else {
            childCompRef.current.updatebrandsfinterstatus(false);
        }

        if (fynalsort !== '') {
            childCompRef.current.updateshortfinterstatus(true);
        }
        else {
            childCompRef.current.updateshortfinterstatus(false);
        }

        let JsonValue = {
            brand: selectedbrantlits,
            category: selectedcategorylist,
            short: fynalsort
        }

        axiosInstance.post('mobile_search/filter/', JsonValue)
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
                setspinner(false);
            })
            .catch(() => {
                setspinner(false);
            });
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header ref={childCompRef} getdataalert={getdataalert} navigation={navigation} backvisible='true' display='filter' type='filter' distplaytext='Recent Orders' icon='yes' />
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
                        {
                            products.length > 0 ?
                                <FlatList
                                    numColumns={2}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={products}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (<Productlist items={item} navigation={navigation} />)}
                                />
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
                <Bottommenu singlebtn="no" bnt_txtt="" navigation={navigation} active_style="store" />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={Categoryfilter}
                onRequestClose={() => {
                    setCategoryfilter(false)
                }}
                onBackdropPress={() => setCategoryfilter(false)}>
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={[styles.filterlistmodal]}>
                        <View style={[styles.modalclosennfilter, styles.brtptw]}>
                            <Text style={[styles.fs_018, styles.fc_brown]}>
                                Category filter
                            </Text>
                            <Pressable onPress={() => closeModal()}>
                                <Text>
                                    <MaterialIcons style={[styles.fs_33, styles.fc_brown]} name='cancel' />
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.filterdataview}>
                            {
                                categorylist.map((value, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {
                                                value.selected_flag === "1" ?
                                                    <TouchableWithoutFeedback
                                                        onPress={() => handlecategoryonpress('unselect', index, value.cate_id)} >
                                                        <Text style={[styles.filterdataselected]}>{value.category_name}</Text>
                                                    </TouchableWithoutFeedback> :
                                                    <TouchableWithoutFeedback
                                                        onPress={() => handlecategoryonpress('select', index, value.cate_id)} >
                                                        <Text style={[styles.filterdata, styles.fc_brown]}>{value.category_name}</Text>
                                                    </TouchableWithoutFeedback>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </View>

                        <View style={[styles.mT_02, styles.mB_02]}>
                            <Pressable style={styles.buttonfilterdet} onPress={() => handlesubmitform()}>
                                <Text style={styles.btntext}>{'Apply filter'}</Text>
                            </Pressable>
                        </View>



                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={brandfilter}
                onRequestClose={() => {
                    closeModalbrand()
                }}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={[styles.filterlistmodal]}>
                        <View style={[styles.modalclosennfilter, styles.brtptw]}>
                            <Text style={[styles.fs_018, styles.fc_brown]}>
                                Brands filter
                            </Text>
                            <Pressable onPress={() => closeModalbrand()}>
                                <Text>
                                    <MaterialIcons style={[styles.fs_33, styles.fc_brown]} name='cancel' />
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.filterdataview}>
                            {
                                brandlist.map((value, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {
                                                value.selected_flag === "1" ?
                                                    <TouchableWithoutFeedback
                                                        onPress={() => handelbrandonpress('unselect', index, value.brand_id)} >
                                                        <Text style={[styles.filterdataselected]}>{value.brand_name}</Text>
                                                    </TouchableWithoutFeedback> :
                                                    <TouchableWithoutFeedback
                                                        onPress={() => handelbrandonpress('select', index, value.brand_id)} >
                                                        <Text style={[styles.filterdata, styles.fc_brown]}>{value.brand_name}</Text>
                                                    </TouchableWithoutFeedback>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </View>

                        <View style={[styles.mT_02, styles.mB_02]}>
                            <Pressable style={styles.buttonfilterdet} onPress={() => handlesubmitform()}>
                                <Text style={styles.btntext}>{'Apply filter'}</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={sortfilter}
                onRequestClose={() => {
                    closeModalsort()
                }}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={[styles.filterlistmodal]}>
                        <View style={[styles.modalclosennfilter, styles.brtptw]}>
                            <Text style={[styles.fs_018, styles.fc_brown]}>
                                Sort by
                            </Text>
                            <Pressable onPress={() => closeModalsort()}>
                                <Text>
                                    <MaterialIcons style={[styles.fs_33, styles.fc_brown]} name='cancel' />
                                </Text>
                            </Pressable>
                        </View>

                        <TouchableWithoutFeedback
                            onPress={() => handelsortonpress('relevance')} >

                            {
                                selectedsort === 'relevance'
                                    ?
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_blue]}>
                                            Relevance
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_blue]} name='radio-button-checked' />
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_brown]}>
                                            Relevance
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_brown]} name='radio-button-unchecked' />
                                        </Text>
                                    </View>
                            }

                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => handelsortonpress('lowtohigh')} >

                            {
                                selectedsort === 'lowtohigh'
                                    ?
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_blue]}>
                                            Price -- Low to High
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_blue]} name='radio-button-checked' />
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_brown]}>
                                            Price -- Low to High
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_brown]} name='radio-button-unchecked' />
                                        </Text>
                                    </View>
                            }

                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => handelsortonpress('hightolow')} >
                            {
                                selectedsort === 'hightolow'
                                    ?
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_blue]}>
                                            Price -- High to Low
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_blue]} name='radio-button-checked' />
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_brown]}>
                                            Price -- High to Low
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_brown]} name='radio-button-unchecked' />
                                        </Text>
                                    </View>
                            }



                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => handelsortonpress('atoz')} >
                            {
                                selectedsort === 'atoz'
                                    ?
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_blue]}>
                                            Products -- A to Z
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_blue]} name='radio-button-checked' />
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_brown]}>
                                            Products -- A to Z
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_brown]} name='radio-button-unchecked' />
                                        </Text>
                                    </View>
                            }
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => handelsortonpress('ztoa')} >
                            {
                                selectedsort === 'ztoa'
                                    ?
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_blue]}>
                                            Products -- Z to A
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_blue]} name='radio-button-checked' />
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.logo_nd_icon, styles.mB_008]}>
                                        <Text style={[styles.mB_008, styles.fs_14, styles.fc_brown]}>
                                            Products -- Z to A
                                        </Text>
                                        <Text style={[styles.mB_008, styles.fs_14]}>
                                            <MaterialIcons style={[styles.fs_018, styles.fc_brown]} name='radio-button-unchecked' />
                                        </Text>
                                    </View>
                            }
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default ProductsScreen;
