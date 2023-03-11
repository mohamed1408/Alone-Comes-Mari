import React from 'react';
import { View, Image, TextInput, Text, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from '../../styles/style';
import HeadStraps from '../straps/headstraps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeadStrapscustom from '../straps/headstrapscustom';

const Orderlist = (props) => {
    const [zipcode, onChangezipcode] = React.useState("");
    return (
        <Pressable style={styles.mainCardView} onPress={() => props.navigation.navigate('Recentorderdetailsscreen')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.subCardView}>
                    <Image
                        resizeMode="contain" source={require('../../../assets/img/prod_2.png')}
                        style={{
                            height: 65,
                            width: 65,
                        }}
                    />
                </View>
                <View style={styles.mL_025}>
                    <Text
                        style={styles.product_name}>
                        {props.items.prod_name}
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            alignContent: 'center',
                            marginTop: 4,
                            borderWidth: 0,
                        }}>
                        <Text
                            style={styles.product_price}>
                            $ {props.items.prod_price}
                        </Text>
                        <Text
                            style={[styles.product_offer, styles.textDecorationLine, styles.mL_005]}>
                            {props.items.prod_offer_amt} %
                        </Text>
                        <Text
                            style={styles.product_offer}>
                            Off
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={styles.product_btn}>
                <Text style={[styles.fc_white, styles.fs_18]}>
                    {props.items.prod_status}
                </Text>
            </View>
        </Pressable>
    );
}

export default Orderlist;