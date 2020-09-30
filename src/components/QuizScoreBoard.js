import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import * as Progress from 'react-native-progress'
import AnswerButton from '../components/AnswerButton'

const { width, height } = Dimensions.get('window')

const QuizScoreBoard = props => {

    let sn = 1

    const [counter, setCounter] = useState(0)

    const [solution, setsolution] = useState({
        solutions: props.solutions.map((data, index) => {return {...data, sn: sn++}})
    })

    useEffect(() => {
        if(counter <= props.score)
        setTimeout(() => {
            setCounter(prevState => prevState + 0.01)
        }, 50);

        return () => {
            if(counter == props.score){
                clearInterval()
            }
        }
        
    }, [counter])

    const renderSolutions = () => {
        return solution.solutions.map((data, index) => {
            return (
                <View key={data._id} style={styles.solution}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Solution {data.sn}:</Text>
                    <Text style={{
                        fontSize: 15, 
                        textAlign: 'justify', 
                        color: '#fff',
                        lineHeight: 20
                    }}>
                        {data.solution}
                    </Text>
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
           <View style={styles.progressContainer}>
            <Text style={styles.headerText}>Total Score</Text>
           <Progress.Circle 
                    progress={counter} 
                    // width={width/1.2}
                    // height={15}
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
            <Text style={{...styles.headerText, textAlign: 'center'}}>Solutions</Text>
            {renderSolutions()}
            {/* <View style={{  }}>
            <AnswerButton 
                title={'Submit'} 
                backgroundColor='#257F9B'
                textSize={22}
                textColor='#fff'
                textWeight='bold'
                borderColor='#257F9B'
                onPress={() => handleNext()}
            />
            </View> */}
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
