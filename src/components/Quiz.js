import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnswerButton from '../components/AnswerButton'

const Quiz = props => {

    const [questionNo, setQuestionNo] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState({
        answers: [],
        score: 0.0
    })

    
    const [data, setData] = useState(
        {
            question: props.questions[questionNo].question,
            options: [
                {
                    _id: 1,
                    name: 'answerA',
                    answer: props.questions[questionNo].answerA,
                    correct: props.questions[questionNo].correctAnswer === 'answerA' ? true : false,
                    selected: false
                },
                {
                    _id: 2,
                    name: 'answerB',
                    answer: props.questions[questionNo].answerB,
                    correct: props.questions[questionNo].correctAnswer === 'answerB' ? true : false,
                    selected: false
                },
                {
                    _id: 3,
                    name: 'answerC',
                    answer: props.questions[questionNo].answerC,
                    correct: props.questions[questionNo].correctAnswer === 'answerC' ? true : false,
                    selected: false
                },
                {
                    _id: 4,
                    name: 'answerD',
                    answer: props.questions[questionNo].answerD,
                    correct: props.questions[questionNo].correctAnswer === 'answerD' ? true : false,
                    selected: false
                },
            ]
        }
    )

    const handleSelectAnswer = (optionItem) => {
        let new_options = data.options.map((item, index) => ({...item, selected: false, disabled: false}))
        let selectedItem = new_options.find(option => option._id == optionItem)
        if(selectedItem){
            selectedItem.selected = !selectedItem.selected
            if(selectedItem.correct){
                let new_correctAnswers = correctAnswers.answers.filter((data, index) => data.questionNo != questionNo)
                setCorrectAnswers(prevAnswers => ({
                    ...prevAnswers, 
                    answers: [
                        ...new_correctAnswers, 
                        {_id: selectedItem._id, questionNo: questionNo, correct: selectedItem.correct, score: 100/props.questions.length}
                    ]
                }))
                setCorrectAnswers(prevAnswers => ({
                    ...prevAnswers, score: prevAnswers.answers.reduce((a, b) => (a + b.score), 0)
                }))
            }
            else {
                let new_correctAnswers = correctAnswers.answers.filter((data, index) => data.questionNo != questionNo)
                setCorrectAnswers(prevAnswer => ({...prevAnswer, answers: new_correctAnswers}))
                setCorrectAnswers(prevAnswers => ({
                    ...prevAnswers, score: prevAnswers.answers.reduce((a, b) => (a + b.score), 0)
                }))
            }
        }
        setData(prevState => ({...prevState, options: new_options}))
    }

    const renderOptions = () => {
        return data.options.map((data) => {
            return <AnswerButton 
                key={data._id} 
                title={data.answer} 
                borderColor={data.selected ? 'rgba(37, 127, 155, 0.4)' : null} 
                onPress={() => handleSelectAnswer(data._id)} 
                backgroundColor={data.selected ? 'rgba(37, 127, 155, 0.4)' : null} 
                disabled={data.disabled}
            />
        })
    }

    useEffect(() => {
        let mounted = true
        if(mounted) {
            setData({
                question: props.questions[questionNo].question,
                options: [
                    {
                        _id: 1,
                        name: 'answerA',
                        answer: props.questions[questionNo].answerA,
                        correct: props.questions[questionNo].correctAnswer === 'answerA' ? true : false,
                        selected: false,
                        disabled: false
                    },
                    {
                        _id: 2,
                        name: 'answerB',
                        answer: props.questions[questionNo].answerB,
                        correct: props.questions[questionNo].correctAnswer === 'answerB' ? true : false,
                        selected: false,
                        disabled: false
                    },
                    {
                        _id: 3,
                        name: 'answerC',
                        answer: props.questions[questionNo].answerC,
                        correct: props.questions[questionNo].correctAnswer === 'answerC' ? true : false,
                        selected: false,
                        disabled: false
                    },
                    {
                        _id: 4,
                        name: 'answerD',
                        answer: props.questions[questionNo].answerD,
                        correct: props.questions[questionNo].correctAnswer === 'answerD' ? true : false,
                        selected: false,
                        disabled: false
                    },
                ]
            })
        }
        return () => {
            mounted = false
        }
    }, [questionNo])

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(props.timer === 0){
                setData({
                    question: props.questions[questionNo].question,
                    options: [
                        {
                            _id: 1,
                            name: 'answerA',
                            answer: props.questions[questionNo].answerA,
                            correct: props.questions[questionNo].correctAnswer === 'answerA' ? true : false,
                            selected: false,
                            disabled: true
                        },
                        {
                            _id: 2,
                            name: 'answerB',
                            answer: props.questions[questionNo].answerB,
                            correct: props.questions[questionNo].correctAnswer === 'answerB' ? true : false,
                            selected: false,
                            disabled: true
                        },
                        {
                            _id: 3,
                            name: 'answerC',
                            answer: props.questions[questionNo].answerC,
                            correct: props.questions[questionNo].correctAnswer === 'answerC' ? true : false,
                            selected: false,
                            disabled: true
                        },
                        {
                            _id: 4,
                            name: 'answerD',
                            answer: props.questions[questionNo].answerD,
                            correct: props.questions[questionNo].correctAnswer === 'answerD' ? true : false,
                            selected: false,
                            disabled: true
                        },
                    ]
                })
            }
        }

        return () => {
            mounted = false
        }
    }, [props.timer])

    const handleNext = () => {
        if(questionNo < props.questions.length-1){
            setQuestionNo(prevState => prevState+1)
            props.resetTimer()
        }
        else{
            props.getScore(correctAnswers.score)
        }
    }

    return (
        <View style={styles.container}>
           <View style={styles.question}>
                <Text style={{
                    fontSize: 15, 
                    textAlign: 'justify', 
                    color: '#707070',
                    lineHeight: 20
                }}>
                {data.question}
                </Text>
            </View>

            {renderOptions()}
            
            <View style={{  }}>
            <AnswerButton 
                title={questionNo < props.questions.length-1 ? 'Next' : 'Submit'} 
                backgroundColor='#257F9B'
                textSize={22}
                textColor='#fff'
                textWeight='bold'
                borderColor='#257F9B'
                onPress={() => handleNext()}
            />
            </View>
        </View>
    )
}

export default Quiz

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
