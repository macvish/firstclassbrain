import React, { useRef, useState, useEffect } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import PaystackWebView from 'react-native-paystack-webview'
import { useNetInfo } from "@react-native-community/netinfo"
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import pp from '../assets/images/quiz.png'
import AlertModal from './AlertModal'
import NoContentModal from './NoContentModal'
import SelectionModal from './SelectionModal'
import LoadingModal from './LoadingModal'
import { paystack_payment, get_user, get_courses, get_tests } from '../reducers/mainAction'
import { Image } from 'react-native'

const { width, height } = Dimensions.get('window')

const ClassroomCardView = props => {

    const netInfo = useNetInfo()

    const [options, setOptions] = useState({
        term: null,
        week: null,
        class: props.item.class,
        subject: props.item.subject,
    })

    const [modalVisible, setModalVisible] = useState(false)

    const [noContentModalVisible, setNoContentModalVisible] = useState(false)

    const [ loadingModalVisible, setLoadingModalVisible ] = useState(false)

    const [subscriptionPrice, setSubscriptionPrice] = useState(0)

    const [subscriptionType, setSubscriptionType ] = useState('')

    const [ paymentMessage, setPaymentMessage ] = useState(undefined)

    useEffect(() => {
        let mounted = true
        if(mounted) {
            setPaymentMessage(props.paymentMessage)
        }
        return () => {
            mounted = false
        }
    }, [props.paymentMessage])

    const payRef = useRef();

    const onContinue = () => {
        if(props.isPaid === "true"){
            if(options.term !== null && options.week !== null){
               const course = props.courses.find(data => data.classSelected === props.item.class && data.subject === props.item.subject && data.week === options.week && data.term === options.term)
               if(course !== undefined && Object.keys(course).length > 0){
                    setModalVisible(false)
                    handleNavigation('Courses')
                }
                else {
                    setModalVisible(false)
                    setNoContentModalVisible(true)
                }
            }
        } else{
            if(subscriptionPrice >= 0) {
                setModalVisible(false)
                if(netInfo.isConnected && netInfo.isInternetReachable) {
                    payRef.current.StartTransaction()
                }
                else {
                    alert('Your internet connect is down, please check and try again later')
                }
            }
        }
    }

    const handleOptions = (name, e) => {
        setOptions(prevState => ({...prevState, [name]: e}))
    }

    const handleSubscription = value => {
        if(value === 1) {
            setSubscriptionPrice(10)
            setSubscriptionType('monthly')
        }

        if(value === 2) {
            setSubscriptionPrice(5000)
            setSubscriptionType('quarterly')
        }

        if(value === 3) {
            setSubscriptionPrice(9000)
            setSubscriptionType('biannually')
        }

        if(value === 4) {
            setSubscriptionPrice(16000)
            setSubscriptionType('annually')
        }
    }

    const onCloseModal = () => {
        setNoContentModalVisible(false)
        setModalVisible(false)
        setLoadingModalVisible(false)
    }

    const onCancelPayment = e => {
        alert('Payment process was canceled')
    }

    const onSuccessfulPayment = e =>  {
        let referenceCode = e.data.transactionRef.reference
        props.paystack_payment(subscriptionType, referenceCode)
    }

    const refreshAll = async () => {
        const userToken = await AsyncStorage.getItem('access_token')

        props.get_courses()
        props.get_user(userToken)
        props.get_tests()
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
            <TouchableOpacity 
                onPress={() => {
                    setModalVisible(true)
                    setSubscriptionPrice(0)
                }}
            >
                <View style={styles.container}>
                    <ImageBackground 
                        source={props.uri ? {uri: props.uri} : pp} 
                        imageStyle={{borderRadius: 20, resizeMode: 'contain', height: 100}} 
                        style={styles.imageContainer} 
                        blurRadius={2.5}
                    >
                        <View style={styles.fadeContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            {props.isPaid === "true" ? 
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
                    onChange={e => handleSubscription(e)}
                    screen='class'
                />
            }

            <LoadingModal
                visible={loadingModalVisible}
                handleImmediately={refreshAll}
                handleOnPress={paymentMessage ? onCloseModal : null}
            />

            <NoContentModal 
                visible={noContentModalVisible}
                handleOnpress={onCloseModal}
            />

            <PaystackWebView
                showPayButton={false}
                paystackKey="pk_live_93943e903c531f80899a94d9d9307effe51cc3d7"
                amount={subscriptionPrice}
                billingEmail={props.user.email}
                billingMobile={props.user.phone}
                billingName={`${props.user.firstName} ${props.user.lastName}`}
                ActivityIndicatorColor="green"
                SafeAreaViewContainer={{marginTop: 5}}
                SafeAreaViewContainerModal={{marginTop: 5}}
                onCancel={onCancelPayment}
                onSuccess={onSuccessfulPayment}
                ref={payRef}
                refNumber={''+Math.floor((Math.random() * 1000000000) + 1)}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    courses: state.main.courses,
    user: state.auth.payload,
    paymentMessage: state.main.payment_message
})

const mapDispatchToProps = {
    paystack_payment,
    get_courses,
    get_tests,
    get_user
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassroomCardView)

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
        fontSize: 16,
        // textAlign: 'center'
    }
})
