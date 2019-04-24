import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    Button,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

class AccountScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
    };

    render() {
        return (
            <ImageBackground source={require('../assets/AccountsBackground-E-llergic.png')}
                             style={{width: '100%', height: '100%'}}>

                {/* Header */}
                <View style={styles.headerStyle}>
                    <TouchableOpacity style={styles.leftNavigationArrow}
                                      onPress={()=>{this.props.navigation.navigate('ScannerScreen')}}
                    >
                        <Image source={require('../assets/BackArrow-E-llergic.png')} // List Button
                               style={styles.arrowStyle}/>
                        <Text style={styles.navigationText}> Scanner</Text>
                    </TouchableOpacity>

                    <Image source={require('../assets/AccountsIcon-E-llergic.png')} //Home Logo
                           style={styles.LogoStyle}/>

                </View>

                {/* Body */}

                <View style={styles.containerStyle}>
                    <Text style={styles.titleText}>
                        Accounts
                    </Text>
                    <Image source={require('../assets/ThiccLiteBar-E-llergic.png')}
                    style={styles.titleBar}/>

                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('FriendsScreen')}}
                    >
                        <Text style={styles.subText}>
                            Friends
                        </Text>
                        <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                        style={styles.subBar}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('SocialAccountsScreen')}}
                    >
                        <Text style={styles.subText}>
                            Social Accounts
                        </Text>
                        <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                               style={styles.subBar}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('SettingsScreen')}}
                    >
                        <Text style={styles.subText}>
                            Settings
                        </Text>
                        <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                               style={styles.subBar}/>
                    </TouchableOpacity>

                    <View style={styles.bottomBarView}>
                    <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                           style={styles.bottomBar}/>
                        <TouchableOpacity
                            onPress={()=>{this.props.navigation.navigate('Home')}}
                        >
                        <Text style={styles.signOutText}>
                            Sign out
                        </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        )
    }
}


export default AccountScreen;


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
        justifyContent: 'center',
        width: 62,
        height: 62,
    },

    //BodyStyles
    containerStyle:{
        height:'82%',
        width:'95%',
        backgroundColor:'white',
        marginTop:'5%',
        marginLeft:'5%',
        marginBottom: '3%',
    },
    titleText:{
        color: '#b2d786',
        fontSize: 30,
        marginLeft:'7%',
        marginTop:'7%'
    },
    titleBar:{
        marginLeft:'7%',
        marginTop:'2%',
        width:'93%',
        height:'2%',
        marginBottom: '7%',
    },
    subText:{
        color: '#88c540',
        fontSize: 25,
        marginLeft:'8%',
        marginTop:'5%'
    },
    subBar:{
        marginLeft:'7%',
        marginTop:'2%',
        width:'93%',
        height:'5%',
    },
    bottomBarView:{
        position: 'absolute',
        bottom:'2%',
        right:0,
        width:'93%',
        height:'13%',
    },
    bottomBar:{
        width:'100%',
        height:'5%',
    },
    signOutText:{
        color: '#ff0d00',
        fontSize: 22,
        marginTop:'5%'
    }
});