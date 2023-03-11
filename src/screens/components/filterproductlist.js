import React from 'react';
import { View, Image, TextInput, Text, ImageBackground, Pressable } from 'react-native';
import styles from '../../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Filterproductlist = (props) => {
    const [zipcode, onChangezipcode] = React.useState("");

    const handlenavigate = async (id) => {
        await AsyncStorage.setItem('categoryId', id);
        props.navigation.navigate('Categoryproductsscreen');
    }

    return (
        <View style={styles.filterCardView}>

            {
                props.items.Category_Image !== null ?
                    <Pressable onPress={() => handlenavigate(props.items.cate_id)} style={styles.catproducts}>
                        <ImageBackground
                            source={{ uri: props.items.Category_Image }} resizeMode="cover" style={styles.image_ii}>
                            <Text style={styles.text_oo}>{props.items.category_name}</Text>
                        </ImageBackground>
                    </Pressable>
                    :
                    <Pressable onPress={() => handlenavigate(props.items.cate_id)} style={styles.catproducts}>
                        <ImageBackground
                            source={require('../../../assets/img/prod_2.png')} resizeMode="cover" style={styles.image_ii}>
                            <Text style={styles.text_oo}>{props.items.category_name}</Text>
                        </ImageBackground>
                    </Pressable>
            }

            {/* <Image
                resizeMode="contain" source={require('../../../assets/img/prod_2.png')}
                style={styles.image_ii}
            /> */}
        </View >
    );
}

export default Filterproductlist;