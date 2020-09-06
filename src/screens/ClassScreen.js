import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import HtmlView from 'react-native-htmlview'

import calendar from '../assets/calendar.png'
import zip_folder from '../assets/zip-folder.png'
import IconImage from '../components/IconImage'


const { width, height } = Dimensions.get('window')

const ClassScreen = props => {

    const htmlContent = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedet urna eu risus ultrices sagittis. In red tortor turpis,lobortis a tincidunt non, congue a lorem. In tortor turpis,lobortis a tincidunt non-quecongue a lorem. non gravida elementum. Praesentet arcu molesteefaucibus ligula sed, euismod urna. Praesent vitae orci metus. Nulla varius diam nec iaculis pulvinar. Sed mienim,cursus nec uri.</p>`

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{...styles.title, paddingTop: 10, paddingBottom: 10}}>Physics</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <IconImage source={calendar} />
                    <Text style={{...styles.title, paddingTop: 10, paddingBottom: 10, paddingLeft: 5}}>First Term - Week One</Text>
                </View>
            </View>
            <View style={styles.VideoContainer}>
                
            </View>
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1}}>

                        <View style={[styles.header, {justifyContent: 'center'}]}>
                            <Text style={{...styles.title, paddingTop: 10, paddingBottom: 10}}>Overview</Text>
                        </View>

                        <View style={styles.content}>
                            <HtmlView 
                                value={htmlContent} 
                                stylesheet={htmlStyles}
                            />
                        </View>

                        <View style={styles.header}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <IconImage source={zip_folder} width={23} />
                                <Text style={[styles.title, {paddingLeft: 5}]}>Week1.zip</Text>
                            </View>
                        </View>

                        <View style={{...styles.header, borderBottomWidth: 0}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <IconImage source={zip_folder} width={23} />
                                <Text style={[styles.title, {paddingLeft: 5}]}>Attendance</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
        </View>
    )
}

ClassScreen.options = {
    topBar: {
        // visible: false
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#fff'
    },

    headerContainer: {

    },

    header: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1.3,
        borderBottomColor: '#707070'
    },

    title: {
        color: '#707070',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 20
    },

    VideoContainer: {
        backgroundColor: 'black',
        height: width/1.5,
        width: width
    },

    content: {
        width: width,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 20,
        borderBottomWidth: 1.3,
        borderBottomColor: '#707070',
        // backgroundColor: '#000'
    }
})

const htmlStyles = StyleSheet.create({
    p: {
        textAlign: 'justify',
        lineHeight: 18,
    }
})
