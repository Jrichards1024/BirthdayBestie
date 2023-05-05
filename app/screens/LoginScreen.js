import { useEffect, useState } from 'react';
import React from 'react'
import { SafeAreaView, StyleSheet,View, Text, TextInput, Button } from 'react-native'
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('MainDB')
function LoginScreen({navigation}) {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('*');
    const [Pic, setPic] = useState('');
    const [Birthday, setBirthday] = useState('');
    useEffect(()=>{
        createTable()
    },[]);
    const createTable=()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Message TEXT,Pic TEXT, Birthday TEXT, Gift_Idea TEXT, Celebration_Date TEXT, Notes TEXT);"
            )
        })
    }


    const setData = async()=>{
        console.log("print")
        try{
            console.log("hey")
            console.log(Username)
            await db.transaction(async (tx)=>{
                await tx.executeSql(
                    "INSERT INTO Users (Username, Password, Pic, Birthday) VALUES (?,?,?,?)"
                    [Username, Password, Pic, Birthday]
                )
            })
        }
        catch(error){
            console.log(error)
        }
    }
    const [value, onChangeText] = useState('Useless Multiline Placeholder');
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container1}>
            <View style = {styles.field}>
                <Text style = {styles.text}>Username: </Text>
                <TextInput placeholder = "Username" style = {{color:'white'}} onChangeText={text=> setUsername(text)}/>
            </View>
            <View  style = {styles.field}>
            <Text style = {styles.text}>Password: </Text>
            <TextInput placeholder = "Password" style = {{color:'white'}} onChangeText={text=> setPassword('*')}/>
            </View>
        </View>
        <View style = {styles.CreateAccountButton}>
            <Button title='Next' color='white'  onPress={()=> navigation.navigate('LandingScreen')}>
                      <Text> Next</Text>
            </Button>
        </View>
    </SafeAreaView>
  )
}
let styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        flex: 1,
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth: 10,
        // borderColor: 'white'
    },
    container1:{
        borderWidth: 10,
        borderColor: "#613665",
        justifyContent:'space-around'

    },
    text:{
        color: 'white',
        fontSize: 20
    },
    field:{
        flexDirection:'row'
    },
    CreateAccountButton:{
        width:"50%",
        height:50,
        backgroundColor:"#613665",
    }


})

export default LoginScreen