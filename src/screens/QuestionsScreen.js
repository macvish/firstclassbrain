import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Dimensions, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import QuestionsCardView from '../components/QuestionsCardView'
import wait from '../helper/wait'

const { width, height } = Dimensions.get('window')

const QuestionsScreen = props => {

    const [value, setValue] = useState(1)

    const [activeBtn, setActiveBtn] = useState(1)

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(props.questionTab){
                setValue(props.questionTab)
                setActiveBtn(props.questionTab)
            }
        }

        return () => {
            mounted = false
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
                    title='Weekly Assignments'
                    titleStyle={[styles.tabTitle, activeBtn === 2 ? { color: '#fff' } : null]} 
                    buttonStyle={[styles.tab, activeBtn === 2 ? { backgroundColor: '#3FB0D4' } : null]} 
                    containerStyle={styles.tabContainer} 
                    onPress={() => {
                        setValue(2)
                        setActiveBtn(2)
                    }}
                />

                <Button 
                    title='Examination'
                    titleStyle={[styles.tabTitle, activeBtn === 3 ? { color: '#fff' } : null]} 
                    buttonStyle={[styles.tab, activeBtn === 3 ? { backgroundColor: '#3FB0D4' } : null]} 
                    containerStyle={styles.tabContainer} 
                    onPress={() => {
                        setValue(3)
                        setActiveBtn(3)
                    }}
                />
            </View>
            <View style={styles.contentSection}>
                <Content 
                    screen={value} 
                    assessments={props.assessments} 
                    componentId={props.componentId}
                    user={props.user}
                />
            </View>
        </View>
    )
}

const Content = ({ screen, componentId, assessments, user }) => {
    switch (screen) {
        case 1:
            return <Screen user={user} assessments={assessments} assessmentType={screen} componentId={componentId} />

        case 2:
            return <Screen user={user} assessments={assessments} assessmentType={screen} componentId={componentId} />

        case 3:
            return <Screen user={user} assessments={assessments} assessmentType={screen} componentId={componentId} /> 
    
        default:
            <Screen user={user} assessments={assessments} assessmentType={screen} componentId={componentId} />
    }
}

const Screen = props => {

    const [assessmentState, setAssessmentState] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        wait(2000).then(() => {
            setRefreshing(false)
        })
    }, []);

    useEffect(() => {
        let mounted = true
        if(mounted) {
            setAssessmentState(props.assessments.filter(item => item.type === props.assessmentType && item.classSelected === props.user.classSelected))
        }

        return () => {
            mounted = false
        }
    }, [props.assessmentType])

    const renderItem = ({item}) => {
        return <View style={{paddingRight: 20, paddingBottom: 20}}>
            <QuestionsCardView 
                uri={item.src} 
                title={item.subject} 
                subTitle={item.topic} 
                week={`Week ${item.week}`} 
                item={item} componentId={props.componentId} 
                height={'auto'} 
            />
        </View>
    }

    return (
        <>
            { props.user.paid === "true" ? 
                (assessmentState.length >= 1
                    ? <>
                        <FlatList
                            data={assessmentState}
                            renderItem={renderItem}
                            numColumns={2}
                            keyExtractor={item => item.id}
                            extraData={assessmentState}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />
                    </>
                    : <View style={styles.placeHolder}>
                        <Text style={{ textAlign: 'center' }}>Sorry, no assessments yet.</Text>    
                    </View>
                )
                : <View style={styles.placeHolder}>
                    <Text style={{ textAlign: 'center', paddingRight: 10, width: width/1.5 }}>Sorry, you need to pay to access this.</Text>    
                </View>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    assessments: state.main.tests,
    user: state.auth.payload
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
        paddingBottom: 20
    },

    tab: {
        width: width/3.2, 
        height: 35,
        borderRadius: 10,
        backgroundColor: 'transparent'
    },

    tabTitle: {
        fontSize: 15,
        color: '#000000'
    },

    contentSection: {
        flex: 3,
        width: width/1.05,
        marginTop: 10
    },

    placeHolder: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
