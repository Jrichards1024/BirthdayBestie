import React, {useState, useEffect} from 'react'
import { Text, View, SafeAreaView, Image, TextInput, StyleSheet, Button, TouchableHighlight } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import LandingScreen from './LandingScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('MainDB')

function CreateAccountScreen({navigation}) {
  function test(){
    console.log('hi')};
  const [value, onChangeText] = useState('Useless Multiline Placeholder');
  // const [date, setDate] = useState ('');
  const [Username, setUsername] = useState('Username');
  const [Password, setPassword] = useState('');
  // const [Pic, setPic] = useState('');
  const [profilePic, setProfilePic] = useState(false);
  const [Birthday, setBirthday] = useState(new Date(1598051730000));
  const [stringBirthday,setString] = useState('');
  var monthTransl = {'1': 'Jan.', '2': 'Feb.', '3': 'March', '4': 'April', '5':'May', '6': 'June', '7': 'July', '8':'Aug.', '9':'Sept.', '10': 'Oct.', '11':'Nov.', '12':'Dec.'}
  //   const onChange = (event, selectedDate) =>{
  //   const currentDate = selectedDate || Date;
  // }
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setProfilePic(true)
    }
  };


  useEffect(()=>{
    createTable()
  },[]);

  const createTable=()=>{
    db.transaction((tx)=>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Users "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Password TEXT,Pic TEXT, Birthday TEXT);"
        )
    })
  }
  const setBirthdayFunc = (DateTimePickerEvent, Date ) => {
    const currentDate = Date;
    var year = currentDate.getYear();
    if (year>100){
      year = 2000 + year%100
    }
    else{
      year = 1900 + year
    }
    var stringBirthday = monthTransl[(currentDate.getMonth()+1).toString()] + ' ' + currentDate.getDate().toString() + ' '+ year.toString();
    setBirthday(currentDate);
    setString(stringBirthday);
  };
  

  const setData = async()=>{
    try{
      console.log(typeof stringBirthday)

        await db.transaction(async (tx)=>{
            await tx.executeSql(
                `INSERT INTO Users (Username, Password, Pic, Birthday) VALUES ('${Username}','${Password}','${image}','${stringBirthday}')`
                // [Username, Password, image, stringBirthday]
            )
        })
      navigation.navigate('LandingScreen');
    }
    catch(error){
        console.log(error)
    }
  }


  return (
    <SafeAreaView style={styles.overall}>
          <TouchableHighlight onPress={pickImage}>
            <View style={styles.imageContainer}>
            {profilePic ? <Image source={{ uri: image}} style={styles.button}/> : <Image style = {{alignSelf: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: 'contain',}} source = {require('../assets/addPicture.png')}/>}
            </View>
          </TouchableHighlight>
        {/* <Image source = {require('../assets/addPicture.png')}/> */}
        <View style = {{gap: 40}}>
          <View style = {styles.username}>
            <Text style = {styles.text}>Username: </Text>
            <TextInput placeholder = "Username" style = {{color:'white'}}onChangeText={text=> setUsername(text)}/>
          </View>
          <View  style = {styles.password}>
          <Text style = {styles.text}>Password: </Text>
          <TextInput placeholder = "Password" style = {{color:'white'}} onChangeText={text=> setPassword(text)}/>
          </View>
          <View  style = {styles.birthdate}>
          <Text style = {styles.text}>Birthday: </Text>
          <DateTimePicker themeVariant="dark" onChange={setBirthdayFunc} value={Birthday} mode ="date" display = "default"></DateTimePicker>
          </View>
        </View>
        <View style = {styles.CreateAccountButton}>
            <Button title='Next' color='white'  onPress={()=>  setData()}>
                      <Text> Next</Text>
            </Button>
        </View>
        {/* <View style = {styles.CreateAccountButton}>
            <Button title='other' color='white'  onPress={()=>  letsSee()}>
                      <Text> other</Text>
            </Button>
        </View> */}
        {/* navigation.navigate('LandingScreen') */}
    </SafeAreaView>
  )
}
let styles = StyleSheet.create({
  overall:{
    backgroundColor: 'black',
    flex: 1,
    alignItems: "center",
    justifyContent: 'space-around'
  },
  username:{
    flexDirection: 'row'
  },
  text:{
    fontSize: 20,
    color: 'white'

  },
  password:{
    flexDirection: 'row'
  },
  birthdate:{
    flexDirection: 'row'
  },
  imageContainer:{
    backgroundColor: 'black',
    width: 100,
    height: 100

  },
  button: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'contain',
  }, 
  CreateAccountButton:{
    width:"50%",
    height:50,
    backgroundColor:"#613665",
}


})

export default CreateAccountScreen