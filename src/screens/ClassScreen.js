import React, { useState, useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import HtmlView from 'react-native-htmlview'
import VideoPlayer from 'react-native-video-player'
import { CheckBox } from 'react-native-elements'

import calendar from '../assets/icons/calendar.png'
import CustomText from '../components/CustomText'
import IconImage from '../components/IconImage'
import weeks from '../helper/weeks.json'
import { mark_attendance } from '../reducers/mainAction'


const { width, height } = Dimensions.get('window')

const ClassScreen = props => {

    const [data, setData] = useState({
        week: weeks.find(data => data.week = props.options.week).name,
        term: "",
        class: props.courses.find(data => data.classSelected === props.user.classSelected && data.subject === props.item.subject && data.week === props.options.week && data.term === props.options.term)
    })

    useEffect(() => {
        if(props.options.term === 1){
            setData(prevData => ({
                ...prevData, term: "First Term"
            }))
        }
        if(props.options.term === 2){
            setData(prevData => ({
                ...prevData, term: "Second Term"
            }))
        }
        if(props.options.term === 3){
            setData(prevData => ({
                ...prevData, term: "Third Term"
            }))
        }

        return () => {
            
        }
    }, [props.options.term])

    const [attendance, setAttendance] = useState(false)

    const htmlContent = `<p>${data.class.firstTextSlide ?? "No content yet"}</p> 
    <p>${data.class.secondTextSlide ?? null}</p>
    <p>${data.class.thirdTextSlide ?? null}</p>
    <p>${data.class.fourthTextSlide ?? null}</p>
    `

    const handleMarkAttendance = () => {
        setAttendance(true)
        props.markAttendance(data.class._id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText weight="bold" style={{...styles.title, paddingTop: 10, paddingBottom: 10, width: width/2.7}}>{data.class.courseTitle}</CustomText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <IconImage source={calendar} />
                    <CustomText weight="bold" style={{...styles.title, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, width: width/1.9}}>{data.term} - {data.week}</CustomText>
                </View>
            </View>

            <View style={styles.VideoContainer}>
                <VideoPlayer
                    video={{uri: data.class.video}}
                    style={styles.video}
                    resizeMode='cover'
                    thumbnail={{uri: data.class.courseThumbnail}}
                    endThumbnail={{uri: data.class.courseThumbnail}}
                />
            </View>

                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1}}>

                        <View style={[styles.header, {justifyContent: 'center'}]}>
                            <CustomText weight="bold" style={{...styles.title, paddingTop: 10, paddingBottom: 10}}>Overview</CustomText>
                        </View>

                        <View style={styles.content}>
                            <HtmlView 
                                value={htmlContent} 
                                stylesheet={htmlStyles}
                            />
                        </View>

                        <View style={{...styles.header, borderBottomWidth: 0}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <CheckBox 
                                    checked={attendance} 
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0, marginLeft: 0}} 
                                    onPress={handleMarkAttendance}
                                    title='Attendance'
                                    textStyle={{ 
                                        color: '#707070',
                                        fontSize: 16,
                                        fontFamily: 'Montserrat-Bold'
                                    }}
                                />
                                <CustomText style={[styles.title, {paddingLeft: 5}]}></CustomText>
                            </View>
                        </View>
                    </View>
                </ScrollView>
        </View>
    )
}

ClassScreen.options = {
    topBar: {
        // visible: false
    }
}

const mapStateToProps = (state) => ({
    courses: state.main.courses,
    user: state.auth.payload
})

const mapDispatchToProps = {
    markAttendance: mark_attendance
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#fff'
    },

    headerContainer: {

    },

    header: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1.3,
        borderBottomColor: '#707070'
    },

    title: {
        color: '#707070',
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 20
    },

    VideoContainer: {
        backgroundColor: 'black',
        height: width/1.5,
        width: width
    },

    video: {
        height: width/1.5
    },

    content: {
        width: width,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 20,
        borderBottomWidth: 1.3,
        borderBottomColor: '#707070',
        // backgroundColor: '#000'
    }
})

const htmlStyles = StyleSheet.create({
    p: {
        textAlign: 'justify',
        lineHeight: 18,
        marginBottom: -50,
        fontFamily: 'Montserrat-Regular'
    }
})
