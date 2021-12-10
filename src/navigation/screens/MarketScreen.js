import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MarketScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.someText}>
                market
            </Text>
        </View>
    )
}

export default MarketScreen

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