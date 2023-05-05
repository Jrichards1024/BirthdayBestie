import React from 'react'
import { ImageBackground,StyleSheet,View, Image, Button, Text } from 'react-native';

function ProfileScreen() {
  return (
    <View style = {styles.container}>
        <View style = {styles.container2}>
            <Text style = {{color: "white", fontSize: 20}}>John</Text>
            <Image style = {styles.image} source = {require('../assets/randonman.png')}></Image>
            <View style = {styles.TextBox}>
                <Text style = {{fontWeight: "bold"}}>Birthday: </Text>
                <Text style = {{fontWeight: "bold"}}>Message: </Text>
                <Text style = {{fontWeight: "bold"}}>Gift Ideas:</Text>
                <Text style = {{fontWeight: "bold"}}>Celebration Date: </Text>
                <Text style = {{fontWeight: "bold"}}>Notes:</Text>
            </View>
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
    }

})

export default ProfileScreen;