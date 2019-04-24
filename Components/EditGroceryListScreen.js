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
import ListItemCard from "./ListItemCard";


class EditGroceryListScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            list: [{listItem: 'pepper'}, {listItem: 'oranges'}, {listItem: 'Pineapple'}, {listItem: 'Apple'}],

        };
    }

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

                    <Image source={require('../assets/AddGroceryListLogo-E-llergic.png')}
                           style={styles.LogoStyle}/>

                    <TouchableOpacity style={styles.rightNavigationArrow}
                                      onPress={()=>{this.props.navigation.navigate('GroceryListsScreen')}}>

                        <Text style={styles.navigationText}> Grocery Lists</Text>

                        <Image source={require('../assets/RightArrow-E-llergic.png')} //Account Button
                               style={styles.arrowStyle}/>
                    </TouchableOpacity>
                </View>

                {/* Body1 */}

                <View style={styles.containerStyle}
                                      behavior="padding">

                    <View style={styles.fillerView}>
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput placeholderTextColor={'lightgrey'}
                                   placeholder="Add Item to Grocery List"
                                   style={styles.textInputStyle}/>
                    </View>


                    <FlatList
                        data={this.state.items}
                        renderItem={({item}) => (
                            <ListItemCard listItem={item.listItem}/>
                        )}
                        keyExtractor={item => item.listItem}
                        ListFooterComponent={this.renderFooter()}>

                    </FlatList>

                    <KeyboardAvoidingView  style={styles.BottomTextInputView}>
                        <TextInput placeholderTextColor={'lightgrey'}
                                   placeholder="Name your Grocery List"
                            //onChangeText={(Password) => this.setState({Password:Password})}
                                   style={styles.textInputStyle}/>
                    </KeyboardAvoidingView >

                </View>
                <View style={styles.doneContainerStyle}>
                    <TouchableOpacity style={styles.bottomButtonStyle}
                                      onPress={()=>{this.props.navigation.navigate('GroceryListsScreen')}}>
                        <Text style={styles.ButtonTextStyle}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}


export default EditGroceryListScreen;


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
        width: 90,
        height: 62,
        flex: 0
    },

    //BodyStyles
    containerStyle: {
        height: '65%',
        width: '95%',
        backgroundColor: 'white',
        marginTop: '5%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    doneContainerStyle:{
        height: '15%',
        width: '95%',
        backgroundColor: 'white',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '3%',
    },
    textInputStyle: {
        fontSize: 20,
        width:'90%',
        marginLeft: '4%',
        marginBottom: '3%',
    },
    fillerView:{
        color:'white',
        width:'100%',
        height:'6%'
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
        bottom:'2%',
    },
    bottomButtonStyle:{
        width:'40%',
        height:60,
        backgroundColor: '#88c540',
        alignSelf:'center',
        marginLeft:'5%',
        marginRight:'5%',
        borderRadius:10
    },
    ButtonTextStyle:{
        alignSelf: 'center',
        top:'25%',
        fontSize: 22,
        color:'white'
    }
});