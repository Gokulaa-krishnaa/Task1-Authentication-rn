import React, { cloneElement, useState,useEffect } from "react";
import { Text, TextInput, SafeAreaView, StyleSheet, View, TouchableOpacity, Image,FlatList } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const db = SQLite.openDatabase({
    name: 'mydb',
    location: 'default'
    },
    () => {
    console.log("Database connected!")
    }, //on success
    error => console.log("Database error ", error) //on error
)


  

function MovieList({ navigation,movieDetails }) {
  
  
  
  return (
    <SafeAreaView style={styles.container}>
        <FlatList
      data={movieDetails}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.flexContainer}>
            <View style={styles.imageContainer}>
                <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.image}
            />
            </View>
            <View style={styles.descriptionContainer}>
            <Text style={styles.title1}>{item.title}</Text>
            <Text style={styles.title2}> {item.release_date}</Text>
            <Text style={styles.description}>{item.overview}</Text>
            

            </View>
        </View>
      )}
    />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    title1: {
        fontSize: 30,
        color: '#00C9C8',
        marginHorizontal:15,
      },

    title2: {
        fontSize: 15,
        color: '#ffffff',
        marginHorizontal:15,
    },

   description: {
    fontSize: 15,
    borderLeftColor: '#00C9C8',
    textAlign: 'left',
    color: "#ffffff",
    paddingLeft: 13,
    margin:10,
    borderWidth: 5,
  },
  image:{
    width: "100%", 
    height: 130 
  },

  flexContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical:15,
  },
  descriptionContainer: {
    flex: 6,
    paddingVertical:5,
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent:"center",
    paddingHorizontal: 10,
  },
  
});

export default MovieList;
