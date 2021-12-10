import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FindMyDogScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.someText}>
                FindMyDogScreen
            </Text>
        </View>
    )
}

export default FindMyDogScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    someText: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})