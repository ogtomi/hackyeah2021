import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SettingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.someText}>
                Settings
            </Text>
        </View>
    )
}

export default SettingScreen

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