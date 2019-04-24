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

class ListsScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
    };

    render() {
        return (
            <ImageBackground source={require('../assets/ListsBackround-E-llergic.png')}
                             style={{width: '100%', height: '100%'}}>

                {/*Header */}
                <View style={styles.headerStyle}>

                    <Image source={require('../assets/MainPageLogo-E-llergic.png')} //Home Logo
                           style={styles.LogoStyle}/>

                    <TouchableOpacity style={styles.rightNavigationArrow}
                                      onPress={()=>{this.props.navigation.navigate('ScannerScreen')}}
                    >
                        <Text style={styles.navigationText}> Scanner</Text>
                        <Image source={require('../assets/RightArrow-E-llergic.png')} //Account Button
                               style={styles.arrowStyle}/>
                    </TouchableOpacity>
                </View>

                {/*Body*/}
                <View style={styles.containerStyle}>
                    <Text style={styles.titleText}>
                        Lists
                    </Text>
                    <Image source={require('../assets/ThiccLiteBar-E-llergic.png')}
                           style={styles.titleBar}/>

                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('WatchListScreen')}}
                    >
                        <Text style={styles.subText}>
                            Allergy Watch Lists
                        </Text>
                        <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                               style={styles.subBar}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('GroceryListsScreen')}}
                    >
                        <Text style={styles.subText}>
                            Grocery lists
                        </Text>
                        <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                               style={styles.subBar}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={()=>{this.props.navigation.navigate('SettingsScreen')}}
                    >
                        <Text style={styles.subText}>
                            Substitute Search
                        </Text>
                        <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                               style={styles.subBar}/>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        )
    }
}


export default ListsScreen;


const styles = StyleSheet.create({
    //Header Styles
    headerStyle: {
        flexDirection: 'row',
        justifyContent:'flex-end'
    },
    rightNavigationArrow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '15%',
        marginRight: '2%',
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
        width: '17%',
        height: '100%',
        marginRight: '-3%'
    },

    //BodyStyles
    containerStyle:{
        height:'62%',
        width:'95%',
        backgroundColor:'white',
        marginTop:'10%',
        marginRight:'5%',
        marginBottom: '3%',
    },
    titleText:{
        color: '#b2d786',
        fontSize: 30,
        marginLeft:'7%',
        marginTop:'7%'
    },
    titleBar:{
        marginRight:'7%',
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
        marginRight:'7%',
        marginTop:'2%',
        width:'93%',
        height:'5%',
    },
});