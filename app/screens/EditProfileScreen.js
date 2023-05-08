import React,{useState, useEffect}from 'react'
import {useRoute} from "@react-navigation/native";
import { ImageBackground,StyleSheet,View, Image, Button, Text,TextInput, KeyboardAvoidingView } from 'react-native';
import {NavigationContainer, useFocusEffect, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('MainDB')

function EditProfileScreen({navigation}) {
    const route = useRoute();
    var [Name, setName] = useState(``);
    var [Message, setMessage] = useState(``);
    var [giftIdea, setGift] = useState(``);
    var [Notes, setNotes] = useState(``);

    let update =async()=>{
        await db.transaction(async(tx)=>{
             tx.executeSql(
                `UPDATE Besties1 SET Name = ?, Message = ?, giftIdea = ?, Notes = ? WHERE ID = ?`,[Name, Message, giftIdea, Notes, route.params.id],
                (txObj, resultSet) => console.log("successful update"),
                (txObj, error) => console.log(`Failed to update: ${error}`)
            )
        })
        navigation.navigate('LandingScreen')

    }
  return (
    <View style = {styles.container}>
        <View style = {styles.container2}>
            <Text style = {{color: "white", fontSize: 20}}>{route.params.name}</Text>
            <Image style = {styles.image} source = {{uri:route.params.image}}></Image>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style = {styles.TextBox}>
                    <View style = {{flexDirection: 'row'}}>
                            <Text style = {{fontWeight: "bold"}}>Name: </Text>
                            <TextInput defaultValue = {route.params.name} onChangeText={text=> setName(text)}/>
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                            <Text style = {{fontWeight: "bold"}}>Message: </Text>
                            <TextInput defaultValue = {route.params.Message}  onChangeText={text=> setMessage(text)}/>
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                            <Text style = {{fontWeight: "bold"}}>Gift Ideas: </Text>
                            <TextInput defaultValue = {route.params.giftIdea} onChangeText={text=> setGift(text)}/>
                        </View>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{fontWeight: "bold"}}>Notes: </Text>
                        <TextInput defaultValue = {route.params.notes} onChangeText={text=> setNotes(text)}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
        <View style = {styles.SaveButton}>
            <Button title='Save' color='white' onPress={()=>update()}>
                      <Text> Save </Text>
            </Button>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    container2:{
        alignItems: 'center',
        // justifyContent: 'space-around'

    },
    image:{
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: "#613665",
        borderWidth: 3
    },
    TextBox:{
        backgroundColor:"white",
        width:375,
        height: 500,
        justifyContent:'space-around'
    },
    SaveButton:{
        width:"50%",
        height:50,
        backgroundColor:"#613665",
    }
    

})

export default EditProfileScreen