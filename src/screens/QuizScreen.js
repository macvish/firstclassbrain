import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

import LoadingModal from '../components/LoadingModal'
import Quiz from '../components/Quiz'
import QuizScoreBoard from '../components/QuizScoreBoard'

const { width, height } = Dimensions.get('window')

const QuizScreen = props => {

    const [timer, setTimer] = useState(30)

    const [modalVisible, setModalVisible] = useState(false)

    const [quizData, setQuizData] = useState({
        finished: false,
        score: 0.0
    })

    let timeoutId

    useEffect(() => {
        if(timer >= 1){      
            timeoutId = setTimeout(() => setTimer( prevTimer => prevTimer - 1), 1000)
        }
        if(timer === 1){
            alert('Time up')
        }
        // return () => {
        // }
    }, [timer])

    useEffect(() => {
        
    })

    const getTimer = t  => {
        const digit = n => n < 10 ? `0${n}` : `${n}`

        const sec = digit(Math.floor(t % 60))
        const min = digit(Math.floor((t/60) % 60))
        const hr = digit(Math.floor((t/3000) % 60))
        return min + ':' + sec
    }

    const resetTimer = () => {
        clearTimeout(timeoutId)
        setTimer(0)
        setTimer(30)
    }

    const finishQuiz = () => {
        setTimer(0)
        setModalVisible(false)
        setQuizData(prevState => ({...prevState, finished: true}))
    }

    const getScore = (score) => {
        setModalVisible(true)
        setQuizData(prevState => ({...prevState, score: score }))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Text style={{fontSize: 18, fontWeight: 'bold', width: width/1.3}}>{props.item.title ?? 'Unknown'}</Text>
                {quizData.finished ? null : <Text style={{fontSize: 18}}>{getTimer(timer)}</Text>}
            </View>
            <ScrollView>
                {quizData.finished ? 
                    <QuizScoreBoard solutions={props.item.solutions} score={quizData.score/100} />
                :
                    <Quiz 
                        questions={props.item.questions} 
                        timer={timer} resetTimer={resetTimer} 
                        getScore={ score => getScore(score)} 
                        grading={props.item.grading}
                        />
                }
            </ScrollView>
            <LoadingModal visible={modalVisible} handleOnpress={finishQuiz} />
        </View>
    )
}

export default QuizScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },

    content: {

    },

    question: {
        paddingTop: 10,
        paddingBottom: 20
    },

    solution: {
        backgroundColor: 'rgba(37, 127, 155, 0.7)',
        borderRadius: 10,
        padding: 20
    }
})
