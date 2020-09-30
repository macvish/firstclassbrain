import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import AlertModal from '../components/AlertModal'
import QuestionsCardView from '../components/QuestionsCardView'
import testConent from '../helper/test.json'

const { width, height } = Dimensions.get('window')

const QuestionsScreen = props => {

    const [value, setValue] = useState(1)

    const [activeBtn, setActiveBtn] = useState(1)

    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if(props.questionTab){
            setValue(props.questionTab)
            setActiveBtn(props.questionTab)
            console.log(props.questionTab)
        }
    }, [props.questionTab])

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
            <Content screen={value} componentId={props.componentId} />
        </View>
    )
}

const Content = ({ screen, componentId }) => {
    switch (screen) {
        case 1:
            return <Screen componentId={componentId} />

        case 2:
            return <Screen componentId={componentId} />

        case 3:
            return <Screen componentId={componentId} /> 
    
        default:
            <Screen componentId={componentId} />
    }
}

const Screen = props => {

    const [modalVisible, setModalVisible] = useState(false)

    const onContinue = () => {
        setModalVisible(false)
        
    }

    const onCloseModal = () => {
        setModalVisible(false)
    }

    const renderItem = ({item, onPress}) => {
        return <View style={{paddingRight: 20, paddingBottom: 20}}>
            <QuestionsCardView uri={item.src} title={item.title} item={item} componentId={props.componentId} height={height/8} />
        </View>
    }

    return (
        <>
            <FlatList
                data={testConent.questions}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={item => item.id}
                extraData={testConent.questions}
            />
            <AlertModal 
                visible={modalVisible} 
                message='Do you want to start your Assignment Quiz?'
                onClose={onCloseModal} 
                onContinue={onContinue}
            />
        </>
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
