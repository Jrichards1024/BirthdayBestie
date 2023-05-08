import React from 'react'
import { useEffect, useState} from 'react';
import {useRoute} from "@react-navigation/native";
import { ImageBackground,StyleSheet,View, Image, Button, Text } from 'react-native';
import {NavigationContainer, useFocusEffect, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfileScreen from './EditProfileScreen';

function ProfileScreen({navigation}) {
    var [image, setImage] = useState(null);
    var [Name, setName] = useState('');
    var [Message, setMessage] = useState('');
    var [giftIdea, setGift] = useState('');
    var [Notes, setNotes] = useState('');
    const route = useRoute();

  return (
    <View style = {styles.container}>
        <View style = {styles.container2}>
            <Text style = {{color: "white", fontSize: 20}}>{route.params.name}</Text>
            <Image style = {styles.image} source = {{uri:route.params.image}}></Image>
            <View style = {styles.TextBox}>
                <Text style = {{fontWeight: "bold"}}>Birthday: {route.params.bday} </Text>
                <Text style = {{fontWeight: "bold"}}>Message: {route.params.message} </Text>
                <Text style = {{fontWeight: "bold"}}>Gift Ideas: {route.params.giftIdeas}</Text>
                <Text style = {{fontWeight: "bold"}}>Notes: {route.params.notes}</Text>
            </View>
        </View>
        <View style = {styles.SaveButton}>
            <Button title='Edit' color='white'  onPress={()=>navigation.navigate('EditProfileScreen',{
                id: route.params.id,
                name:route.params.name,
                bday:route.params.bday,
                Message:route.params.message,
                image: route.params.image,
                giftIdea: route.params.giftIdeas,
                notes: route.params.notes
            })}>
                      <Text> Edit </Text>
            </Button>
        </View>

    </View>
  );
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

export default ProfileScreen;