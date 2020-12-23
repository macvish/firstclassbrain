import React, { useCallback, useState, useEffect } from 'react'
import { Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'

import subjects from '../helper/subjects.json'
import ClassroomCardView from '../components/ClassroomCardView'
import CustomText from './CustomText'
import QuestionsCardView from '../components/QuestionsCardView'
import { connect } from 'react-redux'
import wait from '../helper/wait'

const { width, height } = Dimensions.get('window')

const DashboardScreen = props => {

    const [classroom, setClassroom] = useState(subjects.filter(item => item.class === props.user.classSelected).map((data, index) => ({...data, id: index+1})))

    const [assessmentState, setAssessmentState] = useState([])
    const [currentWeekState, setCurrentWeekState] = useState([])
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
            let quizes = props.assessments.sort(() =>  0.5 - Math.random()).slice(0, 4)
            let classes = classroom.sort(() =>  0.5 - Math.random()).slice(0, 4)
            setAssessmentState(quizes.filter(item => item.type === 1 && item.classSelected === props.user.classSelected))
            setCurrentWeekState(classes)
        }

        return () => {
            mounted = false
        }
    }, [props.assessments])

    const handleNavigation = (screenName, componentName, index) => {
        Navigation.push(props.componentId, {
            component: {
                name: screenName,
                passProps: {
                    // navProp: options
                },
                options: {
                    // bottomTabs: {
                    //     currentTabIndex: index
                    // },
                    animations: {
                        push: {
                            content: {
                                translationX: {
                                    from: width,
                                    to: 0,
                                    duration: 300
                                }
                            }
                        },
                        pop: {
                            content: {
                                translationX: {
                                    from: 0,
                                    to: width,
                                    duration: 300
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    const handleNavigateTab = (tabIndex) => {
        Navigation.mergeOptions('BottomTabs', {
            bottomTabs: {
                currentTabIndex: 1
            }
        })
    }

    const renderClasses = () => {
        let classes = classroom.sort(() =>  0.5 - Math.random()).slice(0, 4)
        return props.most_viewed.map((data) => {
            return <View key={data.id} style={{paddingLeft: 5, paddingRight: 5}}>
                <ClassroomCardView  
                    componentId={props.componentId} 
                    // uri={data.icon} 
                    item={data} 
                    title={data.name} 
                    height={height/8} 
                />
            </View>
        })
    }

    const renderQuiz = ({item, index}) => {
        return <View key={index+1} style={{paddingRight: 10, paddingLeft: 10, paddingBottom: 20}}>
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

    const renderCurrentWeek = ({item, index}) => {
        return <View key={index+1} style={{paddingRight: 10, paddingLeft: 10, paddingBottom: 20}}>
            <ClassroomCardView 
                componentId={props.componentId} 
                isPaid={props.user.paid} 
                // uri={item.icon} 
                item={item} 
                title={item.name} height={height/8}
            />
        </View>
    }

    return (
        <View style={styles.container}>
            <ScrollView 
                style={{flex: 1}} 
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={{marginBottom: 20,}}>
                    <CustomText style={styles.headerText}>Most Viewed</CustomText>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {renderClasses() ?? (<CustomText> No content yet </CustomText>)}
                        </ScrollView>
                    </View>
                </View>
                
                <View style={{...styles.wrapper, alignItems: 'center',}}>
                    <Button 
                        title='Assignments'
                        titleStyle={{ color: 'white', fontSize: 20}}
                        buttonStyle={styles.btn}
                        onPress={() => handleNavigateTab(1)}
                    />
                </View>

                <View style={styles.wrapper}>
                    <CustomText style={styles.headerText}>Current Week</CustomText>
                    <View style={{}}>
                        <FlatList
                            data={currentWeekState}
                            renderItem={renderCurrentWeek}
                            numColumns={2}
                            keyExtractor={(item, index) => index+1}
                            extraData={currentWeekState}
                        />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <CustomText style={styles.headerText}>Quiz to take</CustomText>
                    { props.user.paid === "true" ? 
                        (assessmentState.length >= 1
                            ? <>
                                <FlatList
                                    data={assessmentState}
                                    renderItem={renderQuiz}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index+1}
                                    extraData={assessmentState}
                                />
                            </>
                            : <View style={styles.placeHolder}>
                                <CustomText style={{ textAlign: 'center' }}>Sorry, no assessments yet.</CustomText>    
                            </View>
                        )
                        : <View style={styles.placeHolder}>
                            <CustomText style={{ textAlign: 'center', paddingRight: 10, width: width/1.5 }}>Sorry, you need to pay to access this.</CustomText>    
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}


// DashboardScreen.options = {
//     topBar: {
//         // visible: false,
//         title: {
//             text: 'Logo',
//             color: '#257F9B'
//         },
//     }
// }

const mapStateToProps = (state) => ({
    user: state.auth.payload,
    assessments: state.main.tests,
    most_viewed: state.main.most_viewed_classes
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, )(DashboardScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        paddingTop: 20,
    },

    wrapper: {
        marginBottom: 20,
    },

    headerText: {
        fontSize: 20,
        paddingBottom: 15,
        fontWeight: '800',
        paddingLeft: 15, 
        paddingRight: 15
    },

    btn: {
        backgroundColor: '#3FB0D4',
        borderRadius: 15,
        height: 60,
        width: width/1.2
    },

    placeHolder: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    }
})
