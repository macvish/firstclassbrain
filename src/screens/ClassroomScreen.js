import React, {useState} from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import CardView from '../components/CardView'
import CardViewFade from '../components/CardViewFade'
import testConent from '../helper/test.json'

const { width, height } = Dimensions.get('window')

const ClassroomScreen = props => {

    const renderItem = ({item}) => {
        return <View style={{paddingRight: 20, paddingBottom: 20}}>
            <CardViewFade uri={item.src} title={item.title} height={height/8} />
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={testConent.classroom}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={item => item.id}
                extraData={testConent.classroom}
            />
        </View>
    )
}

// ClassroomScreen.options = {
//     topBar: {
//         visible: false
//     }
// }

export default ClassroomScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    wrapper: {
        marginBottom: 20
    },

    headerText: {
        fontSize: 20,
        paddingBottom: 15,
        fontWeight: '800'
    },

    btn: {
        backgroundColor: '#3FB0D4',
        borderRadius: 15,
        height: 60
    },
})
