import React from 'react';
import { ImageBackground,StyleSheet,View, Image, Button, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAccountScreen from './CreateAccountScreen';

function WelcomeScreen({navigation}) {
    return (
        <View
        style = {styles.background}>
            <Image style = {styles.logo} source={require("../assets/Bestie_Birthday.png")}/>
            <View style = {styles.loginButton}>
                <Button style = {styles.button} title="Login" color = 'white' onPress={()=>  navigation.navigate('LoginScreen')}/>
            </View>
            <View style = {styles.CreateAccountButton}>
                <Button title='Create Account' color='white'  onPress={()=>  navigation.navigate('CreateAccountScreen')}>
                    <Text style={styles.button}>Create Account</Text>
                </Button>
            </View>
        </View>
    );
}
let styles = StyleSheet.create({
    background:{
        backgroundColor:"black",
        flex: 1,
        justifyContent:"flex-end",
        alignItems: "center",
    },
    logo:{
        alignSelf:"center",
        position: "absolute",
        top: 150,
        width: 400,
        height: 400
    },
    loginButton:{
        width:"100%",
        height:70,
        backgroundColor:"#f0dedc",
    },
    CreateAccountButton:{
        width:"100%",
        height:70,
        backgroundColor:"grey",
    }
})

export default WelcomeScreen;