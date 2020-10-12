import React, {useEffect, useState} from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import ClassroomCardView from '../components/ClassroomCardView'
import testConent from '../helper/test.json'
import subjects from '../helper/subjects.json'

const { width, height } = Dimensions.get('window')


const ClassroomScreen = props => {

    const [classroom, setClassroom] = useState(subjects.filter(item => item.class === props.user.classSelected).map(data => ({...data, isPaid: true})))
    
    useEffect(() => {
        // subjects.filter(item => item.class === 9)
        return () => {
        }
    }, [props.user])

    const renderItem = ({item}) => {
        return <View style={{paddingRight: 20, paddingBottom: 20}}>
            <ClassroomCardView componentId={props.componentId} uri={item.src} item={item} title={item.name} height={height/8} />
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

// ClassroomScreen.options = {
//     topBar: {
//         visible: false
//     }
// }

const mapStateToProps = (state) => ({
    user: state.auth.payload,
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
