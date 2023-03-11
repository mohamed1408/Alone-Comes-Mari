import { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";

const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state.isInternetReachable);
        });
        return () => {
            unsubscribe();
        }
    }, [isOnline]);
    return { isOnline };
};

export default useNetworkStatus;