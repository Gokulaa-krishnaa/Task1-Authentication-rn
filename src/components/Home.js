import React, { cloneElement, useState ,useEffect} from "react";
import { Text, TextInput, SafeAreaView, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
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
  


const deleteUser = (id) => {
    // let sql = "SELECT * FROM users";
    let sql = "DELETE FROM users WHERE id = ?";
    let params = [id];
    db.executeSql(sql, params, (resultSet) => {
        Alert.alert("Success", "User deleted successfully");
    }, (error) => {
        console.log("Delete user error", error);
    })
}
const deletetable = () => {
    let sql = "DROP TABLE users";
    db.executeSql(sql, [], (resultSet) => {
        Alert.alert("Success", "Table 'users' deleted successfully");
    }, (error) => {
        console.log("Delete table error", error);
    });
}

function Home({ navigation ,route }) {
  const [text, onChangeText] = useState();
  const [number, onChangeNumber] = useState();

  const { userId, userName } = route.params;
  
  const [setUserDetails,userDetails]= useState({});
  let userdetails;

  const listUsers = (userId) => {
    let userdetails;
    const sql = "SELECT * FROM users WHERE id=?";
    let params=[userId];
    console.log(userId)
    db.transaction(
      (tx) => {
        tx.executeSql(
          sql,
          params,
          (_, resultSet) => {
            if (resultSet.rows.length > 0) {
              userdetails = resultSet.rows.item(0);
              console.log(userdetails);
              setUserDetails({userdetails});
            } else {
              console.log('User not found');
            }
          },
          (error) => {
            console.log('List user error', error);
            userdetails={"error":"error"}
          }
        );
      },
      
    );}

    const listAllUsers = () => {
        const sql = "SELECT * FROM users";
        db.transaction(
          (tx) => {
            tx.executeSql(
              sql,
              [],
              (_, resultSet) => {
                const users = [];
                for (let i = 5; i < resultSet.rows.length; i++) {
                  console.log(resultSet.rows.item(i));
                }
              },
              (error) => {
                console.log('List user error', error);
              }
            );
          }
        );
      };

      useEffect(() => {
        listUsers(userId);
      });
    


  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
                  onPress={() => {navigation.navigate("Login")}}
                >
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.loginButton}
                    colors={["#47817FCC", "#25A3A2", "#00C9C8"]}
                  >
                    <Text style={styles.loginButtonText}>
                      Log out
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
      <Text style={styles.title2}>Welcome,</Text>
      <Text style={styles.title1}>{userName} </Text>
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
    fontSize: 40,
    color: '#00C9C8',
    marginTop: -15,
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
    fontSize: 35,
    color: '#ffffff',
    marginTop: 50,
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
    width: '30%',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Home;
