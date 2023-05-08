import React from 'react'
import { useEffect, useState} from 'react';
import { View, StyleSheet,Text, SafeAreaView, ScrollView, TouchableHighlight, Image, Alert} from 'react-native'
import {NavigationContainer, useFocusEffect, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListCompenents from './customComp/ListComponents';
import Profiles from './customComp/Profiles';
import MotivationScreen from './MotivationScreen';
import NewBestieScreen from './NewBestieScreen';
import ProfileScreen from './ProfileScreen';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('MainDB')

function LandingScreen({navigation}) {


    let [besties, setBesties] = useState([]);
    let fun = [1,2,3]
    let [isFilled, setFilled] = useState(false);
    let [topBesties, setTopBesties] = useState([]);
    var monthTransl = {'Jan.': 1,'Feb.':2,'March':3,'April': 4, 'May':5,'June':6,'July':7,'Aug.': 8, 'Sept.': 9, 'Oct.': 10,'Nov.': 11,'Dec.':12}
    useEffect(()=>{
        console.log('use effect in landing screen')
        createTable()
        selectFriends()
    },[]);
    useFocusEffect(
        React.useCallback(()=>{
            selectFriends();
        },[besties])
    )


    const createTable=()=>{
        console.log("landing screen")
        db.transaction((tx)=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Besties1 "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Message TEXT,Pic TEXT, Birthday TEXT, giftIdea TEXT, Notes TEXT);"
            )
        })
        // db.transaction(async (tx)=>{
        //             await tx.executeSql("DELETE FROM Besties1", null,
        //             (txObject, resultSet) => console.log(resultSet)
        //             )
        // })
    }
    const selectFriends=async ()=>{
        await db.transaction(async (tx)=>{
            await tx.executeSql("SELECT * FROM Besties1 ", null,
            (txObject, resultSet) => {
                // console.log("look down")
                // console.log(resultSet.rows)
                let array = []
                for (let i = 0; i < resultSet.rows.length; i++){
                    array.push(resultSet.rows.item(i))
                }
                if (array.length> 0){
                    setFilled(true)
                    // console.log("______________________")
                    // console.log(array[0].Birthday.split(" "))
                    array.sort(comparefn)
                    if (array.length > 3){
                        setTopBesties(array.slice(0,3))
                        setBesties(array.slice(3,array.length))
                    }
                    else {
                        newArray = array
                        setTopBesties(newArray)
                        if (array.length != 1){
                            setBesties(array.slice(1,array.length))
                        }

                    }
                }
                
            }

            )
        })
    }
    function comparefn(a,b){ //order birthdays by which are closest to today
        const currentDate = new Date()
        let currentMonth = currentDate.getMonth() + 1
        let currentDay = currentDate.getDate()
        newArraya = a.Birthday.split(" ")
        newArrayb = b.Birthday.split(" ")
        montha = newArraya[0]
        monthb = newArrayb[0]
        daya = parseInt(newArraya[1])
        dayb = parseInt(newArraya[1])
        let monthvala = monthTransl[montha]
        let monthvalb = monthTransl[monthb]
        let arep = parseInt(`${monthvala}.${daya}`)
        let brep = parseInt(`${monthvalb}.${dayb}`)
        let newCurr = parseInt(`${currentMonth}.${currentDay}`)
        arep = arep -newCurr
        brep = brep - newCurr
        if (arep <0){
            arep = arep +12
        }
        if (brep < 0){
            brep = brep +12
        }
    

        return (arep) - (brep)
        

    }
    const longPressFunc =(()=>{
        // alert("you pressed it")
    })
    let renderListProf =  besties.map((data)=>{
            return(
                <TouchableHighlight key ={data.ID} activeOpacity={0.3} onPress={()=> navigation.navigate('ProfileScreen',{
                    name:data.Name,
                    bday:data.Birthday,
                    message:data.Message,
                    image: data.Pic,
                    giftIdea: data.giftIdea,
                    notes: data.Notes,
                    id: data.id
                })}>
                    <ListCompenents name = {data.Name} bday = {data.Birthday} image = {data.Pic}></ListCompenents> 
                </TouchableHighlight>
            )
        })
    
    let renderBannerProf =topBesties.map((data)=>{
        let birthday = data.Birthday.split(" ");
        let monthDay = `${birthday[0]} ${birthday[1]}`
        return (
            <TouchableHighlight activeOpacity={0.3} onPress={()=> navigation.navigate('ProfileScreen',{
                name:data.Name,
                bday:data.Birthday,
                message:data.Message,
                image: data.Pic,
                giftIdea: data.giftIdea,
                notes: data.Notes
            })}>
                <View>
                    <Profiles name={data.Name} bday={monthDay} image={data.Pic}/>
                </View>
            </TouchableHighlight>

        )
    })

  return (
    <View style = {styles.container}>
        <SafeAreaView style = {styles.top}>
            <View>
                <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight onPress = {()=>navigation.navigate('MotivationScreen')}>
                    <Text style = {styles.title}>Birthday Bestie</Text>
                </TouchableHighlight>
                {/* <TouchableHighlight activeOpacity={0.3} onPress={()=> navigation.navigate('NewBestieScreen')}>
                    <Image style = {{width: 40, height: 100}}source = {require("../assets/add_new_bestie.png")}></Image>
                </TouchableHighlight> */}
                </View>
            </View>
        </SafeAreaView>
            <View style = {styles.topBanner}>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style = {styles.BannerText}>who's up next?</Text>
                    <TouchableHighlight activeOpacity={0.3} onPress={()=> navigation.navigate('NewBestieScreen')}>
                        <Image style = {{width: 40, height: 100, paddingRight: 30}}source = {require("../assets/add_new_bestie.png")}></Image>
                    </TouchableHighlight>
                </View>
                <View style = {styles.insideBanner}>
                    {renderBannerProf}
                </View>
            </View>
            <ScrollView style = {styles.list} contentContainerStyle= {styles.contentContainerStyle}>                
                {renderListProf}
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

