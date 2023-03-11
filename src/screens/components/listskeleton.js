import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from '../../styles/style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const Listskeleton = (props) => {
    return (
        <ScrollView
            style={styles.maincontent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <SkeletonPlaceholder borderRadius={4} backgroundColor={'#AAAAAA80'} highlightColor={'#00000020'} speed={1000}>

                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>
                <View style={styles.CardView}>
                    <View style={[styles.cartdetails_disp, styles.mB_01, styles.mT_001]}>
                        <View style={{ width: '20%' }} onPress={() => handlenavigationproduct(value.product_id)}>
                            <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={5} />
                        </View>
                        <View style={[{ width: '80%' }, styles.mT_01]}>
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                            <SkeletonPlaceholder.Item width={250} height={10} borderRadius={2} style={[styles.mL_005, styles.mB_01]} />
                        </View>
                    </View>
                </View>

            </SkeletonPlaceholder>
        </ScrollView>
    );
}

export default Listskeleton;