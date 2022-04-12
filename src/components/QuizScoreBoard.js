import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import * as Progress from 'react-native-progress'

import CustomText from './CustomText'

const { width, height } = Dimensions.get('window')

const QuizScoreBoard = props => {

    let sn = 1

    const [counter, setCounter] = useState(0)

    const [solution, setsolution] = useState({
        solutions: props.solutions.map((data, index) => {return {...data, sn: sn++}})
    })

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(counter <= props.score) {
                setTimeout(() => {
                    setCounter(prevState => prevState + 0.01)
                }, 50);
            }

            if(counter == props.score){
                clearTimeout()
            }
        }

        return () => {
            mounted = false
        }
        
    }, [counter])

    const renderSolutions = () => {
        return solution.solutions.map((data, index) => {
            return (
                <View key={data._id} style={styles.solution}>
                    <CustomText weight="bold" style={{ fontSize: 18, color: '#fff' }}>Solution {data.sn}:</CustomText>
                    <CustomText style={{
                        fontSize: 15, 
                        textAlign: 'justify', 
                        color: '#fff',
                        lineHeight: 20
                    }}>
                        {data.solution}
                    </CustomText>
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
           <View style={styles.progressContainer}>
            <CustomText style={styles.headerText}>Total Score</CustomText>
           <Progress.Circle 
                    progress={counter} 
                    size={200}
                    thickness={15}
                    borderColor='#fff'
                    color='#1F78B4'
                    showsText={true}
                    borderRadius={20}
                    unfilledColor='#A6CEE3'
                    borderWidth={2} 
                    style={{marginBottom: 40}}
                />
            </View>
            <CustomText style={{...styles.headerText, textAlign: 'center'}}>Solutions</CustomText>
            {renderSolutions()}
        </View>
    )
}

export default QuizScoreBoard

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerText: {
        fontSize: 25,
        paddingBottom: 20
    },

    progressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    solution: {
        backgroundColor: 'rgba(37, 127, 155, 0.7)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20
    }
})
