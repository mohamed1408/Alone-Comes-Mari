import React from 'react';
import { Text, View, ScrollView, Pressable, Modal, BackHandler, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import ModalStraps from '../straps/modalstraps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgeScreen = ({ navigation }) => {

    React.useEffect(() => {
        setTimeout(() => {
            setspinner(false);
        }, 500);
        // Exit app event handler
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            backHandler.remove();
        }
    }, []);

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

    const [modalVisible, setModalVisible] = React.useState(false);
    const [spinner, setspinner] = React.useState(false);
    const [formdata, setformdata] = React.useState({
        first_option: '',
        second_option: '',
        third_option: '',
    });
    const [formerror, setformerror] = React.useState({
        first_option: '',
        second_option: '',
        third_option: '',
    });

    function openModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    var modalBackgroundStyle = {
        backgroundColor: 'rgba(130, 200, 192, 0.4)'
    };

    var innerContainerTransparentStyle = { backgroundColor: '#fff' };

    const handleselect = (index, secondindex) => {
        setformdata({
            ...formdata,
            [index]: secondindex
        })
    }

    const validateform = () => {
        let firsterrormsg = '';
        let seconderrormsg = '';
        let thirderrormsg = '';

        if (formdata.first_option === '') {
            firsterrormsg = 'Select one of these options!';
        }

        if (formdata.second_option === '') {
            seconderrormsg = 'Select one of these options!';
        }

        if (formdata.third_option === '') {
            thirderrormsg = 'Select one of these options!';
        }

        if (firsterrormsg || seconderrormsg || thirderrormsg) {
            setformerror({
                first_option: firsterrormsg,
                second_option: seconderrormsg,
                third_option: thirderrormsg
            });
            return false;
        }
        else {
            return true;
        }
    }

    const handlesubmitform = async () => {
        var validate = validateform();
        if (validate) {
            setformerror({
                first_option: '',
                second_option: '',
                third_option: '',
            });
            if (formdata.first_option === 'heckyeah' && formdata.second_option === 'thatsme' && formdata.third_option === 'over') {
                setspinner(true);
                await AsyncStorage.setItem('ageverification', 'true');
                setspinner(false);
                navigation.navigate('Zipcodescreen');
            }
            else {
                openModal();
            }
        }
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='true' display='' type='' distplaytext='' icon='no' />
            {
                spinner === true ?
                    <View style={styles.spinnerView}>
                        <ActivityIndicator size="large" color="#FFFF" />
                    </View>
                    :
                    null
            }

            {/* Main content start */}
            <ScrollView
                style={styles.maincontent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.headerlable}>
                    <Text style={styles.headerlabletext}>Please help us by answering these questions</Text>
                </View>
                <View style={[styles.mT_03, styles.custcheckbox]}>
                    <Text style={[styles.checkboxlable, styles.pL_10]}>I am 21+</Text>
                    <View style={[styles.checkboxoption, styles.border_bottom]}>
                        <Pressable onPress={() => handleselect('first_option', 'imayoungster')}>
                            <Text style={[styles.checkboxoption_left, formdata.first_option === 'imayoungster' ? styles.selected_color_d : '']}>
                                I'm a Youngster
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => handleselect('first_option', 'heckyeah')}>
                            <Text style={[styles.checkboxoption_right, formdata.first_option === 'heckyeah' ? styles.selected_color_d : '']}>
                                Heck yeah!
                            </Text>
                        </Pressable>
                    </View>
                    {
                        formerror.first_option !== '' ?
                            <>
                                <Text style={[styles.checkboxlable, styles.errortext]}>{formerror.first_option}</Text>
                            </>
                            :
                            <Text style={[styles.checkboxlable, styles.errortext]}>{''}</Text>
                    }
                </View>
                <View style={[styles.mT_05, styles.custcheckbox]}>
                    <Text style={[styles.checkboxlable, styles.pL_10]}>I am 18+ with medical card</Text>
                    <View style={[styles.checkboxoption, styles.border_bottom]}>
                        <Pressable onPress={() => handleselect('second_option', 'nopebro')}>
                            <Text style={[styles.checkboxoption_left, formdata.second_option === 'nopebro' ? styles.selected_color_d : '']}>
                                Nope bro!
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => handleselect('second_option', 'thatsme')}>
                            <Text style={[styles.checkboxoption_right, formdata.second_option === 'thatsme' ? styles.selected_color_d : '']}>
                                That's me!
                            </Text>
                        </Pressable>
                    </View>
                    {
                        formerror.second_option !== '' ?
                            <>
                                <Text style={[styles.checkboxlable, styles.errortext]}>{formerror.second_option}</Text>
                            </>
                            :
                            <Text style={[styles.checkboxlable, styles.errortext]}>{''}</Text>
                    }
                </View>

                <View style={[styles.mT_05, styles.custcheckbox]}>
                    <Text style={[styles.checkboxlable, styles.pL_10]}>Under 21</Text>
                    <View style={[styles.checkboxoption, styles.border_bottom]}>
                        <Pressable onPress={() => handleselect('third_option', 'under')}>
                            <Text style={[styles.checkboxoption_left, formdata.third_option === 'under' ? styles.selected_color_d : '']}>
                                I am under 21
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => handleselect('third_option', 'over')}>
                            <Text style={[styles.checkboxoption_right, formdata.third_option === 'over' ? styles.selected_color_d : '']}>
                                I am over 21, dude!
                            </Text>
                        </Pressable>
                    </View>
                    {
                        formerror.third_option !== '' ?
                            <>
                                <Text style={[styles.checkboxlable, styles.errortext]}>{formerror.third_option}</Text>
                            </>
                            :
                            <Text style={[styles.checkboxlable, styles.errortext]}>{''}</Text>
                    }
                </View>
            </ScrollView>


            {/* button start here */}
            <View style={styles.nextbtn}>
                {/* navigation.navigate('Zipcodescreen') */}
                <Pressable style={styles.button} onPress={() => handlesubmitform()}>
                    <Text style={styles.btntext}>{'Next >'}</Text>
                </Pressable>
            </View>
            {/* button end here */}


            {/* Bottom Strap design start */}
            <BottomStraps />
            {/* Bottom Strap design end */}


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { closeModal() }}
            >
                <View style={[styles.container, modalBackgroundStyle, styles.mymodal_cont]}>
                    <View style={[innerContainerTransparentStyle, styles.modal_body]}>
                        <Pressable onPress={() => closeModal()} style={styles.modalclosenn}>
                            <Text>
                                <MaterialIcons style={[styles.fs_33, styles.fc_brown]} name='cancel' />
                            </Text>
                        </Pressable>
                        <View style={[styles.modal_body_cnt]}>
                            <Text style={[styles.modal_body_txt, styles.text_center, styles.fc_brown]}>We are sorry, you must be 21+ or 18+ with a medical recommendation to proceed further</Text>
                            <Pressable>
                                <Text style={[styles.modal_body_txt, styles.mT_02, styles.fs_40, styles.fc_brown]}>{': ('}</Text>
                            </Pressable>
                        </View>
                        <ModalStraps />
                    </View>
                </View>
            </Modal>

        </SafeAreaView>

    );
};

export default AgeScreen;
