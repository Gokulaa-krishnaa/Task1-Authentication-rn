import React, { useState, useEffect } from 'react';
import { View, Image, Text,StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'


const CustomSplash = ({ navigation }) => {
  const [directHome, setDirectHome] = useState(false);

  const Navigation = useNavigation();

  const getUserDetailAsync = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userDetails');
      if (userToken !== null) {
        console.log('User Token:', JSON.parse(userToken).DOB);
        Navigation.replace('Home');
      } else {
        console.log('User Token not found');
        Navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {

    getUserDetailAsync();
      
  },[]);

 
  return (
    <View style={styles.SplashContainer}>
      {/* Add your splash screen content here */}
      {/* <Text>Splash Screen</Text> */}
      <Image source={require('./src/data/Logo_login.png')} style={styles.SplashImage}/>
    </View>
  );
};


const styles = StyleSheet.create({
    SplashContainer:{
         flex: 1,
          justifyContent: 'center',
           alignItems: 'center',
           backgroundColor:'#000000'
        },
    SplashImage:{
      width:180,
      height:180,
      resizeMode: "contain",
    }
    
});


export default CustomSplash;


