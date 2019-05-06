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
} from "react-native";

import WatchListCards from "./WatchListCards";

/**
 * graphql imports
 */
import gql from "graphql-tag";
import AWSAppSyncClient from "aws-appsync";
import aws_config from "../aws-exports";
import {getWatchList} from "../src/graphql/queries";

/**
 * redux imports
 */
import {bindActionCreators} from "redux";
import {editList} from "../actions/ListActions";
import {updateUser} from "../actions/UserActions";
import {connect} from "react-redux";



const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: aws_config.aws_appsync_authenticationType,
        apiKey: aws_config.aws_appsync_apiKey,
    }
});

class WatchListScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        realData:[]
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View>
                <ActivityIndicator animating size={"large"}/>
            </View>
        )
    };


    //TODO
    componentDidMount(){
        let watchlistData = [];
            for (let i = 0; i < this.props.user.watchlists.length; i++) {
                (async () => {
                    const result = await client.query({
                        query: gql(getWatchList),
                        variables: {
                            id: this.props.user.watchlists[i]
                        },
                        fetchPolicy: 'network-only'
                    });
                    let obj = {};
                    obj["List"] = result.data.getWatchList.list;
                    obj["ListName"] = result.data.getWatchList.name;

                    watchlistData.push(obj);
                    if(watchlistData.length == this.props.user.watchlists.length){
                        this.setState({realData:watchlistData})
                    }
                })();
            }
    }

    render() {
        return (
            <ImageBackground source={require('../assets/ListsBackround-E-llergic.png')}
                             style={{width: '100%', height: '100%'}}>

                {/* Header */}
                <View style={styles.headerStyle}>

                    <Image source={require('../assets/WatchlistLogo-E-llergic.png')}
                           style={styles.LogoStyle}/>

                    <TouchableOpacity style={styles.rightNavigationArrow}
                                      onPress={()=>{this.props.navigation.navigate('ListsScreen')}}
                    >
                        <Text style={styles.navigationText}> Lists</Text>
                        <Image source={require('../assets/RightArrow-E-llergic.png')} //Account Button
                               style={styles.arrowStyle}/>
                    </TouchableOpacity>
                </View>

                {/* Body1 */}

                <View style={styles.containerStyle}>
                    <FlatList
                        data={this.state.realData}
                        renderItem={({item}) => (
                            <WatchListCards ListName={item.ListName}
                                            List= {item.List}
                                            state={this.state}
                                            navigateTo={this.props.navigation.navigate.bind(this)}/>
                        )}
                        keyExtractor={item => item.ListName}
                        ListFooterComponent={this.renderFooter()}>

                    </FlatList>
                </View>

                {/* Body2 */}
                <View style={styles.createContainerStyle}>
                    <TouchableOpacity style={styles.bottomButtonStyle}
                                      onPress={()=>{
                                          this.props.editList({ListName:null, List:null});
                                          this.props.navigation.navigate('EditWatchListScreen')}}>
                        <Text style={styles.ButtonTextStyle}>
                            Create Watchlist
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButtonStyle}
                                      onPress={()=>{
                                          alert(this.state.realData.length)
                                          //this.props.navigation.navigate('FriendsScreen')
                                      }}>
                        <Text style={styles.ButtonTextStyle}>
                            Download Friends Watchlist
                        </Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUser,
        editList
    }, dispatch)
);
const mapStateToProps = (state) => {
    const { user } = state;
    return { user }
};

export default connect (mapStateToProps, mapDispatchToProps)(WatchListScreen);


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
        width: 104,
        height: 50,
        flex: 0
    },

    //BodyStyles
    containerStyle: {
        height: '60%',
        width: '95%',
        backgroundColor: 'white',
        marginTop: '5%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '3%',
    },
    createContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '20%',
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
    bottomButtonStyle:{
        width:'40%',
        height:'70%',
        backgroundColor: '#88c540',
        alignSelf:'center',
        marginTop: '15%',
        marginBottom:'15%',
        marginLeft:'5%',
        marginRight:'5%',
        borderRadius:10
    },
    ButtonTextStyle:{
        alignSelf: 'center',
        fontSize: 22,
        color:'white'
    }
});