import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native'

function Profiles(props) {
  return (
    <SafeAreaView>
        <View style = {styles.profile}>
            <Text style = {{color:"white"}}>{props.name}</Text>
            <Image style={styles.image} source = {require('../../assets/randonman.png')}/>
            <Text style = {{color:"white"}}>{props.bday}</Text>
        </View>
     </SafeAreaView>

    
  )
}

Profiles.propTypes = {
    name: PropTypes.string,
    bday: PropTypes.string
}
let styles = StyleSheet.create({
    profile:{
        justifyContent: "center",
        alignItems: "center",

    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 50
    }

})

export default Profiles
