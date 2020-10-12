import React, { useRef, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import PaystackWebView from 'react-native-paystack-webview'
import { connect } from 'react-redux'

import pp from '../assets/images/physics_program.png'
import AlertModal from './AlertModal'
import NoContentModal from './NoContentModal'
import SelectionModal from './SelectionModal'

const { width, height } = Dimensions.get('window')

const ClassroomCardView = props => {

    const [options, setOptions] = useState({
        term: null,
        week: null,
        class: props.item.class,
        subject: props.item.subject,
    })

    const [modalVisible, setModalVisible] = useState(false)
    const [noContentModalVisible, setNoContentModalVisible] = useState(false)

    const payRef = useRef();

    const onContinue = () => {
        if(props.item.isPaid){
            if(options.term !== null && options.week !== null){
               const course = props.courses.find(data => data.classSelected === props.item.class && data.subject === props.item.subject && data.week === options.week && data.term === options.term)
               if(course !== undefined && Object.keys(course).length > 0){
                    setModalVisible(false)
                    handleNavigation('Class')
                }
                else {
                    setModalVisible(false)
                    setNoContentModalVisible(true)
                }
            }
        } else{
            setModalVisible(false)
            payRef.current.StartTransaction()   
        }
    }

    const handleOptions = (name, e) => {
        setOptions(prevState => ({...prevState, [name]: e}))
    }

    const onCloseModal = () => {
        setNoContentModalVisible(false)
        setModalVisible(false)
    }

    const handleNavigation = screenName => {
        Navigation.push(props.componentId, {
            component: {
                name: screenName,
                passProps: {
                    options: options,
                    item: props.item
                },
                options: {
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

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    <ImageBackground source={props.src ?? pp} imageStyle={{borderRadius: 20}} style={styles.imageContainer}>
                        <View style={styles.fadeContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            {props.item.isPaid ? 
                <SelectionModal 
                    visible={modalVisible} 
                    message='Do you want to start your Assignment Quiz?'
                    onClose={onCloseModal} 
                    onContinue={onContinue}
                    onChange={(n, e) => handleOptions(n, e)}
                />
            :
                <AlertModal
                    visible={modalVisible}
                    message='Kindly pay your fee to continue?'
                    onClose={onCloseModal} 
                    onContinue={onContinue}
                />
            }

            <NoContentModal 
                visible={noContentModalVisible}
                handleOnpress={onCloseModal}
            />

            <PaystackWebView
                showPayButton={false}
                paystackKey="pk_live_93943e903c531f80899a94d9d9307effe51cc3d7"
                // paystackKey="pk_test_895f07c74a6b76a9ad3cc3aabf62104119879257"
                amount={120000}
                billingEmail="email@email.com"
                billingMobile="09787377462"
                billingName="Oluwatobi Shokunbi"
                ActivityIndicatorColor="green"
                SafeAreaViewContainer={{marginTop: 5}}
                SafeAreaViewContainerModal={{marginTop: 5}}
                onCancel={(e) => { /** handle response here */ }}
                onSuccess={(e) => { /** handle response here */ }}
                ref={payRef}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    courses: state.main.courses
})

export default connect(mapStateToProps, )(ClassroomCardView)

const styles = StyleSheet.create({
    container: {
        width: width/2.3,
        height: height/7,
        borderRadius: 20,
    },

    imageContainer: {
        // flex: 1,
        width: width/2.3,
        height: height/7,
        borderRadius: 20,
        justifyContent: 'flex-end'
    },

    fadeContainer: {
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        paddingLeft: 20
    },

    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        // textAlign: 'center'
    }
})
