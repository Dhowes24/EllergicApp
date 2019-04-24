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

class GroceryListCards extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        name: this.props.ListName,
        list:[{listItem: 'pepper'}, {listItem: 'oranges'}, {listItem: 'Pineapple'}, {listItem: 'Apple'}],
        //TODO
        //Have the onComponentDidMount get the list data from the database
        
        ellipseToggle: false,
    };

    listItems(column){
      let outputList=[];
      for (let i = column; i<this.state.list.length;i+=3){
          outputList.push(this.state.list[i].listItem +"\n")
      }
      return outputList
    };
    
    toEditScreen(){
        this.props.toEditNavigation(this.state.list)
    }

    render() {

        return (
            <Card transparent={true}>

                <CardItem style={styles.CardStyle}>
                    <View style={styles.textBoxStyle}>
                        <Text style={styles.nameText}
                              adjustsFontSizeToFit={true}>
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


                    <TouchableOpacity>
                        <Text style={styles.EditTextStyle}
                              onPress={()=>{this.toEditScreen()}}>
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

export default GroceryListCards;

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
    EditTextStyle: {
        color: '#3b84db',
        fontSize: 25
    }

});