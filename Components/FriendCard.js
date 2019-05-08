import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";

import {Card, CardItem, } from "native-base";

/**
 * Redux Imports
 */
import {editList} from "../actions/ListActions";
import {reduxUpdateUser} from "../actions/UserActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

/**
 * GraphQL Imports
 */
import {getUser} from "../src/graphql/queries";
import gql from "graphql-tag";
import AWSAppSyncClient from "aws-appsync";
import aws_config from "../aws-exports";


const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: aws_config.aws_appsync_authenticationType,
        apiKey: aws_config.aws_appsync_apiKey,
    }
});


class FriendCard extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        name: this.props.FriendName,
        ellipseToggle: false
    };

    removeFriend(Name) {
         this.props.removeFunc(Name);
    };

    navigateTo(page){
        this.props.navigateTo(page)
    };

    downloadFriendPushed(){
        (async () => {
            const result = await client.query({
                query: gql(getUser),
                variables: {
                    username: this.state.name,

                },
                fetchPolicy: 'network-only'
            });
            this.props.editList({ListName:result.data.getUser.username, List:result.data.getUser.watchlists, ID:result.data.getUser.username});
            this.navigateTo("DownloadFriendListScreen")
        })();
    };


    render() {

        return (
            <Card transparent={true}>

                <CardItem style={styles.CardStyle}>
                    <Text style={styles.nameText}>
                        {this.state.name}
                    </Text>
                    <TouchableHighlight
                        onPress={() => {
                            this.setState({ellipseToggle: !this.state.ellipseToggle})
                        }}
                        style={styles.ellipseStyle}
                        underlayColor={'white'}>
                        <Image source={this.state.ellipseToggle ?
                            require('../assets/HollowElipses-E-llergic.png')
                            : require('../assets/Elipses-E-llergic.png')}
                               style={styles.ellipseImageStyle}/>
                    </TouchableHighlight>
                </CardItem>

                {this.state.ellipseToggle && <CardItem style={styles.CardStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            this.downloadFriendPushed();
                        }}
                    >
                        <Text style={styles.downloadWatchlist}>
                            Download Watchlist
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.removeFriend(this.state.name)
                        }}
                    >
                        <Text style={styles.removeFriend}>
                            Remove Friend
                        </Text>
                    </TouchableOpacity>
                </CardItem>}

                <CardItem>
                    <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                           style={styles.barStyle}/>
                </CardItem>

            </Card>
        )
    }

}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        editList,
    }, dispatch)
);

const mapStateToProps = (state) => {
    const {list,user} = state;
    return {list,user}
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);

const styles = StyleSheet.create({

    CardStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameText: {
        color: '#b2d786',
        fontSize: 25,
    },
    ellipseStyle: {
        width: 66,
        height: 19,
    },
    barStyle: {
        height: '10%',
        marginBottom: '3%',
        marginLeft: '-7%',
        justifyContent: 'center',
    },
    ellipseImageStyle: {
        width: '100%',
        height: '100%'
    },
    downloadWatchlist: {
        color: '#3b84db',
        fontSize: 15,
    },
    removeFriend: {
        color: '#ff0d00',
        fontSize: 15,
    }

});