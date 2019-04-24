import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, ActivityIndicator,
} from "react-native";
import DownloadListsCard from './DownloadListsCard';


class DownloadFriendListScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        testListData: [{ListName: 'Emilys Family'}, {ListName: 'No Nutsense'}, {ListName: 'Vegan'}]
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View>
                <ActivityIndicator animating size={"large"}/>
            </View>
        )
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
                        <Text style={styles.navigationText}> Friends</Text>
                    </TouchableOpacity>
                </View>

                {/* Name */}

                <View style={styles.nameStyles}>
                    <Text style={styles.firstNameStyle}
                          marginTop={'5%'}>
                        FirstName
                    </Text>
                </View>
                <View style={styles.nameStyles}>
                    <Text style={styles.lastNameStyle}>
                        LastName
                    </Text>
                </View>
                {/* Body1 */}

                <View style={styles.containerStyle}>
                    <FlatList
                        data={this.state.testListData}
                        renderItem={({item}) => (
                            <DownloadListsCard ListName={item.ListName}/> //Add other data when database layout is figured out
                        )}
                        keyExtractor={item => item.ListName}
                        ListFooterComponent={this.renderFooter()}>

                    </FlatList>
                </View>


            </ImageBackground>
        )
    }
}


export default DownloadFriendListScreen;


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

    //NameStyles

    firstNameStyle:{
        fontSize:45,
        color: 'white'

    },
    lastNameStyle:{
        color: 'white',
        fontSize:30
    },
    nameStyles:{
        alignSelf: 'center',
    },
    //BodyStyles
    containerStyle:{
        height:'70%',
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