import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
import DatePicker from "react-native-date-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'mydb',
  location: 'default'
},
() => {
  console.log("Database connected!")
}, //on success
error => console.log("Database error", error) //on error
)

function Register({ navigation, route }) {
  // Function for form validation
  function validation() {
    if (
      Username === "-" ||
      Password === "-" ||
      Emailid === "-" ||
      selectedDate === "Click here" ||
      isSelected === false
    ) {
      return false;
    }

    if (!checkPassword(tPassword)) {
      return false;
    }

    if (!checkPasswordConfirmation(tPassword, CheckVal)) {
      return false;
    }
    
    return true;
  }

  // State variables
  const [Username, setUsername] = useState("-");
  const [Emailid, setEmailid] = useState("-");
  const [tPassword, settPassword] = useState("-");
  const [Password, setPassword] = useState("-");
  const [Gender, setGender] = useState("Male");
  const [CPasswordWarning, setCPasswordWarning] = useState("");
  const [CheckVal, setCheckVal] = useState("-");
  const [Valid, setValid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Click here");
  const [isSelected, setSelection] = useState(false);
  // const [Userid,setUserid]=useState('-');

  // Function to check if password confirmation matches password
  function checkPasswordConfirmation(tPassword, confirmpassword) {
    if (tPassword === confirmpassword) return true;
    return false;
  }

  // Function to check if password meets requirements
  function checkPassword(password) {
    return /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(
      password
    );
  }

  // const db = route.params;

  const createUser = () => {
    let sql = "INSERT INTO users (email, name, password, DOB, gender) VALUES (?, ?, ?, ?, ?)";
    let params = [Emailid, Username, Password , selectedDate ,Gender]; //storing user data in an array
    // console.log("Added successfully");
    db.executeSql(sql, params, (result) => {
        
        navigation.navigate('Home',{ userId: result.insertId});
    }, (error) => {
        console.log("Create user error", error);
    });
}

  useEffect(() => {
    setValid(validation());
    checkPasswordConfirmation(tPassword, Password);
  });

  return (
    <View style={styles.bg}>
      <Image
        style={styles.logo}
        source={require("../data/Logo_login.png")}
      />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        style={styles.container}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#000000", "#BFFCF900", "#47817F8C"]}
        >
          <BlurView
            style={styles.blurContainer}
            blurType="dark"
            blurAmount={8}
          >
            <View style={styles.input_box}>
              <Text style={styles.Signup}>Sign up</Text>
              <Text style={styles.Welcome_text}>
                Please sign in to continue
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(e) => {
                  setUsername(e);
                }}
              />
              {Username === "" ? (
                <Text style={styles.Warning}>
                  This field needs to be filled
                </Text>
              ) : (
                <View />
              )}
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(e) => setEmailid(e)}
              />
              {Emailid === "" ? (
                <Text style={styles.Warning}>
                  This field needs to be filled
                </Text>
              ) : (
                <View />
              )}
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(e) => settPassword(e)}
              />
              {tPassword === "" ? (
                <Text style={styles.Warning}>
                  This field needs to be filled
                </Text>
              ) : !checkPassword(tPassword) && tPassword !== "-" ? (
                <Text style={styles.Warning}>
                  Password doesn't match the requirement
                </Text>
              ) : (
                <View />
              )}
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={(e) => {
                  setCheckVal(e);
                  if (checkPasswordConfirmation(tPassword, e)) {
                    setPassword(e); // Passwords match, set the email
                    setCPasswordWarning("Password Matched"); // Clear any previous password warning
                  } else {
                    setCPasswordWarning("Password must match");
                  }
                }}
              />
              {CheckVal ? (
                <Text
                  style={
                    CPasswordWarning === "Password Matched"
                      ? styles.NoWarning
                      : styles.Warning
                  }
                >
                  {CPasswordWarning}
                </Text>
              ) : Password === "" ? (
                <Text style={styles.Warning}>
                  This field needs to be filled
                </Text>
              ) : (
                <View />
              )}
              <Text>Gender:</Text>
              <View style={styles.Radiobuttons}>
                <RadioButton
                  value="Binary"
                  status={Gender === "Male" ? "checked" : "unchecked"}
                  style={styles.Radiobuttons}
                  color="#00C9C8"
                  onPress={() => setGender("Male")}
                />
                <Text style={styles.radiotext}>Male</Text>
                <RadioButton
                  value="Male"
                  placeholder="Male"
                  status={Gender === "Female" ? "checked" : "unchecked"}
                  style={styles.Radiobuttons}
                  color="#00C9C8"
                  onPress={() => setGender("Female")}
                />
                <Text style={styles.radiotext}>Female</Text>
                <RadioButton
                  value="Female"
                  status={Gender === "Binary" ? "checked" : "unchecked"}
                  style={styles.Radiobuttons}
                  color="#00C9C8"
                  onPress={() => setGender("Binary")}
                />
                <Text style={styles.radiotext}>Binary</Text>
              </View>
              <View style={styles.Radiobuttons}>
                <Text style={styles.Datelabel}>Set Date of birth:</Text>
                <TouchableOpacity
                  style={styles.DateButton}
                  onPress={() => setOpen(true)}
                >
                  <Text style={styles.DateButtonText}>
                    {selectedDate == "" ? "Click here" : selectedDate}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={open}
                  mode="date"
                  date={date}
                  textColor="#00C9C8"
                  onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                    setSelectedDate(date.toString().slice(4, 15));
                  }}
                  onCancel={() => {
                    setOpen(false);
                    setSelectedDate("Click here");
                  }}
                />
              </View>
              {selectedDate === "" ? (
                <Text style={styles.Warning}>
                  This field needs to be filled
                </Text>
              ) : (
                <View />
              )}
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>Do you like React Native?</Text>
              </View>

              {/* Conditional rendering of the Sign Up button */}
              {Valid ? (
                <TouchableOpacity
                  onPress={() => {createUser() ; }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.loginButton}
                    colors={["#47817FCC", "#25A3A2", "#00C9C8"]}
                  >
                    <Text
                      style={styles.loginButtonText}
                      
                    >
                      Sign up
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) :
              (<TouchableOpacity disabled style={styles.dloginButton} >
                  <Text  style={styles.loginButtonText} >Sign up</Text>
                </TouchableOpacity>) } 
                <Text style={styles.signuptext} >
                    Already have an account? <Text style={styles.signuplink} onPress={() =>
                  navigation.navigate('Login')
                }> Sign in</Text>
              </Text>
            </View>
          </BlurView>
        </LinearGradient>
      
       </KeyboardAwareScrollView>
      </View>
    )
}

const styles = StyleSheet.create({

    bg:{
        backgroundColor:'black'
      },
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
        height:"100%",
        width:"100%",
        zIndex:15,
    },

    Datelabel:{
        marginTop:6,
    },
    blurContainer: {
        borderRadius: 10,
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

      DateButtonText:{
        color: '#00C9C8',
        alignItems: 'center',
        width:'100%',
        fontSize:20,
        fontWeight:"bold",
        paddingLeft:15,
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
      dloginButton:{
        backgroundColor: '#adadad',
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
        marginLeft:110,
        marginTop:-5,
        resizeMode: "cover",
    },
      
    NoWarning:{
        color:"#47817F",
        marginTop:-15,
    },

    Warning:{
        color:"#C80000",
        marginTop:-15,
        marginBottom:5,
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
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: 'center',
      },
      label: {
        margin: 8,
      },
    
    
  });

    
export default Register;