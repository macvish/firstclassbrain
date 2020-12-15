import React, { useState, useEffect } from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import * as Progress from 'react-native-progress'

import pp from '../assets/images/physics_program.png'
import cf from '../assets/images/chemistry_fact.png'
import CardView from '../components/CardView'
import subjects from '../helper/subjects.json'
import ClassroomCardView from '../components/ClassroomCardView'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')

const DashboardScreen = props => {

    const [classroom, setClassroom] = useState(subjects.filter(item => item.class === props.user.classSelected).map(data => ({...data})))

    const [assessmentState, setAssessmentState] = useState([])
    const [currentWeekState, setCurrentWeekState] = useState([])

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
        return classes.map((data, index) => {
            return <View key={data.id} style={{paddingLeft: 5, paddingRight: 5}}>
                <ClassroomCardView  componentId={props.componentId} uri={data.src} item={data} title={data.name} height={height/8} />
            </View>
        })
    }

    const renderQuiz = ({item}) => {
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

    const renderCurrentWeek = ({item}) => {
        return <View key={item.id} style={{paddingRight: 20, paddingBottom: 20}}>
            <ClassroomCardView 
                componentId={props.componentId} 
                isPaid={props.user.paid} 
                uri={item.video} item={item} 
                title={item.name} height={height/8}
            />
        </View>
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 20,}}>
                    <Text style={{...styles.headerText, paddingLeft: 15, paddingRight: 15}}>Most Viewed</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {renderClasses() ?? (<Text> No content yet </Text>)}
                        </ScrollView>
                    </View>
                </View>
                
                <View style={styles.wrapper}>
                    <Button 
                        title='Assignments'
                        titleStyle={{ color: 'white', fontSize: 20}}
                        buttonStyle={styles.btn}
                        onPress={() => handleNavigateTab(1)}
                    />
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.headerText}>Current Week</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <FlatList
                                data={currentWeekState}
                                renderItem={renderCurrentWeek}
                                numColumns={2}
                                keyExtractor={item => item.id}
                                extraData={currentWeekState}
                            />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.headerText}>Quiz to take</Text>
                    { props.user.paid === "true" ? 
                        (assessmentState.length >= 1
                            ? <>
                                <FlatList
                                    data={assessmentState}
                                    renderItem={renderQuiz}
                                    numColumns={2}
                                    keyExtractor={item => item.id}
                                    extraData={assessmentState}
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
                </View>
            </ScrollView>
        </View>
    )
}


// DashboardScreen.options = {
//     topBar: {
//         // visible: false
//         title: {
//             text: 'Logo',
//             color: '#257F9B'
//         },
//     }
// }

const mapStateToProps = (state) => ({
    user: state.auth.payload,
    assessments: state.main.tests
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
        paddingLeft: 15,
        paddingRight: 15,
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

    placeHolder: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    }
})
