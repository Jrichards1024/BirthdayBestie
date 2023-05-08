import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native'

function ListCompenents(props) {
  return (
    <View>
        <View style = {styles.profile}>
            <View>
                <Image style={styles.image} source = {{uri:props.image}}/>
            </View>
            <View>
                <Text style ={{color:"white", fontWeight: "bold"}}>{props.name}</Text>
                <Text style ={{color:"white"}}>{props.bday}</Text>
            </View>
        </View>
     </View>

    
  )
}

ListCompenents.propTypes = {
    name: PropTypes.string,
    image: PropTypes.image,
    bday: PropTypes.string
}
const styles = StyleSheet.create({
    profile:{
        justifyContent: "left",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderColor: "rgb(211, 211, 211, .15)",
    },
    image:{
        width: 125,
        height: 125,
        borderRadius: 75
    }

})

export default ListCompenents
