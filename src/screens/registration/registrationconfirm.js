import React from 'react';
import { Text, View, ScrollView, Pressable, Alert, BackHandler, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import HeadStraps from '../straps/headstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterconfirmScreen = ({ navigation }) => {

    const otpInput = React.useRef(null);

    const clearText = () => {
        otpInput.current.clear();
    }

    const setText = () => {
        otpInput.current.setValue("1234");
    }

    React.useEffect(() => {

        setuserstatue();
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


    const setuserstatue = async () => {
        await AsyncStorage.setItem('registerstatus', 'true');
    }

    const handlenavigater = async () => {

        const loggedin = await AsyncStorage.getItem('loggedin');
        if (loggedin === 'true') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Homescreen' }],
            })
        }
        if (loggedin === null) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Loginscreen' }],
            })
        }


    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='true' display='' type='' distplaytext='' icon='no' />
            {/* Main content start */}
            <ScrollView
                style={styles.maincontent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.headerlable}>
                    <Text style={[styles.headerlabletext, styles.fs_32]}>Registration</Text>
                </View>

                <View style={[styles.formgroup, styles.mT_25]}>
                    <Text style={[styles.textlable_s, styles.fc_brown]}>All the details have been successfully registered!</Text>
                    <Text style={[styles.textlable_s, styles.fc_brown]}>A registration confirmation email has been sent</Text>
                </View>


            </ScrollView>
            {/* Main content end */}

            {/* button start here */}
            <View style={styles.nextbtn}>
                <Pressable style={styles.button} onPress={() => handlenavigater()}>
                    <Text style={styles.btntext}>{'Ready >'}</Text>
                </Pressable>
            </View>
            {/* button end here */}

            {/* Bottom Strap design start */}
            <BottomStraps />
            {/* Bottom Strap design end */}

        </SafeAreaView>
    );
};

export default RegisterconfirmScreen;
