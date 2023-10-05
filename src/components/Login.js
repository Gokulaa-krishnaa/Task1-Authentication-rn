import React, { cloneElement, useState,useEffect } from "react";
import { Text, TextInput, SafeAreaView, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";


const db = SQLite.openDatabase({
    name: 'mydb',
    location: 'default'
    },
    () => {
    console.log("Database connected!")
    }, //on success
    error => console.log("Database error ", error) //on error
)


  

function Login({ navigation }) {
  
  const [emailId,setEmailId]=useState();
  const [password,setPassword]=useState();

  const [userNameWarning,setUserNameWarning]=useState('-');
  const [passwordWarning,setPasswordWarning]=useState('-');

  const checkUser = (emailId) =>{
    // e.preventDefault();
    const sql = "SELECT * FROM users WHERE email = (?)";
    let params=[emailId]
    db.transaction((tx) => {
        tx.executeSql(sql,params,(_, result) =>{ 
            if (result.rows.length > 0) {
                console.log(result.rows.item(0).id);
                setUserNameWarning('-');
                checkPassword(emailId,password)
                
            } else {
                console.log('User not found');
                setUserNameWarning('User not found');
            }
        },(error)=>{
            console.log(error);
        });
    })
  }

  
  
  const checkPassword = (emailId,password) =>{
    // e.preventDefault();
    const sql = "SELECT * FROM users WHERE email = (?) AND password = (?)";
    let params=[emailId,password]
    db.transaction((tx) => {
        tx.executeSql(sql,params,(_, result) =>{ 
            if (result.rows.length > 0) {
                console.log(result.rows.item(0));
                setPasswordWarning('-');
                try {
                  AsyncStorage.setItem('userDetails', JSON.stringify(result.rows.item(0)));
                  console.log('Data stored successfully');
                } catch (error) {
                  console.error('Error storing data:', error);
                }
                navigation.navigate('Home');
            } else {
                console.log('Passsword is incorrect');
                setPasswordWarning('Password is incorrect');
            }
        },(error)=>{
            console.log(error);
            setPasswordWarning('Password is incorrect');
        });
    })
  }
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={['#000000', '#BFFCF900', '#47817F8C']}>
        {/* Blur Background */}
        <BlurView style={styles.blurContainer} blurType="dark" blurAmount={5}>
          <View style={styles.input_box}>
            <Text style={styles.Signin}>Login</Text>
            <Text style={styles.Welcome_text}>Please sign in to continue</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e)=>{setEmailId(e)}}
              placeholder="Username"
            />
            {userNameWarning == '-' ? (<View/ > ):(<Text style={styles.Warning}> {userNameWarning}</Text>)}
            <TextInput
              style={styles.input}
              onChangeText={(e)=>{setPassword(e)}}
              placeholder="Password"
            />
            {passwordWarning == '-' ? (<View/ > ):(<Text  style={styles.Warning}> {passwordWarning}</Text>)}
            {/* Login Button */}
            <TouchableOpacity  onPress={()=>checkUser(emailId,password)}>
            <LinearGradient start={{ x: 0, y: 1}} end={{ x: 0, y: 0}} style={styles.loginButton} colors={['#47817FCC', '#25A3A2' ,'#00C9C8']}>
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
            </TouchableOpacity>
            {/* Sign Up Text */}
            <Text style={styles.signuptext}>
              Don't have an account?<Text style={styles.signuplink} onPress={() => navigation.navigate('Register')}> Join us</Text>
            </Text>
          </View>
        </BlurView>
      </LinearGradient>

      {/* Other Content */}
      <View>
        <View style={styles.textContainer}>
          <View style={styles.flexContainer}>
            {/* Description */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.title2}>This izz..</Text>
            </View>

            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                style={styles.logo}
                source={require('../data/Logo_login.png')}
              />
            </View>
          </View>
        </View>
        <Text style={styles.title1}>SPOOFY!</Text>
        <Text style={styles.description}>
          Check out our dazzling, out-of-this-world creative mock-ups for the most electrifying and favorite scenes ever!
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Signin: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00C9C8"
  },
  Welcome_text: {
    fontSize: 15,
    color: '#ffffff',
  },
  title1: {
    fontSize: 60,
    color: '#00C9C8',
    marginTop: -25,
  },
  signuptext: {
    color: '#ffffff',
    fontWeight: 'thin',
    paddingVertical: 15,
  },
  signuplink: {
    color: '#00C9C8',
    fontWeight: 'bold',
  },
  
  title2: {
    fontSize: 45,
    color: '#ffffff',
    marginTop: 20,
  },
  container: {
    padding: 30,
    backgroundColor: "#000000",
    height: "100%",
  },
  textContainer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  flexContainer: {
    flexDirection: "row",
    width: "100%",
  },
  descriptionContainer: {
    flex: 4,
  },
  description: {
    fontSize: 18,
    borderRightColor: '#00C9C8',
    textAlign: 'right',
    color: "#ffffff",
    paddingRight: 15,
    borderWidth: 5,
  },
  imageContainer: {
    flex: 6,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 180,
    height: 160,
    resizeMode: "contain",
  },
  input_box: {
    justifyContent: "center",
    backgroundColor: "#ffffff32",
    color:"#ffffff",
    padding: 30,
    paddingVertical: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#00C9C8',
    padding: 5,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#00C9C8',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  Warning:{
    color:"#C80000",
    marginTop:-15,
    marginBottom:5,
},
});

export default Login;
