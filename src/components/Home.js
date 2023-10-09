import React, { cloneElement, useState ,useEffect} from "react";
import { Text, TextInput, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, FlatList } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
import SQLite from 'react-native-sqlite-storage';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieList from "./MovieList";


const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular', // Example endpoint for popular movies
  params: {
    api_key: "69896fca19924108d9c9bb95a3354bcc", // Add your TMDb API key here
    page: 1, // Page number (start with 1)
    page_size: 10, // Number of results per page
  },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTg5NmZjYTE5OTI0MTA4ZDljOWJiOTVhMzM1NGJjYyIsInN1YiI6IjY1MjM4OGJhMGNiMzM1MTZmZDQ2MTJlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5iC1FU0-HoWzR_xolP9WIAZ9OTKyy2GbXOxu-iOvyk`,
  },
};





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

function Home({ navigation }) {

  
const [isLoading, setIsLoading] = useState(true);
  
const [userDetails,setUserDetails]= useState();

const [movieDetails, setMovieDetails] = useState([]);




const getUserDetailAsync = async (userId) => {
 
  try {
    const userToken = await AsyncStorage.getItem('userDetails');
    if (userToken !== null) {
      // console.log('User Token:', JSON.parse(userToken).DOB);
      
      await setUserDetails(JSON.parse(userToken))
     
    } else {
      console.log('User Token not found');
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};




useEffect(() => {
  const fetchData = async () => {
    try {
      await getUserDetailAsync();
     
      setIsLoading(false); // Set isLoading to false when data is available
    } catch (error) {
      console.log("Error fetching user details:", error);
      setIsLoading(false); // Set isLoading to false on error as well
    }
  };fetchData();

  
  axios
  .request(options)
  .then(function (response) {
    // console.log(response.data.results);
    setMovieDetails(response.data.results)
  })
  .catch(function (error) {
    console.error(error);
  });
},[]);

 

  if (isLoading) {
    // Render a loading indicator or message until data is available
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
                  onPress={() => {AsyncStorage.clear();navigation.navigate("Login")}}
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
      <Text style={styles.title2}>Hi,</Text>
      
      <Text style={styles.title1}>{userDetails.name}</Text>

      <Text style={styles.description}>Here are the hot movie suggestions for you</Text>

      <MovieList movieDetails={movieDetails}/>
      

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
    fontSize: 20,
    borderLeftColor: '#00C9C8',
    textAlign: 'left',
    color: "#ffffff",
    paddingLeft: 13,
    marginVertical:10,
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
