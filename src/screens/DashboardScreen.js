import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import * as Progress from 'react-native-progress'

import CardViewFade from '../components/CardViewFade'
import pp from '../assets/physics_program.png'
import cf from '../assets/chemistry_fact.png'
import CardView from '../components/CardView'

const { width, height } = Dimensions.get('window')

const DashboardScreen = props => {

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
                <View style={styles.wrapper}>
                    <Text style={styles.headerText}>Most Viewed</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <CardViewFade src={pp} title='Physics' />
                        <CardViewFade src={cf} title='Chemistry' />
                    </View>
                </View>
                
                <View style={styles.wrapper}>
                    <Button 
                        title='Assignments'
                        titleStyle={{ color: 'white', fontSize: 20}}
                        buttonStyle={styles.btn}
                    />
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.headerText}>Current Week</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <CardView src={pp} height={height/7.5} />
                        <View style={{ width: width/2.2, justifyContent: "space-between"}}>
                            <Text style={{fontSize: 15, fontWeight: '700', color: '#707070'}}>Introduction to Polynomials</Text>
                            <Text style={{overflow: 'hidden', height: 35, color: '#707070' }}>
                                The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. 
                                Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz. The quick, brown fox 
                                jumps over a lazy dog. DJs flock by when MTV ax.
                            </Text>
                            <Progress.Bar progress={0.3} width={width/2.3} height={14} borderRadius={20} borderColor='#257F9B' color='#257F9B' />
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={styles.headerText}>Popular Videos</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
                        <CardView src={pp} />
                        <CardView src={cf} />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <CardView src={pp} />
                        <CardView src={cf} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


// DashboardScreen.options = {
//     topBar: {
//         // visible: false
//         title: {
//             text: 'Logo',
//             color: '#257F9B'
//         },
//     }
// }

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
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
    }
})
