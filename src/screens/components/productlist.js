import React from 'react';
import { View, Image, TextInput, Text, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from '../../styles/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Productlist = (props) => {

    const handlegetproductdetail = async (product_id) => {
        await AsyncStorage.setItem('product_id', product_id);
        props.navigation.navigate('Productsdetailsscreen');
    }

    return (

        <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
            <Pressable onPress={() => handlegetproductdetail(props.items.product_id)}>
                <View style={{ height: 140, width: "100%", overflow: 'hidden' }}>
                    {
                        props.items.main_image !== null ?
                            <Image
                                source={{ uri: props.items.main_image }}
                                style={{
                                    width: '100%',
                                    height: 170
                                }}
                            />
                            :
                            <Image
                                source={require('../../../assets/img/prod_2.png')}
                                style={{
                                    width: '100%'
                                }}
                            />
                    }

                    <Text style={[styles.imageoverlypp, styles.fs_14]}>{props.items.category_name}</Text>
                </View>
                <View style={{ padding: 10, width: '100%' }}>
                    <Text style={[styles.fs_14, styles.fc_black, styles.mB_01, styles.fw_500]}>{props.items.product_name}</Text>
                    <Text style={[styles.fs_010, styles.fc_black, styles.mB_01,]}>{props.items.gm_size} gr</Text>
                    <View style={styles.orderdetails}>
                        <Text style={[styles.fc_blue,]}>
                            <MaterialIcons style={[styles.fs_22]} name='fiber-manual-record' />
                        </Text>
                        <Text style={[styles.fs_14, styles.colo_acmari,]}>ACMari</Text>
                        {
                            props.items.product_discount !== '0' ?
                                <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                    <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize:10, color:'#5B4C51', fontWeight:'400' }}>$ {props.items.product_price}</Text> $ {props.items.discounted_price}
                                </Text>
                                :
                                <Text style={[styles.fs_14, styles.fc_blue, styles.fw_bold]}>
                                    $ {props.items.product_price}
                                </Text>
                        }
                    </View>
                </View>
            </Pressable>
        </View>

        // <View style={{ flex: 1, alignItems: 'flex-start', margin: "2%", width:'50%' }}>
        //     <Pressable style={{ backgroundColor: "#FFFF", borderRadius: 10, overflow: 'hidden', width: "100%", }} onPress={() => props.navigation.navigate('Productsdetailsscreen')}>
        //         <View style={{ height: 165, width: "100%", overflow: 'hidden' }}>
        //             <Image
        //                 source={require('../../../assets/img/prod_2.png')}
        //                 style={{
        //                     width: '100%'
        //                 }}
        //             />
        //             <Text style={styles.imageoverlypp}>{props.items.prod_name}</Text>
        //         </View>
        //         <View style={{ padding: 10, width: 155 }}>
        //             <Text style={[styles.fs_26, styles.fc_black,styles.mB_015]}>Product</Text>
        //             <View style={styles.orderdetails}>
        //                 <Text style={[styles.fs_30, styles.fc_blue,]}>
        //                     <MaterialIcons style={styles.fs_30} name='fiber-manual-record' />
        //                 </Text>
        //                 <Text style={[styles.fs_22, styles.fc_brown,]}>ACMari</Text>
        //                 <Text style={[styles.fs_26, styles.fc_blue,styles.fw_bold,styles.text_right]}>$ 25</Text>
        //             </View>
        //         </View>
        //     </Pressable>
        // </View>
    );
}

export default Productlist;