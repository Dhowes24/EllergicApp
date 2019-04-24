import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from "react-native";


class EditWatchListScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View>
                <ActivityIndicator animating size={"large"}/>
            </View>
        )
    };

    render() {
        return (
            <ImageBackground source={require('../assets/ListsBackround-E-llergic.png')}
                             style={{width: '100%', height: '100%'}}>

                {/* Header */}
                <View style={styles.headerStyle}>

                    <Image source={require('../assets/AddWatchlistLogo-E-llergic.png')}
                           style={styles.LogoStyle}/>

                    <TouchableOpacity style={styles.rightNavigationArrow}
                                      onPress={()=>{this.props.navigation.navigate('WatchListScreen')}}>

                        <Text style={styles.navigationText}> Watch Lists</Text>

                        <Image source={require('../assets/RightArrow-E-llergic.png')} //Account Button
                               style={styles.arrowStyle}/>
                    </TouchableOpacity>
                </View>

                {/* Body1 */}

                <KeyboardAvoidingView style={styles.containerStyle}
                      behavior="padding">
                    <View style={styles.fillerView}>
                    </View>
                    <View style={styles.textInputView}>
                     <TextInput placeholderTextColor={'lightgrey'}
                               placeholder="Add Allergy To Watch List"
                               //onChangeText={(Password) => this.setState({Password:Password})}
                               style={styles.textInputStyle}/>
                    </View>

                    <FlatList
                        data={this.state.testListData}
                        renderItem={({item}) => (
                            <WatchListCards ListName={item.ListName}/>
                        )}
                        keyExtractor={item => item.ListName}
                        ListFooterComponent={this.renderFooter()}>

                    </FlatList>

                    <View  style={styles.BottomTextInputView}>
                        <TextInput placeholderTextColor={'lightgrey'}
                                   placeholder="Name your Watch List"
                                   style={styles.textInputStyle}/>
                    </View >

                </KeyboardAvoidingView>
                <View style={styles.doneContainerStyle}>
                    <TouchableOpacity style={styles.bottomButtonStyle}
                                      onPress={()=>{this.props.navigation.navigate('WatchListScreen')}}>
                        <Text style={styles.ButtonTextStyle}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}


export default EditWatchListScreen;


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
        fontSize: 14,
        color: 'white',
        marginTop: '-5%',
    },
    LogoStyle: {
        marginTop: '6%',
        justifyContent: 'center',
        width: 104,
        height: 58,
        flex: 0
    },

    //BodyStyles
    containerStyle: {
        height: '65%',
        width: '95%',
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    doneContainerStyle:{
        height: '15%',
        width: '95%',
        backgroundColor: 'white',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: 10,
    },
    textInputStyle: {
        fontSize: 20,
        width:'90%',
        marginLeft: '4%',
    },
    fillerView:{
      color:'white',
      width:'100%',
      height:20
    },
    textInputView:{
        alignSelf:'center',
        width:'90%',
        height:35,
        borderColor:'lightgrey',
        borderWidth: 3,
        borderRadius:10,
    },
    BottomTextInputView:{
        alignSelf:'center',
        width:'90%',
        height:35,
        borderColor:'lightgrey',
        borderWidth: 3,
        borderRadius:10,
        bottom:15,
    },
    bottomButtonStyle:{
        width:180,
        height:60,
        backgroundColor: '#88c540',
        alignSelf:'center',
        marginLeft:'5%',
        marginRight:'5%',
        borderRadius:10,
        marginTop: 20
    },
    ButtonTextStyle:{
        alignSelf: 'center',
        top:'25%',
        fontSize: 22,
        color:'white'
    }
});