import React, { cloneElement, useState } from "react";
import { Button, Text, TextInput,SafeAreaView,StyleSheet,View,TouchableOpacity, Image } from "react-native";
// import LinearGradient from 'react-native-linear-gradient';


function Login(){
    const [text, onChangeText]=useState();
    const [number,onChangeNumber]=useState();

    return(
    
        <SafeAreaView style={styles.container}>
            {/* <LinearGradient > */}
            <View style={styles.input_box}>
                <Text style={styles.Signin}>Login</Text>
                <Text style={styles.Welcome_text}>Please sign in to continue</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder="Username"
                    value={text}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={text}
                    placeholder="Password"
                />

        <TouchableOpacity style={styles.loginButton} >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signuptext} >
            Don't have an account?<Text style={styles.signuplink}> Join us</Text>
        </Text>
            </View>
            {/* </LinearGradient> */}

        <View >
            
            
            
            <View style={styles.textContainer}>
            <View style={styles.flexContainer}>
                
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title2}>
                        This izz..
                    </Text>
                    
                </View>

               
                <View style={styles.imageContainer}>
                <Image
                    style={styles.logo}
                    source={require('../data/Logo_login.png')}
                />
                </View>

            </View>
            </View>
            <Text style={styles.title1}>
                        SPOOFY!
                    </Text>
            <Text style={styles.description}>
                Check out our dazzling, out-of-this-world creative mock-ups for the most electrifying and favorite scenes ever!
            </Text>
            

        </View>
              
        </SafeAreaView>
            
        
    )
}

const styles = StyleSheet.create({
    Signin:{
        fontSize:30,
        fontWeight:"bold",
        color:"#00C9C8"
    },
    Welcome_text:{
        fontSize:15,
        color:'#ffffff',
    },
    title1:{
        fontSize:60,
        color:'#00C9C8',
        marginTop:-25,
        // fontFamily:'Krona One', 'sans-serif',
    },
    signuptext:{
        color:'#ffffff',
        fontWeight:'thin',
        paddingVertical:15,
    },
    signuplink:{
        color:'#00C9C8',
        fontWeight:'bold',
    },
    title2:{
        fontSize:45,
        color:'#ffffff',
        marginTop:20,
    },
    container:{
        padding:30,
        backgroundColor:"#000000",
        height:"100%",
    },
    textContainer: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        // marginTop:-15,
      },
    flexContainer: {
        flexDirection: "row", 
        width: "100%", 
    },
    descriptionContainer: {
        flex: 4, 
        
    },
    description: {
        fontSize:18,
        borderRightColor:'#00C9C8',
        textAlign:'right',
        color:"#ffffff",
        paddingRight:15,
        borderWidth: 5, 
    },
    imageContainer: {
        flex: 6, // 3/4 of the width
        alignItems: "center", 
        paddingHorizontal:30,
    },
    logo: {
        width: 180, 
        height: 160, 
        
        resizeMode: "contain",
    },
    input_box: {
        justifyContent: "center",
        backgroundColor: "#ffffff32", 
        padding: 30,
        paddingVertical:40,
        borderRadius: 10,
        borderWidth: 1, 
        borderColor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)", 
      },
      
    input: {
      height: 40,
      width: '100%' ,
      marginVertical: 20,
      borderBottomWidth:1,
      borderBottomColor:'#00C9C8',
      padding: 5,
    //   justifyContent:"center",
    //   alignContent:"center",
      fontSize:14,
    
    },
    
    loginButton: {
        backgroundColor: '#00C9C8',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        width:'100%',
        marginTop:20,
      },
    
      loginButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:15,
      },
  });

export default Login;