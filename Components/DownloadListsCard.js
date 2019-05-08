import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import {Card, CardItem} from "native-base";

/**
 * Redux Imports
 */
import {bindActionCreators} from "redux";
import {editList} from "../actions/ListActions";
import {reduxUpdateUser} from "../actions/UserActions";
import {addWatchlist} from "../actions/UserActions";
import {connect} from "react-redux";

/**
 * GraphQL Imports
 */
import gql from "graphql-tag";
import {createWatchList, updateUser} from "../src/graphql/mutations";
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

class DownloadListsCard extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        name: this.props.ListName,
        list: this.props.List,

        ellipseToggle: false,
        downloadToggle: false
    };

    removeFriend(Name) {
        this.props.removeFunc(Name)
    };

    listItems(column) {
        let splitList = this.state.list.split(",");
        let outputList = [];
        for (let i = column; i < splitList.length; i += 3) {
            outputList.push(splitList[i] + "\n")
        }
        return outputList
    };

    downloadList = () => {
        if (!this.state.downloadToggle) {
            this.setState({downloadToggle: true});


        (async () => {
            const newWatchlist = await client.mutate({
                mutation: gql(createWatchList),
                variables: {
                    input: {
                        name: this.props.ListName,
                        Toggle: false,
                        list: this.props.List
                    }
                }
            });
            this.props.addWatchlist({
                watchlists: newWatchlist.data.createWatchList.id
            });
            console.log(this.props.user);

            (async () => {
                await client.mutate({
                    mutation: gql(updateUser),
                    variables: {
                        input: {
                            username: this.props.user.ID,
                            watchlists: this.props.user.watchlists,

                        }
                    }
                });

            })();
        })();
    }
    };

    render() {

        return (
            <Card transparent={true}>

                <CardItem style={styles.CardStyle}>
                    <View style={styles.textBoxStyle}>
                        <Text adjustsFontSizeToFit={true}
                              style={styles.nameText}>
                            {this.state.name}
                        </Text>
                    </View>

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

                    <TouchableHighlight
                        onPress={() => {
                            this.downloadList();
                        }}
                        style={styles.downloadStyle}
                        underlayColor={'white'}>
                        <Image source={this.state.downloadToggle ?
                            require('../assets/DownloadedButton-E-llergic.png')
                            : require('../assets/DownloadButton-E-llergic.png')}
                               style={styles.downloadImageStyle}/>
                    </TouchableHighlight>

                </CardItem>

                {this.state.ellipseToggle && <CardItem style={styles.CardStyle}>
                    <Text>
                        {this.listItems(0)}
                    </Text>
                    <Text>
                        {this.listItems(1)}
                    </Text>
                    <Text>
                        {this.listItems(2)}
                    </Text>
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
        reduxUpdateUser,
        addWatchlist
    }, dispatch)
);

const mapStateToProps = (state) => {
    const {list, user} = state;
    return {list, user}
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadListsCard);

const styles = StyleSheet.create({

    CardStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameText: {
        color: '#b2d786',
        fontSize: 25,
        flex: 3,
    },
    textBoxStyle: {
        width: 150,
        height: 30,
    },
    ellipseStyle: {
        width: 66,
        height: 19,
    },
    downloadStyle: {
        width: 25,
        height: 25
    },
    barStyle: {
        height: '30%',
        width: '99%',
        marginBottom: '3%',
        justifyContent: 'center',
    },
    ellipseImageStyle: {
        width: '100%',
        height: '100%'
    },
    downloadImageStyle: {
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