import React from 'react';
import { Text, View, Pressable, Modal, Image } from 'react-native';
import styles from '../../styles/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalStraps from '../straps/modalstraps';

const Bottommenu = (props) => {

    const [text, onChangeText] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
    function openModal(text) {
        if (text === 'Continue to Payment') {
            props.getmydatas()
        }
        if (text === 'Checkout') {
            props.paymentprocess()
        }
        if (text === 'Back To Home') {
            props.navigation.navigate('Homescreen');
        }
        // else {
        //     setModalVisible(true);
        // }
    }
    function closeModal() {
        setModalVisible(false);
        props.navigation.navigate('Namescreen')
    }
    var modalBackgroundStyle = {
        backgroundColor: 'rgba(130, 200, 192, 0.4)'
    };
    var innerContainerTransparentStyle = { backgroundColor: '#fff' };

    return (
        <>
            <View style={styles.bottom_menu}>
                <View style={styles.bottom_cnt}>
                    {
                        props.singlebtn === 'yes' ?
                            <>
                                <Pressable style={[styles.bottom_menu_btn]} onPress={() => openModal(props.bnt_txtt)}>
                                    <Text style={styles.btntext}>{props.bnt_txtt}</Text>
                                </Pressable>
                            </>
                            :
                            <>
                                <Pressable onPress={() => props.navigation.navigate('Homescreen')}>
                                    <MaterialIcons name='home-filled' style={[styles.fs_33, styles.text_center, props.active_style === 'home' ? styles.fc_blue : styles.fc_white]} />
                                    <Text style={[styles.fs_10, styles.mT_004, styles.fw_bold, props.active_style === 'home' ? styles.fc_blue : styles.fc_white]}>Home</Text>
                                </Pressable>
                                <Pressable style={styles.text_center} onPress={() => props.navigation.navigate('Categoryscreen')}>
                                    <MaterialIcons name='search' style={[styles.fs_33, styles.text_center, props.active_style === 'browse' ? styles.fc_blue : styles.fc_white]} />
                                    <Text style={[styles.fs_10, styles.mT_004, styles.fw_bold, props.active_style === 'browse' ? styles.fc_blue : styles.fc_white]}>Browse</Text>
                                </Pressable>
                                <Pressable onPress={() => props.navigation.navigate('Productsscreen')}>
                                    <MaterialIcons name='storefront' style={[styles.fs_33, styles.text_center, props.active_style === 'store' ? styles.fc_blue : styles.fc_white]} />
                                    <Text style={[styles.fs_10, styles.mT_004, styles.fw_bold, props.active_style === 'store' ? styles.fc_blue : styles.fc_white]}>Store</Text>
                                </Pressable>
                                <Pressable onPress={() => props.navigation.navigate('Recentordersscreen')}>
                                    <MaterialIcons name='article' style={[styles.fs_33, styles.text_center, props.active_style === 'recentorders' ? styles.fc_blue : styles.fc_white]} />
                                    <Text style={[styles.fs_10, styles.mT_004, styles.fw_bold, props.active_style === 'recentorders' ? styles.fc_blue : styles.fc_white]}>Recent Orders</Text>
                                </Pressable>
                                <Pressable onPress={() => props.navigation.navigate('Profilescreen')}>
                                    <MaterialIcons name='person' style={[styles.fs_33, styles.text_center, props.active_style === 'profile' ? styles.fc_blue : styles.fc_white]} />
                                    <Text style={[styles.fs_10, styles.mT_004, styles.fw_bold, props.active_style === 'profile' ? styles.fc_blue : styles.fc_white]}>Profile</Text>
                                </Pressable>
                            </>
                    }

                </View>
                {/* bottom menu strips start */}
                <View style={styles.bottommenustrapone}></View>
                <View style={styles.bottommenustraptwo}></View>
                <View style={styles.bottommenustrapthree}></View>
                <View style={styles.bottommenustrapfour}></View>
                {/* bottom menu strips end */}


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
                            <View style={styles.modal_body_cnt}>
                                <Text style={[styles.modal_body_txt, styles.fc_brown]}>Please give us a Rate</Text>
                                <Image
                                    resizeMode="contain"
                                    source={require('../../../assets/img/review.png')}
                                    style={{
                                        width: 100,
                                        height: 50
                                    }}
                                />
                                <Pressable onPress={() => closeModal()}>
                                    <Text style={[styles.modal_body_txt, styles.mT_04, styles.fs_45, styles.fc_brown]}>ok</Text>
                                </Pressable>
                            </View>
                            <ModalStraps />
                        </View>
                    </View>
                </Modal>

            </View>




        </>
    );
}

export default Bottommenu;