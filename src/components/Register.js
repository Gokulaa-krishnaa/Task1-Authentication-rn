import React from "react";
import { Button, Text, TextInput, StyleSheet,SafeAreaView,View,TouchableOpacity,Image } from "react-native";
import { RadioButton } from 'react-native-paper';
import { useState } from "react";


function Register(){

    const [checked, setChecked] = useState('first');
    return(

        <SafeAreaView style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../data/Logo_login.png')}
            />
            <View style={styles.input_box}>
                <Text style={styles.Signup}>Sign up</Text>
                <Text style={styles.Welcome_text}>Please sign in to continue</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                />
                <Text>Gender:</Text>
                <View style={styles.Radiobuttons}>
                    
                    <RadioButton
                        value="Binary"
                        // status={ checked === 'second' ? 'checked' : 'unchecked' }
                        style={styles.Radiobuttons}
                        onPress={() => setChecked('Binary')}

                    /><Text style={styles.radiotext}>Male</Text>
                    <RadioButton
                        value="Male"
                        placeholder="Male"
                        // status={ checked === 'first' ? 'checked' : 'unchecked' }
                        style={styles.Radiobuttons}
                        onPress={() => setChecked('Male')
                    }
                    /><Text style={styles.radiotext}>Female</Text>
                    <RadioButton
                        value="Female"
                        // status={ checked === 'second' ? 'checked' : 'unchecked' }
                        style={styles.Radiobuttons}
                        onPress={() => setChecked('Female')}
                    /><Text style={styles.radiotext}>Binary</Text>
                    
                    <RadioButton
                        value="Others"
                        // status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Other')}
                        style={styles.Radiobuttons}
                    ></RadioButton>
                    <Text style={styles.radiotext}>Others</Text>

                </View>
                <Text>Date Of Birth:</Text>
                

        <TouchableOpacity style={styles.loginButton} >
          <Text style={styles.loginButtonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.signuptext} >
            Already have an account? <Text style={styles.signuplink}> Sign in</Text>
        </Text>
            </View>
            

       
        </SafeAreaView>
        
        
    )
}

const styles = StyleSheet.create({

    Signup:{
        fontSize:30,
        fontWeight:"bold",
        color:"#00C9C8"
    },

    Welcome_text:{
        fontSize:15,
        color:'#ffffff',
    },

    container:{
        padding:30,
        backgroundColor:"#000000",
        height:"100%",
       
    },

    input_box: {
        zIndex:5,
        flex:0,
        justifyContent:"center",
        alignContent:"center",
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
      Radiobuttons:{
            flex:0,
            flexDirection:"row",
            marginVertical:13,
      },
      RadioButton:{
            flex:1,
            
      },
      radiotext:{
            paddingTop:7,
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
      logo: {
        zIndex:1,
        position:"absolute",
        width: 300, 
        height: 200, 
        marginLeft:100,
        resizeMode: "contain",
    },
      
      
    input: {
      height: 40,
      width: '100%' ,
      marginVertical: 20,
      borderBottomWidth:1,
      borderBottomColor:'#00C9C8',
      padding: 5,
      justifyContent:"center",
      alignContent:"center",
      fontSize:14,
    
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
    
    
  });

    
export default Register;