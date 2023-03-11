import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { fontScale } = Dimensions.get("window");
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FCEBBC',
        fontFamily: 'harabara',
    },
    windowHeight: {
        height: windowHeight
    },
    maincontent: {
        zIndex: 1,
    },
    nameinput_div: {
        marginTop: windowHeight * 0.2,
        display: 'flex',
        alignItems: 'center',
    },
    nextbtn: {
        position: 'absolute',
        top: (windowHeight * 88) / 100,
        //bottom: 30,
        right: 30,
        zIndex: 1
    },
    input: {
        borderColor: '#5B4C51',
        backgroundColor: '#5B4C51',
        fontSize: 20,
        width: (windowWidth * 85) / 100,
        height: 45,
        color: '#fff',
        paddingLeft: 30
    },
    textlable: {
        alignSelf: 'flex-start',
        width: (windowWidth * 85) / 100,
        fontSize: 20,
        paddingLeft: 30,
        paddingBottom: 20,
        color: '#000',
    },
    textlable_s: {
        textAlign: "center",
        width: (windowWidth * 83) / 100,
        fontSize: 20,
        paddingLeft: 13,
        paddingBottom: 20,
        color: '#000',
    },
    button: {
        width: (windowWidth * 24) / 100,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        elevation: 5,
        backgroundColor: '#88C5AE',
        borderRadius: 25,
        borderBottomWidth: 3,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#88C5AE',
        borderBottomColor: '#FFEDB5'
    },
    btntext: {
        fontSize: 18,
        // fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#FFFF',
    },

    headerlable: {
        display: 'flex',
        alignItems: 'center',
        marginTop: windowHeight * 0.05,
    },
    headerlabletext: {
        width: (windowWidth * 85) / 100,
        color: '#5A3D2B',
        textAlign: 'center',
        fontSize: 21,
        letterSpacing: 1
    },
    custcheckbox: {
        width: (windowWidth * 90) / 100,
        paddingLeft: 30,
    },
    checkboxlable: {
        color: '#000',
        fontSize: 20
    },
    checkboxoption: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: windowHeight * 0.02,
        paddingBottom: windowHeight * 0.02,
    },
    checkboxoption_left: {
        width: windowWidth * .4,
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#E7791B',
    },
    checkboxoption_right: {
        width: windowWidth * .4,
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontSize: 16,
        color: '#E7791B'
    },
    selected_color_d: {
        color: '#77CCB2'
    },
    mT_004: {
        marginTop: windowHeight * 0.004,
    },
    mT_0: {
        marginTop: 0,
    },
    mT_01: {
        marginTop: windowHeight * 0.01,
    },
    mT_02: {
        marginTop: windowHeight * 0.02,
    },
    mT_035: {
        marginTop: windowHeight * 0.035,
    },
    mT_05: {
        marginTop: windowHeight * 0.038,
    },
    mT_038: {
        marginTop: 36,
    },
    mT_04: {
        marginTop: windowHeight * 0.04,
    },
    mT_07: {
        marginTop: windowHeight * 0.07,
    },
    mT_03: {
        marginTop: windowHeight * 0.05,
    },
    mT_15: {
        marginTop: windowHeight * 0.15,
    },
    mT_25: {
        marginTop: windowHeight * 0.25,
    },
    border_bottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#707070'
    },
    formgroup: {
        display: 'flex',
        alignItems: 'center',
    },
    fs_32: {
        fontSize: 26,
    },
    fs_23: {
        fontSize: 23,
    },
    fs_30: {
        fontSize: windowHeight * 0.030,
    },
    fs_33: {
        fontSize: windowHeight * 0.033,
    },
    forgotpass: {
        display: 'flex',
        alignItems: "flex-end",
        marginRight: 30,
        marginTop: 10
    },
    forgotpasstext: {
        color: '#000',
        fontSize: 14,
    },
    loginbtn: {
        display: 'flex',
        alignItems: 'center',
        marginTop: windowHeight * 0.06,
        elevation: 3,
    },
    loginbutton: {
        width: (windowWidth * 30) / 100,
        paddingVertical: 13,
        paddingHorizontal: 12,
    },
    registertxt: {
        color: '#5B4C51',
        fontSize: 18,
    },
    fs_10: {
        fontSize: 12,
    },
    fs_010: {
        fontSize: 10,
    },
    fs_018: {
        fontSize: 18,
    },
    fs_18: {
        fontSize: windowHeight * 0.020,
    },
    fs_26: {
        fontSize: windowHeight * 0.026,
    },
    fs_22: {
        fontSize: windowHeight * 0.022,
    },
    fs_24: {
        fontSize: windowHeight * 0.024,
    },
    fs_024: {
        fontSize: 24,
    },
    fs_14: {
        fontSize: 14,
    },
    fs_12: {
        fontSize: 12,
    },
    fs_20: {
        fontSize: 20,
    },
    fs_15: {
        fontSize: 15,
    },
    fw_bold: {
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    modal_body: {
        minWidth: (windowWidth * 71) / 100,
        minHeight: (windowHeight * 35) / 100,
        borderRadius: 20,
        overflow: 'hidden'
    },
    modal_body_checkout: {
        minWidth: (windowWidth * 71) / 100,
        height: 400,
        borderRadius: 20,
        overflow: 'hidden'
    },
    imageselectoption: {
        display: 'flex',
        alignItems: "center",
        marginTop: windowHeight * 0.03,
        paddingBottom: windowHeight * 0.02,
        borderBottomWidth: 0.5,
        borderBottomColor: '#rgba(130, 200, 192, 0.9)',
        width: (windowWidth * 60) / 100,
        marginLeft: 20
    },
    mT_04: {
        marginTop: windowHeight * 0.05,
    },
    bb_0: {
        borderBottomWidth: 0
    },
    fc_blue: {
        color: '#82C8C0'
    },
    fc_brown: {
        color: '#5B4C51'
    },
    fc_white: {
        color: '#FFFFFF'
    },
    fc_black: {
        color: '#000'
    },
    fc_yellow: {
        color: '#FFEDB5'
    },
    propic: {
        display: 'flex',
        alignItems: 'center',
    },
    proimage_d: {
        width: 226,
        height: 226,
        borderRadius: 226 / 2,
        overflow: "hidden",
    },
    licenseimage_d: {
        width: 335,
        height: 230,
        // borderRadius: 226 / 2,
        overflow: "hidden",
    },
    btnupload_c: {

        width: 100,
        height: 100,
        backgroundColor: '#F8B463',
        // padding:15,
        borderRadius: 100 / 2,
        borderWidth: 5,
        borderColor: '#82C8C0',
        textAlign: 'center'
    },

    otpbox: {
        backgroundColor: '#5B4C51',
        color: '#FFFF',
        fontSize: windowHeight * 0.026,
        width: windowWidth * 0.115,
        borderWidth: 0
    },

    mR_01: {
        marginRight: 10
    },
    mR_02: {
        marginRight: 20
    },
    mR_03: {
        marginRight: 30
    },
    mR_04: {
        marginRight: 40
    },
    mL_035: {
        marginLeft: 35
    },
    mB_0: {
        marginBottom: 0
    },
    mB_001: {
        marginBottom: 3
    },
    mT_001: {
        marginTop: 3
    },
    mL_025: {
        marginLeft: 25
    },
    mL_015: {
        marginLeft: 15
    },
    mL_005: {
        marginLeft: 5
    },
    mB_05: {
        marginBottom: 5
    },
    mB_015: {
        marginBottom: 15
    },
    mB_008: {
        marginBottom: 8
    },
    mB_07: {
        marginBottom: windowHeight * 0.07,
    },
    mB_06: {
        marginBottom: windowHeight * 0.06,
    },
    mB_006: {
        marginBottom: windowHeight * 0.05,
    },
    mB_01: {
        marginBottom: windowHeight * 0.01,
    },
    mB_02: {
        marginBottom: windowHeight * 0.02,
    },
    mB_04: {
        marginBottom: windowHeight * 0.04,
    },
    mB_03: {
        marginBottom: windowHeight * 0.03,
    },

    textDecorationLine: {
        textDecorationLine: 'line-through'
    },


    // Splash screen styles start *********************************************************** 

    splashlogo: {
        display: 'flex',
        alignItems: 'center',
        top: windowHeight * 0.15,
    },
    splashstrapone: {
        backgroundColor: '#5b4c51',
        width: windowWidth * 2,
        height: (windowHeight * 14) / 100,
        transform: [{ skewY: "-35deg" }],
        position: 'absolute',
        top: (windowHeight * 49) / 100,
        left: -25
    },
    splashstraptwo: {
        backgroundColor: '#ef545c',
        width: windowWidth * 2,
        height: (windowHeight * 14) / 100,
        transform: [{ skewY: "-35deg" }],
        position: 'absolute',
        top: (windowHeight * 62) / 100,
        left: -25
    },
    splashstrapthree: {
        backgroundColor: '#f9b564',
        width: windowWidth * 2,
        height: (windowHeight * 14) / 100,
        transform: [{ skewY: "-35deg" }],
        position: 'absolute',
        top: (windowHeight * 75) / 100,
        left: -25
    },
    splashstrapfour: {
        backgroundColor: '#82c8c0',
        width: windowWidth * 2,
        height: (windowHeight * 14) / 100,
        transform: [{ skewY: "-35deg" }],
        position: 'absolute',
        top: (windowHeight * 88) / 100,
        left: -25,
    },

    // Splash screen styles end ***********************************************************

    // Header styles start ****************************************************************

    // Header one start ***************

    headersection: {
        //height:100,
        width: windowWidth,
    },
    headersection_d: {
        // elevation:5,
        margin: -15,
        marginLeft: 5,
        width: windowWidth,
    },
    headerlogo: {
        aspectRatio: 1.8

    },
    headstrapone: {
        backgroundColor: '#5b4c51',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 0,
        right: -50
    },
    headstraptwo: {
        backgroundColor: '#ef545c',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 0,
        right: -80
    },
    headstrapthree: {
        backgroundColor: '#f9b564',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 0,
        right: -110
    },
    headstrapfour: {
        backgroundColor: '#82c8c0',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 0,
        right: -140
    },

    // Header one end *****************

    // Custom Header start *****************


    headersection_custom: {
        width: windowWidth - 50,
        height: windowHeight * 0.21,
        margin: -10
    },
    newiosheader: {
        height: 67,
        backgroundColor: '#FCEBBC',
        overflow: 'hidden',
        width: windowWidth,
    },
    hed_cust_dd: {
        height: 120,
        backgroundColor: '#FCEBBC',
        overflow: 'hidden',
        width: windowWidth,
    },
    hed_cust_btn_dd: {
        height: 130,
        backgroundColor: '#FCEBBC',
        overflow: 'hidden',
        width: windowWidth,
    },
    hed_filter_dd: {
        height: 165,
        backgroundColor: '#FCEBBC',
        overflow: 'hidden',
        width: windowWidth,
    },
    backshad: {
        overflow: 'hidden',
        paddingBottom: 0,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 22,
        elevation: 4,
        // background color must be set
        backgroundColor: "red" // invisible color

    },

    hed_dd: {
        backgroundColor: 'red'
    },
    headerlogo_custom: {
        width: windowHeight * 0.15,
        marginLeft: 15,
        // height:3
    },

    searchformgroup: {
        left: 10,
        zIndex: 2,
        bottom: 5
    },

    searchformgrouptwo: {
        left: 10,
        zIndex: 2,
        bottom: 8
    },

    logo_nd_icon: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        flex: 1
    },

    headicon: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        zIndex: 999,
    },

    customheadstrapone: {
        backgroundColor: '#5b4c51',
        width: windowWidth * .6,
        height: (windowHeight * 7) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 20,
        right: -64
    },

    customheadstraptwo: {
        backgroundColor: '#ef545c',
        width: windowWidth * .6,
        height: (windowHeight * 7) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 25,
        right: -100
    },

    customheadstrapthree: {
        backgroundColor: '#f9b564',
        width: windowWidth * .6,
        height: (windowHeight * 7) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 30,
        right: -135
    },

    customheadstrapfour: {
        backgroundColor: '#82c8c0',
        width: windowWidth * .6,
        height: (windowHeight * 7) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 35,
        right: -170
    },

    searchinput: {
        borderColor: '#FFFF',
        backgroundColor: '#FFFF',
        fontSize: 14,
        width: (windowWidth * 95) / 100,
        height: 40,
        color: '#5B4C51',
        paddingLeft: 15,
        borderRadius: 25
    },

    custheadertext: {
        left: windowHeight * 0.01,
        bottom: 10,
        zIndex: 2
    },

    cart_bag: {
        position: 'absolute',
        backgroundColor: '#82c8c0',
        borderRadius: 50,
        padding: 3,
        zIndex: 999,
        top: -10,
        left: 13,
        fontSize: windowHeight * 0.016,
        color: '#FFFF',
        fontWeight: 'bold',
        width: windowWidth * 0.05,
        textAlign: 'center'
    },
    // Custom Header end *******************

    // header filters  start ***********************
    filtergroups: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5B4C51',
        opacity: 0.9,
        zIndex: 1,
        marginLeft: 0,
        height: 45,
        width: windowWidth,
        bottom: 0,
    },
    filterbtnstyle: {
        color: 'white',
        width: '30%',
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        // paddingLeft:15, 
        // paddingRight:15, 
        borderRadius: 25,
        fontSize: 14
    },

    filterbtnstyleactive: {
        color: '#82C8C0',
        width: '30%',
        textAlign: 'center',
        borderColor: '#82C8C0',
        borderWidth: 1,
        padding: 5,
        // paddingLeft:15, 
        // paddingRight:15, 
        borderRadius: 25,
        fontSize: 14
    },


    filterheadstrapone: {
        backgroundColor: '#5b4c51',
        width: windowWidth * .7,
        height: (windowHeight * 8) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 30,
        right: -100
    },

    filterheadstraptwo: {
        backgroundColor: '#ef545c',
        width: windowWidth * .7,
        height: (windowHeight * 8) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 35,
        right: -140
    },

    filterheadstrapthree: {
        backgroundColor: '#f9b564',
        width: windowWidth * .7,
        height: (windowHeight * 8) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 40,
        right: -180
    },

    filterheadstrapfour: {
        backgroundColor: '#82c8c0',
        width: windowWidth * .7,
        height: (windowHeight * 8) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 45,
        right: -220
    },



    // header filters end **************************



    // Header styles end ******************************************************************

    // Bottom strap styles start **********************************************************

    bottomstrapone: {
        backgroundColor: '#5b4c51',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 92) / 100,
        right: -19
    },
    bottomstraptwo: {
        backgroundColor: '#ef545c',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 96) / 100,
        right: -19
    },
    bottomstrapthree: {
        backgroundColor: '#f9b564',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 100) / 100,
        right: -19
    },
    bottomstrapfour: {
        backgroundColor: '#82c8c0',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 104) / 100,
        right: -19
    },

    // Bottom strap styles end ************************************************************

    // Bottommenu strap styles start ************************************************************

    bottommenustrapone: {
        backgroundColor: '#5b4c51',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 0,
        right: -20,
        // opacity: 0.4
    },
    bottommenustraptwo: {
        backgroundColor: '#ef545c',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 5,
        right: -55,
        // opacity: 0.4
    },
    bottommenustrapthree: {
        backgroundColor: '#f9b564',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 0,
        right: -95,
        // opacity: 0.4
    },
    bottommenustrapfour: {
        backgroundColor: '#82c8c0',
        width: windowWidth * .5,
        height: (windowHeight * 6) / 100,
        transform: [{ skewY: "-45deg" }],
        position: 'absolute',
        top: 0,
        right: -130,
        // opacity: 0.4
    },

    // Bottommenu strap styles end ************************************************************


    // Style modal

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        overflow: 'hidden'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        minWidth: 250,
        minHeight: 250,
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        fontSize: 20 / fontScale,
        padding: 60
    },

    modalstrapone: {
        backgroundColor: '#5b4c51',
        width: windowWidth * .3,
        height: (windowHeight * 3) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 30) / 100,
        right: -9
    },
    modalstraptwo: {
        backgroundColor: '#ef545c',
        width: windowWidth * .3,
        height: (windowHeight * 3) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 30) / 100,
        right: -27
    },
    modalstrapthree: {
        backgroundColor: '#f9b564',
        width: windowWidth * .3,
        height: (windowHeight * 3) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 30) / 100,
        right: -45
    },
    modalstrapfour: {
        backgroundColor: '#82c8c0',
        width: windowWidth * .3,
        height: (windowHeight * 3) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 33) / 100,
        right: -45
    },
    mymodal_cont: {
        margin: 0,
        padding: 50,
    },



    checkoutmodalstrapone: {
        backgroundColor: '#5b4c51',
        width: windowWidth * .3,
        height: (windowHeight * 3) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 30) / 100,
        right: -9
    },
    checkoutmodalstraptwo: {
        backgroundColor: '#ef545c',
        width: windowWidth * .3,
        height: (windowHeight * 3) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 54) / 100,
        right: -27
    },
    checkoutmodalstrapthree: {
        backgroundColor: '#f9b564',
        width: windowWidth * .3,
        height: (windowHeight * 3) / 100,
        transform: [{ skewY: "-46deg" }],
        position: 'absolute',
        top: (windowHeight * 54) / 100,
        right: -45
    },
    checkoutmodalstrapfour: {
        backgroundColor: '#82c8c0',
        width: windowWidth * .3,
        height: (windowHeight * 3) / 100,
        transform: [{ skewY: "-35deg" }],
        position: 'absolute',
        top: (windowHeight * 39) / 100,
        right: -45
    },

    modal_body_cnt: {
        margin: 35,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text_center: {
        textAlign: 'center'
    },
    text_left: {
        textAlign: 'left'
    },
    text_right: {
        textAlign: 'right'
    },
    text_justify: {
        textAlign: "justify"
    },
    content_center: {
        alignItems: 'center'
    },
    modal_body_txt: {
        fontSize: 18,
        lineHeight: windowHeight * 0.042
    },
    fs_45: {
        fontSize: windowHeight * 0.045,
        lineHeight: windowHeight * 0.045
    },
    fs_40: {
        fontSize: windowHeight * 0.040,
        lineHeight: windowHeight * 0.040
    },
    pd_20: {
        padding: 20
    },
    pdL_05: {
        paddingLeft: 15
    },
    bottom_menu: {
        overflow: 'hidden',
        backgroundColor: '#5B4C51'
    },
    bottom_cnt: {
        display: 'flex',
        width: windowWidth,
        height: windowHeight * 0.07,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "flex-start",
        marginTop: 10,
        zIndex: 1
    },

    // Product listing

    mainCardView: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        // borderRadius: 10,
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 1,
        // shadowRadius: 8,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 3,
        marginRight: 3,
    },
    subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    product_name: {
        fontSize: 16,
        color: 'black',
        textTransform: 'capitalize',
    },
    product_price: {
        color: '#EF545C',
        fontSize: 16,
    },
    product_offer: {
        color: '#5B4C51',
        fontSize: 12,
        opacity: 0.8
    },
    product_btn: {
        height: 30,
        backgroundColor: '#82C8C0',
        borderWidth: 0,
        width: '30%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },


    CardView: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 5,
        padding: 10,
        margin: 15,
        marginBottom: 10,
        marginTop: 1,
        paddingBottom: 1
    },
    orderdetails: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        alignItems: 'center',
        bottom:2
    },
    button_order: {
        width: (windowWidth * 30) / 100,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 5,
        backgroundColor: '#88C5AE',
        borderRadius: 25,
        borderBottomWidth: 3,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#88C5AE',
        borderBottomColor: '#FFEDB5',
    },
    order_product_price: {
        color: 'red',
        fontSize: windowHeight * 0.020,
    },
    orderproddetsils: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        alignItems: 'center',
    },
    qtystyle: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        alignItems: 'center',
    },

    filterCardView: {
        width: "47%",
        margin: "1.5%",
        alignItems: "center",
        backgroundColor: "#FFF"
    },

    image_ii: {
        width: '100%',
        height: 200
    },

    text_oo: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        color: "white",
        fontSize: 14,
        lineHeight: 40,
        textAlign: "left",
        paddingLeft: 10,
        backgroundColor: "#000000c0"
    },
    prod_card: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // width: "48%",
        margin: "1%",
        padding: 2,
        alignItems: "center",
        backgroundColor: '#ffff',
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageoverlypp: {
        position: "absolute",
        zIndex: 2,
        bottom: 0,
        lineHeight: 40,
        paddingLeft: 10,
        color: "#fff",
        backgroundColor: "#000000a9",
        width: "100%"
    },
    imageoverlypp_two: {
        position: "absolute",
        zIndex: 2,
        top: 10,
        lineHeight: 40,
        paddingLeft: 20,
        color: "#fff",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'flex-start',
    },
    custbc: {
        backgroundColor: '#A89D97',
        borderRadius: 50,
        padding: 6
    },

    button_addtocart: {
        width: (windowWidth * 50) / 100,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 12,
        elevation: 15,
        backgroundColor: '#88C5AE',
        borderRadius: 25,
        borderBottomWidth: 3,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#88C5AE',
        borderBottomColor: '#FFEDB5'
    },
    _productdetails: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center"
    },
    modalclosenn: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: "flex-end",
        marginRight: 20,
        marginTop: 10
    },
    catproducts: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: "flex-end",
    },

    dropdown1BtnStyle: {
        width: '70%',
        height: 50,
        backgroundColor: '#FAEABB',
        borderRadius: 8,
        marginRight: 20,
        color: '#5B4C51'
    },

    deviverydate: {
        width: '70%',
        height: 50,
        backgroundColor: '#FAEABB',
        borderRadius: 8,
        color: '#5B4C51',
        textAlign: 'center',
        fontSize: 20
    },

    mb_view: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginRight: 20,
        marginTop: 10
    },
    zindex_9: {
        zindex_9: 3
    },

    custheadertext_right: {
        Right: windowHeight * 0.05,
        top: 1,
        zIndex: 2
    },
    bottom_menu_btn: {
        width: (windowWidth * 70) / 100,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 5,
        backgroundColor: '#88C5AE',
        borderRadius: 25,
        borderBottomWidth: 3,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#88C5AE',
        borderBottomColor: '#FFEDB5',
    },
    modalinput: {
        borderColor: '#5B4C51',
        backgroundColor: '#5B4C51',
        fontSize: windowHeight * 0.022,
        width: (windowWidth * 40) / 100,
        height: 45,
        color: '#fff',
        paddingLeft: 30,
        marginLeft: 20
    },
    modal_body_cust: {
        minWidth: (windowWidth * 10) / 100,
        minHeight: (windowHeight * 40) / 100,
        borderRadius: 20,
        overflow: 'hidden'
    },

    cust_bdy_ddd: {
        marginLeft: 30,
        zindex: 888
    },
    filterCardView_cust: {
        backgroundColor: "#ffff",
        padding: 3,
        margin: 10,
        height: 150,
        width: 250,
        borderRadius: 10
    },
    errortext: {
        color: '#dc3545',
        fontSize: windowHeight * 0.020,
        marginTop: 5
    },
    spinnerTextStyle: {
        color: '#fff'
    },
    ceheckboxlable: {
        marginLeft: 30,
        marginTop: 20,
        width: (windowWidth * 100) / 100,
    },
    checklabelStyle: {
        fontSize: windowHeight * 0.020,
        color: '#5B4C51',
    },
    registernextbtn: {
        marginLeft: windowWidth - 120,
    },
    pb_02: {
        paddingBottom: 0
    },
    color_b: {
        color: '#6c7174'
    },
    spinnerView: {
        position: "absolute",
        zIndex: 10000,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    pL_10: {
        paddingLeft: 10
    },
    ls_0: {
        letterSpacing: 0
    },
    fw_500: {
        fontWeight: '500'
    },
    colo_acmari: {
        color: '#5B4C51',
        opacity: 0.5,
    },
    lottie: {
        width: 100,
        height: 100,
    },
    filterlistmodal: {
        position: 'absolute',
        backgroundColor: '#ffff',
        width: windowWidth,
        bottom: 0,
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    brtp: {
        paddingBottom: 30,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray'
    },
    brbp: {
        paddingBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    filterdataview: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterdata: {
        borderWidth: 1,
        borderColor: '#5B4C51',
        margin: 5,
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 50,

    },
    filterdataselected: {
        borderWidth: 1,
        borderColor: '#5B4C51',
        backgroundColor: '#5B4C51',
        color: '#fff',
        margin: 5,
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 50,

    },
    modalclosennfilter: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: "space-between",
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 10
    },
    brtptw: {
        paddingBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        marginBottom: 20
    },

    buttonfilterdet: {
        width: (windowWidth * 95) / 100,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        elevation: 5,
        backgroundColor: '#88C5AE',
        borderRadius: 25,
        // borderBottomWidth: 3,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        borderColor: '#88C5AE',
        borderBottomColor: '#FFEDB5'
    },
    paymentdetls_dd: {
        borderBottomWidth: 0.2,
        paddingBottom: 15,
        paddingTop: 10,
        borderBottomColor: '#ccc'
    },
    noproductdiv: {
        marginTop: windowHeight * 0.3,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    },
    noproducttext: {
        alignSelf: 'center',
        fontSize: 18,
        marginBottom: 10,
        color: '#000',
    },
    cartdetails_disp: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    searchcontainer: {
        flex: 1,
        padding: 10
    },
    searchinputmodal: {
        borderColor: '#ccc',
        borderWidth: 0.5,
        backgroundColor: '#FFFF',
        fontSize: 14,
        width: (windowWidth * 82) / 100,
        height: 40,
        color: '#5B4C51',
        paddingLeft: 15,
        borderRadius: 5
    },
    searchsuggestion: {
        paddingTop: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
        paddingBottom: 10
    },

    byagainbtn: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'flex-end',
        alignItems: 'flex-end'
    },
}); 