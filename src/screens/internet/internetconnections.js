import React from 'react';
import { Text, View, ScrollView, BackHandler, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import BottomStraps from '../straps/bottomstraps';
import Header from '../components/header';
import NetInfo from "@react-native-community/netinfo";

const InternetconnectionScreen = ({ navigation }) => {
    const [isOnline, setisOnline] = React.useState(true);
    React.useEffect(() => {
        let currentindex = navigation.getState().index - 1;
        let previousScreen = navigation.getState().routes[currentindex].name;
        // let currentindex = navigation.getState().routes[currentindex].name;
        const unsubscribeInternet = NetInfo.addEventListener(state => {
            setisOnline(state.isInternetReachable);
            if (state.isInternetReachable === true) {
                navigation.navigate(previousScreen);
            }
        });
        return () => {
            unsubscribeInternet();
        }
    }, [navigation]);

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='false' display='' type='' distplaytext='' icon='no' />
            {/* Main content start */}
            <ScrollView
                style={styles.maincontent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {/* Name input start here */}
                <View style={styles.nameinput_div}>
                    <Text style={styles.textlable}>No internet connected</Text>
                </View>
                {/* Name input end here */}
            </ScrollView>
            {/* Main content end */}


            {/* Bottom Strap design start */}
            <BottomStraps />
            {/* Bottom Strap design end */}
        </SafeAreaView>
    );
};

export default InternetconnectionScreen;
