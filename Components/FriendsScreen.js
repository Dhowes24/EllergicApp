import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground,
    Image,
    ActivityIndicator,
    TouchableOpacity, TextInput, KeyboardAvoidingView,
} from "react-native";
import FriendCard from "./FriendCard";


/**
 * redux imports
 */
import {bindActionCreators} from "redux";
import {reduxUpdateUser} from "../actions/UserActions";
import {addAllerginList, removeAllergins} from "../actions/AllerginActions";
import {connect} from "react-redux";


/**
 * GraphQL imports
 */
import gql from "graphql-tag";
import {getUser, getWatchList} from "../src/graphql/queries";
import AWSAppSyncClient from "aws-appsync";
import aws_config from "../aws-exports";
import {updateUser} from "../src/graphql/mutations";
import WatchListCards from "./WatchListScreen";


const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: aws_config.aws_appsync_authenticationType,
        apiKey: aws_config.aws_appsync_apiKey,
    }
});

class FriendsScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        FriendData: [],
        friendUsername: "",
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View>
                <ActivityIndicator animating size={"large"}/>
            </View>
        )
    };

    componentDidMount() {
        let localFriendData = this.state.FriendData;
        console.log(this.props.user);
        for (let i = 0; i < this.props.user.friendslist.length; i++) {
            (async () => {
                const result = await client.query({
                    query: gql(getUser),
                    variables: {
                        username: this.props.user.friendslist[i],

                    },
                    fetchPolicy: 'network-only'
                });
                if (result.data.getUser.username != null) {

                    let obj = {};
                    obj["FriendName"] = result.data.getUser.username;
                    localFriendData.push(obj);
                }
                console.log(this.state.FriendData)
            })();
        }
    }

    friendEntrySubmit = () => {
        let localFriendData = this.state.FriendData;
        (async () => {
            const result = await client.query({
                query: gql(getUser),
                variables: {
                    username: this.state.friendUsername,

                },
                fetchPolicy: 'network-only'
            });
            if (result.data.getUser.username != null) {
                console.log(result);

                let obj = {};
                obj["FriendName"] = result.data.getUser.username;
                localFriendData.push(obj);
                this.setState({FriendData:localFriendData});

                let storedData = this.props.user.friendslist;
                storedData.push(result.data.getUser.username);
                console.log(storedData);
                this.props.reduxUpdateUser({
                    username: this.props.user.ID,
                    friendslist: storedData,
                });

                (async () => {
                    await client.mutate({
                        mutation: gql(updateUser),
                        variables: {
                            input: {
                                username: this.props.user.ID,
                                friendslist: storedData,
                            }
                        }
                    });
                })();
            }
        })();
        this.NameEntry.clear();

    };

    removeFriend(Name) {
        let arrCopy = this.state.testFriendData.slice();
        let index = arrCopy.map(function (e) {
            return e.FriendName;
        }).indexOf(Name);

        let removed = arrCopy.splice(index, 1);
        this.setState({testFriendData: arrCopy});
        alert(index)
    }

    render() {
        return (
            <ImageBackground source={require('../assets/AccountsBackground-E-llergic.png')}
                             style={{width: '100%', height: '100%'}}>

                {/* Header */}
                <View style={styles.headerStyle}>
                    <TouchableOpacity style={styles.leftNavigationArrow}
                                      onPress={() => {
                                          this.props.navigation.navigate('AccountScreen')
                                      }}
                    >
                        <Image source={require('../assets/BackArrow-E-llergic.png')} // List Button
                               style={styles.arrowStyle}/>
                        <Text style={styles.navigationText}> Accounts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('DownloadFriendListScreen')
                        }}
                    >
                        <Image source={require('../assets/FriendsLogo-E-llergic.png')} //Home Logo
                               style={styles.LogoStyle}/>
                    </TouchableOpacity>

                </View>

                {/* Body1 */}

                <View style={styles.containerStyle}>
                    <Text style={styles.titleText}>
                        Friends
                    </Text>
                    <Image source={require('../assets/ThiccLiteBar-E-llergic.png')}
                           style={styles.titleBar}/>
                    <FlatList
                        data={this.state.FriendData}
                        renderItem={({item}) => (
                            <FriendCard FriendName={item.FriendName}
                                        state={this.state}
                                        setState={this.setState.bind(this)}
                                        navigateTo={this.props.navigation.navigate.bind(this)}
                                        removeFunc={this.removeFriend}/> //Add other data when database layout is figured out

                        )}
                        keyExtractor={item => item.FriendName}
                        ListFooterComponent={this.renderFooter()}>

                    </FlatList>
                </View>

                {/* Body2 */}
                <View style={styles.connectContainerStyle}>
                    <Text style={styles.connectTitleText}>
                        Add Friends
                    </Text>
                    <Image source={require('../assets/ThiccLiteBar-E-llergic.png')}
                           style={styles.titleBar}/>

                    <View style={styles.InputContainer}>
                        <View style={styles.InputView}>
                            <TextInput ref={input => {
                                this.NameEntry = input
                            }}
                                       placeholderTextColor={'lightgrey'}
                                       placeholder="Add Friend Username"
                                       onChangeText={(name) => this.setState({friendUsername: name})}
                                       style={styles.textInputStyle}
                            />
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.friendEntrySubmit()
                        }}>
                            <Image source={require('../assets/SubmitButton.png')}
                                   style={styles.submitButtonStyle}/>
                        </TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        reduxUpdateUser,
    }, dispatch)
);

const mapStateToProps = (state) => {
    const {user} = state;
    return {user}
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);


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
        marginTop: '7%',
        justifyContent: 'center',
        width: 93,
        height: 60,
        flex: 0
    },

    //BodyStyles
    containerStyle: {
        height: '50%',
        width: '95%',
        backgroundColor: 'white',
        marginTop: '5%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '3%',
    },
    connectContainerStyle: {
        height: '30%',
        width: '95%',
        backgroundColor: 'white',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '3%',
    },
    titleText: {
        color: '#b2d786',
        fontSize: 30,
        marginTop: '4%',
        alignSelf: 'center'

    },
    titleBar: {
        marginLeft: '3.5%',
        marginRight: '3.5%',
        marginTop: '2%',
        width: '93%',
        height: '2%',
        marginBottom: '7%',
    },
    connectTitleText: {
        color: '#88c540',
        fontSize: 25,
        marginTop: '7%',
        marginLeft: '7%'
    },

    //Add Friend
    InputContainer: {
        flexDirection: "row",
        alignSelf: 'flex-start',
        left: "3.2%"
    },
    InputView: {
        width: '70%',
        height: 35,
        borderColor: 'lightgrey',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 15
    },
    textInputStyle: {
        fontSize: 20,
        width: '90%',
        marginLeft: '4%',
    },
    submitButtonStyle: {
        top: 5,
        left: 20,
        height: 25,
        width: 60,
    },
});