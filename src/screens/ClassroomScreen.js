import React, {useCallback, useEffect, useState} from 'react'
import { Dimensions, FlatList, StyleSheet, View, RefreshControl } from 'react-native'
import { connect } from 'react-redux'

import ClassroomCardView from '../components/ClassroomCardView'
import CustomText from '../components/CustomText'
import subjects from '../helper/subjects.json'
import wait from '../helper/wait'

const { width, height } = Dimensions.get('window')


const ClassroomScreen = props => {

    const [classroom, setClassroom] = useState([])

    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() => {
        let mounted = true
        if(mounted) {
            setClassroom(subjects.filter(item => item.class === props.user.classSelected).map(data => ({...data})))
        }
        return () => {
            mounted = false
        }
    }, [props.user.classSelected])

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setClassroom(subjects.filter(item => item.class === props.user.classSelected).map(data => ({...data})))
        wait(2000).then(() => {
            setRefreshing(false)
        })
    }, []);

    const renderItem = ({item, index}) => {
        return <View key={index+1} style={{paddingRight: 10, paddingLeft: 10, paddingBottom: 20}}>
            <ClassroomCardView 
                componentId={props.componentId} 
                isPaid={props.user.paid} 
                uri={item.icon}
                item={item} 
                title={item.name} height={height/8}
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
                    keyExtractor={(item, index) => index+1}
                    extraData={classroom}
                    style={{paddingTop: 5}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                /> 
            :
                <CustomText>Sorry, this class contains no subjects</CustomText>
            }
        </View>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.payload,
    classes: state.main.courses
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        paddingTop: 20,
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
