import React from 'react'
import { SafeAreaView,View,StyleSheet,ScrollView, Text } from 'react-native'

function MotivationScreen() {
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.smallercontainer}>
        <ScrollView>
            <View>
            <Text style = {styles.text}>Welcome to Birthday Bestie, the perfect app for anyone who has ever forgotten a friend's birthday.</Text>
            </View>
            <View>
            <Text style = {styles.text}>With Birthday Bestie, you can easily keep track of all your friends' birthdays and make sure you never forget to send them a special </Text>
            </View>
            <View>
            <Text style = {styles.text}>message on their special day. You can also store gift ideas for each friend so you're always prepared when their birthday rolls around.</Text>
            </View>
            <View>
            <Text style = {styles.text}>Say goodbye to the stress and embarrassment of forgetting a friend's birthday, and hello to a more organized and thoughtful way of celebrating the people you care about. Download Birthday Bestie today and start showing your friends just how much they mean to you.</Text>
            </View>
        </ScrollView>
        </View>
    </SafeAreaView>
    
  )
}
let styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex: 1,
        alignContent:'center',
        // justifyContent:'center'
    },
    smallercontainer:{
        alignItems:'center',
        justifyItems:'space-around',
        backgroundColor: 'black',
        borderWidth:'8px',
        borderColor: 'white'

    },
    text:{
        color: "#613665",
        alignSelf:'center',
        textAlign: 'center',
        fontSize:'20px',
        fontWeight:'bold'
    }

})

export default MotivationScreen