import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import CardView from '../components/CardView'
import testConent from '../helper/test.json'

const { width, height } = Dimensions.get('window')

const QuestionsScreen = () => {

    const [value, setValue] = useState(1)

    const [activeBtn, setActiveBtn] = useState(1)

    return (
        <View style={styles.container}>
            <View style={[styles.headerTabs, {paddingBottom: 10}]}>
                <Button 
                    title='Assignment'
                    titleStyle={[styles.tabTitle, activeBtn === 1 ? { color: '#fff' } : null]}
                    buttonStyle={[styles.tab, activeBtn === 1 ? { backgroundColor: '#3FB0D4' } : null]} 
                    containerStyle={styles.tabContainer} 
                    onPress={() => {
                        setValue(1) 
                        setActiveBtn(1)
                    }} 
                />
                <Button 
                    title='Examination'
                    titleStyle={[styles.tabTitle, activeBtn === 2 ? { color: '#fff' } : null]} 
                    buttonStyle={[styles.tab, activeBtn === 2 ? { backgroundColor: '#3FB0D4' } : null]} 
                    containerStyle={styles.tabContainer} 
                    onPress={() => {
                        setValue(2)
                        setActiveBtn(2)
                    }}
                />
                <Button 
                    title='Weekly Assignments'
                    titleStyle={[styles.tabTitle, activeBtn === 3 ? { color: '#fff' } : null]} 
                    buttonStyle={[styles.tab, activeBtn === 3 ? { backgroundColor: '#3FB0D4' } : null]} 
                    containerStyle={styles.tabContainer} 
                    onPress={() => {
                        setValue(3)
                        setActiveBtn(3)
                    }}
                />
            </View>
            <Content screen={value} />
        </View>
    )
}

const Content = ({ screen }) => {
    switch (screen) {
        case 1:
            return <Screen />

        case 2:
            return <Screen />

        case 3:
            return <Screen /> 
    
        default:
            <Screen />
    }
}

const Screen = props => {

    const renderItem = ({item}) => {
        return <View style={{paddingRight: 20, paddingBottom: 20}}>
            <CardView uri={item.src} title={item.title} height={height/8} />
        </View>
    }

    return (
        <FlatList
            data={testConent.questions}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={item => item.id}
            extraData={testConent.questions}
        />
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen)

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

    headerTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: width/1.2,
        paddingBottom: 20
    },

    tab: {
        width: width/3.4, 
        height: 35,
        borderRadius: 10,
        backgroundColor: 'transparent'
    },

    tabTitle: {
        fontSize: 15,
        color: '#000000'
    },
})
