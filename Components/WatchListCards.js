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

class WatchListCards extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        name: this.props.ListName,

        ellipseToggle: false,
        checkToggle: false
    };

    removeFriend(Name) {
        this.props.removeFunc(Name)
    };

    navigateTo(page){
        this.props.navigateTo(page)
    }

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
                            this.setState({checkToggle: !this.state.checkToggle})
                        }}
                        style={styles.downloadStyle}
                        underlayColor={'white'}>
                        <Image source={this.state.checkToggle ?
                            require('../assets/DownloadedButton-E-llergic.png')
                            : require('../assets/DownloadButton-E-llergic.png')}
                               style={styles.downloadImageStyle}/>
                    </TouchableHighlight>

                    <TouchableOpacity>
                        <Text style={styles.EditTextStyle}
                              onPress={()=>{this.navigateTo('EditWatchListScreen')}}>
                            Edit
                        </Text>
                    </TouchableOpacity>

                </CardItem>

                {this.state.ellipseToggle && <CardItem style={styles.CardStyle}>
                    <Text>
                        List
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

export default WatchListCards;

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