import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    ImageBackground,
    Image,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";


class SocialAccountsScreen extends Component {

    static navigationOptions = {
        header: null
    };

render(){
    return (
        <ImageBackground source={require('../assets/AccountsBackground-E-llergic.png')}
                         style={{width: '100%', height: '100%'}}>

            {/* Header */}
            <View style={styles.headerStyle}>
                <TouchableOpacity style={styles.leftNavigationArrow}
                                  onPress={()=>{this.props.navigation.navigate('AccountScreen')}}
                >
                    <Image source={require('../assets/BackArrow-E-llergic.png')} // List Button
                           style={styles.arrowStyle}/>
                    <Text style={styles.navigationText}> Accounts</Text>
                </TouchableOpacity>

                <Image source={require('../assets/AccountsIcon-E-llergic.png')} //Home Logo
                       style={styles.LogoStyle}/>

            </View>

            {/* Body1 */}

            <View style={styles.containerStyle}>
                <Text style={styles.titleText}>
                    Social Accounts
                </Text>
                <Image source={require('../assets/ThiccLiteBar-E-llergic.png')}
                       style={styles.titleBar}/>
            </View>


        </ImageBackground>
    )
}
            }


export default SocialAccountsScreen;


const styles = StyleSheet.create({
    //Header Styles
    headerStyle: {
        flexDirection: 'row',
    },
    leftNavigationArrow: {
        flexDirection: 'row',
        marginTop: '15%',
        marginLeft: '5%',
    },
    arrowStyle: {
        width: '20%',
        height: '7%',
    },
    navigationText: {
        fontSize: 20,
        color: 'white',
        marginTop: '-10%'
    },
    LogoStyle: {
        marginTop: '6%',
        marginLeft:'-4%',
        justifyContent: 'center',
        width: 62,
        height: 62,
    },

    //BodyStyles
    containerStyle:{
        height:'45%',
        width:'95%',
        backgroundColor:'white',
        marginTop:'5%',
        marginLeft:'2.5%',
        marginRight:'2.5%',
        marginBottom: '3%',
    },
    connectContainerStyle:{
        height:'30%',
        width:'95%',
        backgroundColor:'white',
        marginLeft:'2.5%',
        marginRight:'2.5%',
        marginBottom: '3%',
    },
    titleText:{
        color: '#b2d786',
        fontSize: 30,
        marginTop:'4%',
        alignSelf:'center'

    },
    titleBar:{
        marginLeft:'3.5%',
        marginRight:'3.5%',
        marginTop:'2%',
        width:'93%',
        height:'2%',
        marginBottom: '7%',
    },
    connectTitleText:{
        color: '#88c540',
        fontSize: 25,
        marginTop:'7%',
        marginLeft:'7%'

    },
});