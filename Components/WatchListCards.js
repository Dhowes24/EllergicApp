import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";

import {Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon} from "native-base";

/**
 * redux Imports
 */
import {bindActionCreators} from "redux";
import {editList} from "../actions/ListActions";
import {addAllerginList, removeAllergins} from "../actions/AllerginActions";
import {connect} from "react-redux";

/**
 * GraphQL imports
 */
import gql from "graphql-tag";
import {getWatchList} from "../src/graphql/queries";
import {updateWatchList} from "../src/graphql/mutations";
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


class WatchListCards extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        ID: this.props.ID,
        name: this.props.ListName,
        list: this.props.List,
        ellipseToggle: false,
        checkToggle: !this.props.Toggle
    };

    navigateTo(page){
        this.props.navigateTo(page)
    }

    listItems(column){
        let splitList = this.state.list.split(",");
        let outputList=[];
        for (let i = column; i<splitList.length;i+=3){
            outputList.push(splitList[i] +"\n")
        }
        return outputList
    };

    editButtonPressed = () =>{
        let seperatedItems = this.state.list.split(",");
        let stateList = [];
        for (let i = 0; i < seperatedItems.length; i++) {
            let obj = {};
            obj["ListItem"] = seperatedItems[i];
            stateList.push(obj)
        }
        this.props.editList({ListName:this.state.name, List:stateList, ID:this.state.ID, Create:false});
        this.navigateTo('EditWatchListScreen');
    };

    toggleTouched = () =>{
        this.setState({checkToggle:!this.state.checkToggle});

        if(this.state.checkToggle){
            (async () => {
                await client.mutate({
                    mutation: gql(updateWatchList),
                    variables: {
                        input: {
                            id: this.state.ID,
                            Toggle: this.state.checkToggle,
                        }
                    }
                });
                let seperatedItems = this.state.list.split(",");
                this.props.addAllerginList(seperatedItems);
                console.log("on");
                console.log(this.props.allergins.allergins)
            })();

        }
        else{
            (async () => {
                await client.mutate({
                    mutation: gql(updateWatchList),
                    variables: {
                        input: {
                            id: this.state.ID,
                            Toggle: this.state.checkToggle,
                        }
                    }
                });
                this.props.removeAllergins();
                for (let i = 0; i < this.props.user.watchlists.length; i++) {
                    (async () => {
                        const result = await client.query({
                            query: gql(getWatchList),
                            variables: {
                                id: this.props.user.watchlists[i],

                            },
                            fetchPolicy: 'network-only'
                        });
                        if(result.data.getWatchList.Toggle){
                            let seperatedItems = result.data.getWatchList.list.split(",");
                            this.props.addAllerginList(seperatedItems);
                            console.log("off");
                            console.log(this.props.allergins.allergins)
                        }
                    })();
                }
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
                            this.toggleTouched()
                        }}
                        style={styles.downloadStyle}
                        underlayColor={'white'}>
                        <Image source={this.state.checkToggle ?
                            require('../assets/ToggleNegative.png')
                            : require('../assets/TogglePositive-E-llergic.png')}
                               style={styles.downloadImageStyle}/>
                    </TouchableHighlight>

                    <TouchableOpacity>
                        <Text style={styles.EditTextStyle}
                              onPress={()=>{
                                  this.editButtonPressed()
                                 }}>
                            Edit
                        </Text>
                    </TouchableOpacity>

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
        addAllerginList,
        removeAllergins,
    }, dispatch)
);
const mapStateToProps = (state) => {
    const { list,allergins,user } = state;
    return { list, allergins, user }
};

export default connect (mapStateToProps,mapDispatchToProps)(WatchListCards);

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
        width: 50,
        height: 14,
    },
    downloadStyle:{
        width:25,
        height:25
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
    downloadImageStyle:{
        width: '100%',
        height: '100%'
    },
    downloadWatchlist: {
        color: '#3b84db',
        fontSize: 15,
    },
    EditTextStyle:{
        color:'#3b84db',
        fontSize: 25
    }

});