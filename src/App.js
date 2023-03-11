import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/splash/splashscreen';
import Namescreen from './screens/login/getnamescreen';
import AgeScreen from './screens/login/getagescreen';
import ZipcodeScreen from './screens/login/getzipcodescreen';
import LoginScreen from './screens/login/loginscreen';
import RegistrationScreen from './screens/registration/registrationscreen';
import ProfilepicScreen from './screens/registration/getprofilepic';
import OtpScreen from './screens/registration/getotpscreen';
import RegisterconfirmScreen from './screens/registration/registrationconfirm';
import InternetconnectionScreen from './screens/internet/internetconnections';
import RecentordersScreen from './screens/landingpages/recentorders';
import DrivinglicensefrontScreen from './screens/registration/getdrivinglicensefront';
import RecentorderdetailScreen from './screens/landingpages/recentorderdetails';
import CategoryScreen from './screens/landingpages/category';
import ProductsScreen from './screens/landingpages/products';
import ProductsdetailsScreen from './screens/landingpages/productdetails';
import CartScreen from './screens/landingpages/mycart';
import PaymentScreen from './screens/landingpages/payments';
import OrderconfirmScreen from './screens/landingpages/orderconfirm';
import ProfileScreen from './screens/landingpages/profile';
import DrivinglicensebackScreen from './screens/registration/getdrivinglicenseback';
import CategoryProductsScreen from './screens/landingpages/categoryproducts';
import EditProfileScreen from './screens/landingpages/editprofile';
import MobileEditScreen from './screens/landingpages/mobileedit';
import MobileEditotpScreen from './screens/landingpages/mobileeditotp';
import EmailEditScreen from './screens/landingpages/emaileditscreen';
import EmailEditotpScreen from './screens/landingpages/emaileditotp';
import AddressEditScreen from './screens/landingpages/addressedit';
import ForgetpasswordScreen from './screens/login/forgetpasswordscreen';
import PasswordOtpScreen from './screens/login/passwordotpscreen';
import PasswordresetScreen from './screens/login/passwordresetscreen';
import HomeScreen from './screens/landingpages/homescreen';


const Stack = createNativeStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splashscreen">
        <Stack.Screen name="Splashscreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Namescreen" component={Namescreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Agescreen" component={AgeScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Zipcodescreen" component={ZipcodeScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Loginscreen" component={LoginScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Registrationscreen" component={RegistrationScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Profilepicscreen" component={ProfilepicScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Otpscreen" component={OtpScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Registerconfirmscreen" component={RegisterconfirmScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Internetconnectionscreen" component={InternetconnectionScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Drivinglicensefrontscreen" component={DrivinglicensefrontScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Drivinglicensebackscreen" component={DrivinglicensebackScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Recentordersscreen" component={RecentordersScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Recentorderdetailsscreen" component={RecentorderdetailScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Categoryscreen" component={CategoryScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Productsscreen" component={ProductsScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Categoryproductsscreen" component={CategoryProductsScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Productsdetailsscreen" component={ProductsdetailsScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Cartscreen" component={CartScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Paymentscreen" component={PaymentScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Orderconfirmscreen" component={OrderconfirmScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Profilescreen" component={ProfileScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Editprofilescreen" component={EditProfileScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Mobileeditscreen" component={MobileEditScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Mobileeditotpscreen" component={MobileEditotpScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Emaileditscreen" component={EmailEditScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Emaileditotpscreen" component={EmailEditotpScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Addresseditscreen" component={AddressEditScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Forgetpasswordscreen" component={ForgetpasswordScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Passwordotpscreen" component={PasswordOtpScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Passwordresetscreen" component={PasswordresetScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
        <Stack.Screen name="Homescreen" component={HomeScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
