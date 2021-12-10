import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const MainNavigation = () => {
    return(
        <View style={styles.container}>
            <Text>
                app
            </Text>
        </View>
    )
}

export default MainNavigation

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