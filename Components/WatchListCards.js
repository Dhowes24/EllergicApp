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
import {bindActionCreators} from "redux";
import {editList} from "../actions/ListActions";
import {connect} from "react-redux";

class WatchListCards extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        name: this.props.ListName,
        list: this.props.List,
        ellipseToggle: false,
        checkToggle: false
    };

    navigateTo(page){

        this.props.navigateTo(page)
    }

    listItems(column){
        let splitList = this.state.list.split(",");
        let outputList=[];
        for (let i = column; i<splitList.length;i+=3){
            console.log(i);
            outputList.push(splitList[i] +"\n")
        }
        return outputList
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
                              onPress={()=>{
                                  this.props.editList({ListName:this.state.name , List:this.state.list});
                                  this.navigateTo('EditWatchListScreen');}}>
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
        editList
    }, dispatch)
);
const mapStateToProps = (state) => {
    const { list } = state;
    return { list }
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