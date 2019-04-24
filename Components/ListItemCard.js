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

class ListItemCard extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        name: this.props.listItem,
    };

    render() {

        return (
            <Card transparent={true}>

                <CardItem style={styles.CardStyle}>
                    <Text style={styles.nameText}>
                        {this.state.name}
                    </Text>
                    {/*<TouchableHighlight>*/}
                        {/*/!*Make a swipe delete*!/*/}
                    {/*</TouchableHighlight>*/}
                </CardItem>


            </Card>
        )
    }

}

export default ListItemCard;

const styles = StyleSheet.create({

    CardStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameText: {
        color: 'black',
        fontSize: 18,
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