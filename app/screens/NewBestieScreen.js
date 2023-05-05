import React,{useState, useEffect} from 'react'
import { ImageBackground,StyleSheet,View, Image, Button, Text, TextInput, ScrollView, TouchableHighlight, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
const db = SQLite.openDatabase('MainDB')



function NewBestieScreen({navigation}) {
    // const route = useRoute();
    // const { db } = route.params;
    var [value, onChangeText] = useState('Useless Multiline Placeholder');
    var [image, setImage] = useState(null);
    var [profilePic, setProfilePic] = useState(false);
    var [Name, setName] = useState('');
    var [names, setNames] = useState([]); //for testing
    var [Message, setMessage] = useState('');
    var [giftIdea, setGift] = useState('');
    var [Notes, setNotes] = useState('');
    var [Birthday, setBirthday] = useState(new Date(1598051730000));
    var [stringBirthday,setString] = useState('');
    var monthTransl = {'1': 'Jan.', '2': 'Feb.', '3': 'March', '4': 'April', '5':'May', '6': 'June', '7': 'July', '8':'Aug.', '9':'Sept.', '10': 'Oct.', '11':'Nov.', '12':'Dec.'}

    useEffect(()=>{
        createTable()
    },[])

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
        console.log(currentDate);
        setBirthday(currentDate);
        setString(stringBirthday);
      };
      
    const createTable=async()=>{
        try{
            await db.transaction(async (tx)=>{
                await tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS "
                    + "Besties "
                    + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Message TEXT,Pic TEXT, Birthday TEXT, giftIdea TEXT, Celebration_Date TEXT, Notes TEXT);",
                    null,
                    console.log('lo pasó')
                )
            })
        }
        catch(error){
            console.log(error)

        }
      }

    const setData = async()=>{
    try{
        console.log(Name)
        console.log(Message)
        console.log(image)
        console.log(stringBirthday)
        console.log(giftIdea)
        console.log(Notes)

        await db.transaction(async (tx)=>{
            await tx.executeSql(
                `INSERT INTO Besties (Name, Message, Pic, Birthday, giftIdea, Notes) VALUES ('${Name}','${Message}','${image}','${stringBirthday}','${giftIdea}','${Notes}')`,
                null,
                () => console.log('Insert successful')
                // [Username, Password, image, stringBirthday]
            )
        })
        console.log("in new bestie screen")
        await selectFriends();
        navigation.navigate('LandingScreen');
    }
    catch(error){
        console.log(error)
    }
    }
    const selectFriends= async()=>{
        await db.transaction(async(tx)=>{
            await tx.executeSql('SELECT * FROM Besties ', null,
            (txObject, resultSet) => {
                setNames(resultSet)
                console.log(names)
            }
            
            )
        })
        console.log("select friends---------")
        console.log(names)
    }

    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        if (result.assets[0].uri != null) {
          setImage(result.assets[0].uri);
          setProfilePic(true)
        }
      };
    

  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.container2}>
        <TouchableHighlight onPress={pickImage}>
          <View style = {styles.imageContainer}>
            {profilePic ? <Image source={{ uri: image }} style={styles.button}/> : <Image style = {{alignSelf: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: 'contain',}} source = {require('../assets/addPicture.png')}/>}
            {/* <Image style = {styles.button} source = {require('../assets/addPicture.png')}/> */} 
          </View>
        </TouchableHighlight>
            <ScrollView style = {styles.TextBox} contentContainerStyle= {styles.contentContainerStyle}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{fontWeight: "bold"}}>Name: </Text>
                        <TextInput placeholder = "enter name" onChangeText={text=> setName(text)}/>
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{fontWeight: "bold"}}>Birthday: </Text>
                        <DateTimePicker themeVariant="light" onChange={setBirthdayFunc} value={Birthday} mode ="date" display = "default"></DateTimePicker>
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{fontWeight: "bold"}}>Message: </Text>
                        <TextInput placeholder = "write messsage" onChangeText={text=> setMessage(text)}/>
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{fontWeight: "bold"}}>Gift Ideas: </Text>
                        <TextInput placeholder = "what would they like?" onChangeText={text=> setGift(text)}/>
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{fontWeight: "bold"}}>Notes: </Text>
                        <TextInput placeholder = "anything else?" onChangeText={text=> setNotes(text)}/>
                    </View>
            </ScrollView>
        </View>
        <View style = {styles.SaveButton}>
            <Button title='Save' color='white'  onPress={()=>  setData()}>
                      <Text> Save</Text>
            </Button>
        </View>

    </SafeAreaView>
  );
}
let styles = StyleSheet.create({
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
    contentContainerStyle:{
        backgroundColor:"white",
        width:375,
        height: 500,
        justifyContent:'space-around'
    },
    button: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: 'contain',
      },
      SaveButton:{
        width:"50%",
        height:50,
        backgroundColor:"#613665",
    }
    

})

export default NewBestieScreen;