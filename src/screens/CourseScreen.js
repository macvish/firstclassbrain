import React, {useEffect, useState} from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import CoursesCardView from '../components/CoursesCardView'

const { width, height } = Dimensions.get('window')


const CourseScreen = props => {

    const [classroom, setClassroom] = useState(
      props.classes
      .filter(item => item.classSelected === props.user.classSelected 
        && item.term === props.options.term && item.week === props.options.week && item.subject === props.options.subject)
      .map(data => ({...data})))
    
    useEffect(() => {
        return () => {
        }
    }, [props.user])

    const renderItem = ({item}) => {
        return <View key={item.id} style={{paddingRight: 20, paddingBottom: 20}}>
            <CoursesCardView 
                componentId={props.componentId} 
                isPaid={props.user.paid} 
                uri={item.video} item={item} 
                src={item.courseThumbnail}
                title={item.courseTitle} height={height/8}
                options={props.options}
            />
        </View>
    }

    return (
        <View style={styles.container}>
            {classroom.length >= 1 ?
                <FlatList
                    data={classroom}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    extraData={classroom}
                    style={{paddingTop: 5}}
                /> 
            :
                <Text>Sorry, this class contains no subjects</Text>
            }
        </View>
    )
}

CourseScreen.options = {
    topBar: {
        text: 'Courses',
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.payload,
    classes: state.main.courses
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(CourseScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    }
})
