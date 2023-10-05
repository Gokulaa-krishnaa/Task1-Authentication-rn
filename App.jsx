import React ,{ useState, useEffect }from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {Navigation} from 'react-native-navigation'y
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen';



import Login from './src/components/Login';
import Register from './src/components/Register';
import Home from './src/components/Home';

import SQLite from 'react-native-sqlite-storage';
import CustomSplash from './CustomSplash';


const Stack = createNativeStackNavigator();

function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [directHome,setDirectHome]=useState(false)

  const db = SQLite.openDatabase({
    name: 'mydb',
    location: 'default'
  },
  () => {
      console.log("Database connected!")
  }, //on success
  error => console.log("Database error", error) //on error
  )
  const deleteTable = () => {
    let sql = "DROP TABLE users";
    db.executeSql(sql, [], (resultSet) => {
        Alert.alert("Success", "Table 'users' deleted successfully");
    }, (error) => {
        console.log("Delete table error", error);
    });
}
 
  useEffect(() => {
      createUserTable(); //call create table function here
      getUserDetailAsync(1)
  },[])
  //create table function
  const createUserTable = () => {
      db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR,password VARCHAR,DOB VARCHAR,gender VARCHAR)", [], (result) => {
        // db.executeSql("DROP TABLE users;", [], (result) => {
          console.log("Table created successfully");
        }, (error) => {
          console.log("Create table error", error)
        })
  }

  const resetUserTable = () => {
    // Drop the existing table
    db.executeSql("DROP TABLE IF EXISTS users", [], (result) => {
      console.log("Table dropped successfully");
      
      // Recreate the table with AUTOINCREMENT primary key starting from 0
      db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR, password VARCHAR, DOB VARCHAR, gender VARCHAR)", [], (result) => {
        console.log("Table created successfully");
      }, (error) => {
        console.log("Create table error", error)
      });
    }, (error) => {
      console.log("Drop table error", error);
    });
  };
  
  // Call the function to reset the table
  const getUserDetailAsync = async (userId) => {
 
    try {
      const userToken = await AsyncStorage.getItem('userDetails');
      if (userToken !== null) {
        console.log('User Token:', JSON.parse(userToken).DOB)
        setDirectHome(true)
      } else {
        console.log('User Token not found');
        setDirectHome(false)
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  

  return (
    
    <NavigationContainer > 
    <View style={styles.appContainer}>
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Splash"
          component={CustomSplash}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />  
        <Stack.Screen 
        name="Register"
        component={Register}
        options={{  headerShown: false  }}/>

      
      </Stack.Navigator>    
    </View>

    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  appContainer:{
    flex: 1,
    backgroundColor:'black'
  }
});

export default App;
