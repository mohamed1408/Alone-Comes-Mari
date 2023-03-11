import React from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, Text, SafeAreaView } from 'react-native';
import styles from '../../styles/style';
import Header from '../components/header';
import Filterproductlist from '../components/filterproductlist';
import Bottommenu from '../components/bottommenu';
import { axiosInstance } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gridskeleton from '../components/gridskeleton';

const CategoryScreen = ({ navigation }) => {

    const [spinner, setspinner] = React.useState(false);
    const [apiloading, setapiloading] = React.useState(false);
    const [products, setproducts] = React.useState([]);

    React.useEffect(() => {
        async function getdata() {
            setapiloading(true);
            let JsonValue = {}
            axiosInstance.post('mobile_category/get/', JsonValue)
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
                    setapiloading(false);
                })
                .catch(() => {
                    setapiloading(false);
                });
        }

        getdata();
    }, []);

    return (
        <SafeAreaView style={[styles.body]}>
            <Header navigation={navigation} backvisible='true' display='custom' type='search' distplaytext='Recent Orders' icon='yes' />
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
                                    data={products}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (<Filterproductlist items={item} navigation={navigation} />)}
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
                <Bottommenu singlebtn="no" bnt_txtt="" navigation={navigation} active_style="browse" />
            </View>
        </SafeAreaView>
    );
};

export default CategoryScreen;
