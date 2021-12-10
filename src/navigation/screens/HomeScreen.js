import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.someText}>
                Home screeen
            </Text>
        </View>
    )
}

export default HomeScreen

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