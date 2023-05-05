import React from 'react'
import { useEffect, useState } from 'react';
import { View, StyleSheet,Text, SafeAreaView, ScrollView, TouchableHighlight, Image} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListCompenents from './customComp/ListComponents';
import Profiles from './customComp/Profiles';
import NewBestieScreen from './NewBestieScreen';
import ProfileScreen from './ProfileScreen';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('MainDB')

function LandingScreen({navigation}) {
    const [names, setNames] = useState([]);
    useEffect(()=>{
        console.log('use effect in landing screen')
        createTable()
        selectFriends()
    },[]);


    const createTable=()=>{
        console.log("landing screen")
        db.transaction((tx)=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Besties"
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Message TEXT,Pic TEXT, Birthday TEXT, giftIdea TEXT, Notes TEXT);"
            )
        })
    }
    const selectFriends=()=>{
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM Besties ', null,
            (txObject, resultSet) => setNames(resultSet.rows._array)
            )
        })
        console.log("select friends")
        console.log(names)
    }

  return (
    <View style = {styles.container}>
        <SafeAreaView style = {styles.top}>
            <View>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style = {styles.title}>Birthday Bestie</Text>
                <TouchableHighlight activeOpacity={0.3} onPress={()=> navigation.navigate('NewBestieScreen',{db})}>
                    <Image style = {{width: 40, height: 100}}source = {require("../assets/add_new_bestie.png")}></Image>
                </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
            <View style = {styles.topBanner}>
                <Text style = {styles.BannerText}>who's up next?</Text>
                <View style = {styles.insideBanner}>
                    <TouchableHighlight activeOpacity={0.3} onPress={()=> navigation.navigate('ProfileScreen')}>
                        <View>
                            <Profiles name="Jonah" bday="April 28"/>
                        </View>
                    </TouchableHighlight>
                    <Profiles name="Jackie" bday="May 11"/>
                    <Profiles name="Mobi" bday="June 6"/>
                </View>
            </View>
            <ScrollView style = {styles.list} contentContainerStyle= {styles.contentContainerStyle}>
                <TouchableHighlight activeOpacity={0.3} onPress={()=> navigation.navigate('ProfileScreen')}>
                    <View>
                        <ListCompenents name = "Jackie" bday = "May 11"></ListCompenents>
                    </View>
                </TouchableHighlight>
                <ListCompenents name = "Mason" bday = "August 4"></ListCompenents>
                <ListCompenents name = "Simon" bday = "september 8"></ListCompenents>
                <ListCompenents name = "Verone" bday = "October 9"></ListCompenents>
                <ListCompenents name = "Jonah" bday = "October 24"></ListCompenents>
                <ListCompenents name = "Sven" bday = "December 20"></ListCompenents>
                <ListCompenents name = "Bam" bday = "December 24"></ListCompenents>
            </ScrollView>
    </View>
  );
}


let styles = StyleSheet.create({
    container:{
        backgroundColor: "black",
        flex: 1,
    },
    topBanner:{
        borderWidth: 5,
        borderColor: "#613665",
        borderLeftWidth: 0,
        borderRightWidth: 0,
        justifyContent: "space-around",
        height:250
    },
    BannerText:{
        color: "white",
        fontSize: 25,
        alignSelf: 'center'

    },
    insideBanner:{
        flexDirection: "row",
        justifyContent: "space-around"

    },
    title:{
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'

    }

})
export default LandingScreen

