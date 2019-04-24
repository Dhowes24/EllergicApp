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
import GroceryListCards from './GroceryListCards'


class GroceryListsScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        testListData: [{ListName: 'Thanksgiving'}, {ListName: 'Feb 24th'}]
        //TODO
        //Have componentDidMount() call for all grocery list data in the database
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View>
                <ActivityIndicator animating size={"large"}/>
            </View>
        )
    };

    toEditNavigation = (props) =>{
        this.props.navigation.navigate('EditGroceryListScreen', {items:props})
    };

    async componentDidMount() {

    }

    render() {
        return (
            <ImageBackground source={require('../assets/ListsBackround-E-llergic.png')}
                             style={{width: '100%', height: '100%'}}>

                {/* Header */}
                <View style={styles.headerStyle}>

                    <Image source={require('../assets/GroceryListLogo-E-llergic.png')}
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
                        data={this.state.testListData}
                        renderItem={({item}) => (
                            <GroceryListCards ListName={item.ListName}
                                              state={this.state}
                                              toEditNavigation={this.toEditNavigation.bind(this)}/>
                        )}
                        keyExtractor={item => item.ListName}
                        ListFooterComponent={this.renderFooter()}>

                    </FlatList>
                </View>

                {/* Body2 */}
                <View style={styles.createContainerStyle}>
                    <TouchableOpacity style={styles.bottomButtonStyle}
                                      onPress={()=>{this.props.navigation.navigate('EditGroceryListScreen')}}
                    >
                        <Text style={styles.ButtonTextStyle}>
                            Create Grocery List
                        </Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        )
    }
}


export default GroceryListsScreen;


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
        marginTop: '7%',
        justifyContent: 'center',
        width: 69,
        height: 65,
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
        justifyContent:'center',
        height: '15%',
        width: '95%',
        backgroundColor: 'white',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '3%',
        marginTop:'10%'
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
        width:'60%',
        height:'70%',
        backgroundColor: '#88c540',
        justifyContent:'center',
        marginLeft:'5%',
        marginRight:'5%',
        marginTop: '7%',
        marginBottom:'5%'
    },
    ButtonTextStyle:{
        alignSelf: 'center',
        fontSize: 22,
        color:'white',
        marginBottom:'20%'
    }
});