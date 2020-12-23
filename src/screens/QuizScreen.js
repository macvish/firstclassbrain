import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import LoadingModal from '../components/LoadingModal'
import CustomText from './CustomText'
import Quiz from '../components/Quiz'
import QuizScoreBoard from '../components/QuizScoreBoard'
import { send_score } from '../reducers/mainAction'

const { width, height } = Dimensions.get('window')

const QuizScreen = props => {

    const [timer, setTimer] = useState((props.item.hours * 3000) + (props.item.minutes * 60))

    const [modalVisible, setModalVisible] = useState(false)

    const [quizData, setQuizData] = useState({
        finished: false,
        score: 0.0
    })

    const [quizSolutions, ] = useState(props.item.questions.map((data, index) => ({ _id: index + 1, solution: data.correction })))

    let timeoutId

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(timer >= 1){      
                timeoutId = setTimeout(() => setTimer( prevTimer => prevTimer - 1), 1000)
            }
            if(timer === 1){
                setTimer(0)
                alert('Time up')
            }
        }
        return () => {
            mounted = false
        }
    }, [timer])

    const getTimer = t  => {
        const digit = n => n < 10 ? `0${n}` : `${n}`

        const sec = digit(Math.floor(t % 60))
        const min = digit(Math.floor((t/60) % 60))
        const hr = digit(Math.floor((t/3000) % 60))
        return hr +':' + min + ':' + sec
    }

    const resetTimer = () => {
        clearTimeout(timeoutId)
        setTimer(0)
        setTimer((props.item.hours * 3000) + (props.item.minutes * 60))
    }

    const finishQuiz = () => {
        setTimer(0)
        setModalVisible(false)
        setQuizData(prevState => ({...prevState, finished: true}))
    }

    const getScore = (score) => {
        setTimer(0)
        setModalVisible(true)
        setQuizData(prevState => ({...prevState, score: score }))
        const formData = {
            testId: props.item._id,
            studentId: props.item._id,
            score
        }
        props.send_score(formData)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <CustomText style={{fontSize: 18, fontWeight: 'bold', width: width/1.45}}>{props.item.topic ?? 'Unknown'}</CustomText>
                {quizData.finished ? null : <CustomText style={{fontSize: 18}}>{getTimer(timer)}</CustomText>}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {quizData.finished ? 
                    <QuizScoreBoard solutions={quizSolutions} score={quizData.score/100} />
                :
                    <Quiz 
                        questions={props.item.questions} 
                        timer={timer} 
                        resetTimer={resetTimer}
                        getScore={ score => getScore(score)} 
                        grading={props.item.grading}
                    />
                }
            </ScrollView>
            <LoadingModal visible={modalVisible} handleOnpress={finishQuiz} />
        </View>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.payload
})

const mapDispatchToProps = {
    send_score
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)

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
