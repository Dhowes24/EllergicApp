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


/**
 * Graphql Imports
 */
import {createWatchList} from "../src/graphql/mutations";
import gql from "graphql-tag";
import {getUser} from "../src/graphql/queries";

/**
 * Redux Imports
 */
import {connect} from "react-redux";
import Video from "expo/build/av/Video";


class EditWatchListScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        newItem: "",
        id: this.props.list.ListName,
        listItems: this.props.list.listItems
    };


    allergyEntrySubmit = () => {
        if (this.state.newItem != "") {
            let stateList = this.state.listItems;
            let obj = {};
            obj["ListItem"] = this.state.newItem;
            stateList.push(obj);
            this.setState({listItems: stateList});
            this.AllergyEntry.clear();
        }

    };

    donePressed = () => {
        let stateList = this.state.listItems;
        let listString="";
        for (let i =0;i<stateList.length;i++){
            listString +=stateList[i].ListItem;
            if(i!=stateList.length-1){
                listString+=','
            }
        }
        alert(listString);
        this.props.navigation.navigate('WatchListScreen')


    };

    //TODO
    // done() {
    //     let listString;
    //     for (let i = 0; i < list.length; i++) {
    //         listString = listString + list[i];
    //     }
    //     if (this.state.id == null) {
    //         (async () => {
    //             const Watchlistresult = await client.query({
    //                 mutation: gql(createWatchList),
    //                 variables: {
    //                     name: this.state.name,
    //                     list: listString
    //                 },
    //                 fetchPolicy: 'network-only'
    //             });
    //             (async () => {
    //                 let Userresult = await client.query({
    //                     query: gql(getUser),
    //                     variables: {
    //                         username: this.state.Username
    //                     },
    //                     fetchPolicy: 'network-only'
    //                 });
    //                 (async () => {
    //                     await client.query({
    //                         query: gql(updateUser),
    //                         variables: {
    //                             username: this.state.Username,
    //                             watchlist: Userresult.watchlist + Watchlistresult.id
    //                         },
    //                         fetchPolicy: 'network-only'
    //                     });
    //                 })();
    //             })();
    //         })();
    //     } else {
    //         (async () => {
    //             await client.query({
    //                 mutation: gql(updateWatchList),
    //                 variables: {
    //                     id: this.state.id,
    //                     name: this.state.name,
    //                     list: listString
    //                 },
    //                 fetchPolicy: 'network-only'
    //             });
    //         })();
    //     }
    // }

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
                                      onPress={() => {
                                          this.props.navigation.navigate('WatchListScreen')
                                      }}>

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

                    <View style={styles.nameInputView}>
                        {this.state.id != null && <TextInput placeholderTextColor={'black'}
                                                             placeholder={this.state.id}
                                                             style={styles.textInputStyle}/>}
                        {this.state.id == null && <TextInput placeholderTextColor={'lightgrey'}
                                                             placeholder="Name your Watch List"
                                                             style={styles.textInputStyle}/>}
                    </View>

                    <View style={styles.allergyInputContainer}>
                        <View style={styles.allergyInputView}>
                            <TextInput ref={input => {
                                this.AllergyEntry = input
                            }}
                                       placeholderTextColor={'lightgrey'}
                                       placeholder="Add Allergy To Watch List"
                                       onChangeText={(Allergy) => this.setState({newItem: Allergy})}
                                       style={styles.textInputStyle}
                            />
                        </View>
                        <TouchableOpacity onPress={() =>{
                            this.allergyEntrySubmit()
                        }}>
                            <Image source={require('../assets/SubmitButton.png')}
                                   style={styles.submitButtonStyle}/>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={this.state.listItems}
                        renderItem={({item}) => (
                            <ListItemCard ListItem={item.ListItem}
                                          state={this.state}
                            />
                        )}
                        keyExtractor={item => item.ListItem}
                        ListFooterComponent={this.renderFooter()}>

                    </FlatList>

                </KeyboardAvoidingView>
                <View style={styles.doneContainerStyle}>
                    <TouchableOpacity style={styles.bottomButtonStyle}
                                      onPress={() => {
                                          this.donePressed()
                                      }}>
                        <Text style={styles.ButtonTextStyle}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    const {list} = state;
    return {list}
};

export default connect(mapStateToProps)(EditWatchListScreen);


const styles = StyleSheet.create({
    //Header Styles
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
    doneContainerStyle: {
        height: '15%',
        width: '95%',
        backgroundColor: 'white',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: 10,
    },
    textInputStyle: {
        fontSize: 20,
        width: '90%',
        marginLeft: '4%',
    },
    fillerView: {
        color: 'white',
        width: '100%',
        height: 20
    },
    nameInputView: {
        alignSelf: 'center',
        width: '90%',
        height: 35,
        borderColor: 'lightgrey',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 15
    },
    allergyInputContainer: {
        flexDirection: "row",
        alignSelf: 'flex-start',
        left: "3.2%"
    },
    allergyInputView: {
        width: '70%',
        height: 35,
        borderColor: 'lightgrey',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 15
    },
    submitButtonStyle: {
        top: 5,
        left: 10,
        height: 25,
        width: 60,
    },
    bottomButtonStyle: {
        width: 180,
        height: 60,
        backgroundColor: '#88c540',
        alignSelf: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 10,
        marginTop: 20
    },
    ButtonTextStyle: {
        alignSelf: 'center',
        top: '25%',
        fontSize: 22,
        color: 'white'
    }
});