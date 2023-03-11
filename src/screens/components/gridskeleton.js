import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from '../../styles/style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const Gridskeleton = (props) => {
    return (
        <ScrollView
            style={styles.maincontent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <SkeletonPlaceholder borderRadius={4} backgroundColor={'#AAAAAA80'} highlightColor={'#00000020'} speed={1000}>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                    <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderRadius={5} />
                    </View>
                    <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderRadius={5} />
                    </View>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                    <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderRadius={5} />
                    </View>
                    <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderRadius={5} />
                    </View>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                    <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderRadius={5} />
                    </View>
                    <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderRadius={5} />
                    </View>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                    <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderRadius={5} />
                    </View>
                    <View style={{ width: "47%", margin: "1.5%", overflow: 'hidden', backgroundColor: "#FFFF", borderRadius: 10 }}>
                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderRadius={5} />
                    </View>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </ScrollView>
    );
}

export default Gridskeleton;