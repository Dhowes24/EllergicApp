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

class DownloadListsCard extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        name: this.props.ListName,

        ellipseToggle: false,
        downloadToggle: false
    };

    removeFriend(Name) {
        this.props.removeFunc(Name)
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
                            this.setState({downloadToggle: !this.state.downloadToggle})
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
                        Ingredients
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

export default DownloadListsCard;

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
    removeFriend: {
        color: '#ff0d00',
        fontSize: 15,
    }

});