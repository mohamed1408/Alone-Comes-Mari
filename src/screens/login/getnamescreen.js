import React from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Image, Alert, BackHandler, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import styles from '../../styles/style';
import Header from '../components/header';
import BottomStraps from '../straps/bottomstraps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeadStraps from '../straps/headstraps';
const Namescreen = ({ navigation }) => {

    const [errortext, setErrortext] = React.useState("");
    const [username, setusername] = React.useState("");
    const [spinner, setspinner] = React.useState(false);

    React.useEffect(() => {
        getdata();
        // Exit app event handler
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            // unsubscribe the Exit app event handler
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

    // const [isOnline, setisOnline] = React.useState(true);
    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         getdata();
    //     });
    //     const unsubscribeInternet = NetInfo.addEventListener(state => {
    //         setisOnline(state.isInternetReachable);
    //         if (state.isInternetReachable === false) {
    //             navigation.navigate('Internetconnectionscreen');
    //         }
    //     });
    //     return () => {
    //         unsubscribe();
    //         unsubscribeInternet();
    //     }
    // }, [navigation]);

    async function getdata() {
        const username = await AsyncStorage.getItem('username');
    }

    const onChangeusername = (e) => {
        setusername(e);
    }

    const handlevalidation = async () => {
        setErrortext('');
        if (username == '') {
            setErrortext('Name is required!');
        }
        else {
            setspinner(true);
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('nameverification', 'true');
            setspinner(false);
            navigation.navigate('Agescreen');
        }
    }

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='false' display='' type='' distplaytext='' icon='no' />
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
                {/* Name input start here */}
                <View style={styles.nameinput_div}>
                    <Text style={styles.textlable}>What is your name?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => onChangeusername(e)}
                        value={username}
                        placeholder="Name"
                        placeholderTextColor='#fff'
                    />
                    {
                        errortext !== '' ?
                            <>
                                <Text style={[styles.textlable, styles.errortext]}>{errortext}</Text>
                            </>
                            :
                            <Text style={[styles.textlable, styles.errortext]}>{''}</Text>
                    }
                </View>
                {/* Name input end here */}
            </ScrollView>
            {/* Main content end */}

            {/* button start here */}
            <View style={styles.nextbtn}>
                <Pressable style={styles.button} onPress={() => handlevalidation()}>
                    <Text style={styles.btntext}>{'Next >'}</Text>
                </Pressable>
            </View>
            {/* button end here */}


            {/* Bottom Strap design start */}
            <BottomStraps />
            {/* Bottom Strap design end */}
        </SafeAreaView>
    );
};

export default Namescreen;
