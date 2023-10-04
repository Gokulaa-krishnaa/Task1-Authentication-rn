import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSplash = ({ navigation }) => {
  const [directHome, setDirectHome] = useState(false);

  const getUserDetailAsync = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userDetails');
      if (userToken !== null) {
        console.log('User Token:', JSON.parse(userToken).DOB);
        setDirectHome(true);
      } else {
        console.log('User Token not found');
        setDirectHome(false);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {

    getUserDetailAsync();
      
  });

  useEffect(() => {
    if (directHome) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  }, [directHome, navigation]);

  return (
    <View style={styles.SplashContainer}>
      {/* Add your splash screen content here */}
      <Text>Splash Screen</Text>
      <Image source={require('./src/data/Logo_login.png')} />
    </View>
  );
};


const styles = StyleSheet.create({
    SplashContainer:{
         flex: 1,
          justifyContent: 'center',
           alignItems: 'center'
        }
    
});


export default CustomSplash;


