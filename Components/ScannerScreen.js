import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    Modal
} from "react-native";

import {Camera, Permissions, BarCodeScanner} from 'expo';

/**
 * GraphQL imports
 */
import AWSAppSyncClient from "aws-appsync";
import aws_config from "../aws-exports";
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {getWatchList} from "../src/graphql/queries";


/**
 * redux Imports
 */
import {addAllerginList, removeAllergins} from "../actions/AllerginActions";
import {bindActionCreators} from "redux";
import {editList} from "../actions/ListActions";

//Nutrionix APP ID
const appID = 'e8fe8164';

//Nutritionix Key
const applicationKey = '170920103c84249a7b142300794e3058';

//Current List of Product data
let ingredientList = [];



const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: aws_config.aws_appsync_authenticationType,
        apiKey: aws_config.aws_appsync_apiKey,
    }
});


class ScannerScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        positiveModalVisible: false,
        negativeModalVisible: false,
        allerginsFound:[],

        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    setPositiveModalVisible(visible) {
        this.setState({positiveModalVisible: visible});
    }

    setNegativeModalVisible(visible) {
        this.setState({negativeModalVisible: visible});
    }

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
        //For each active list in WatchListScreen, add all non repetitive allergins to 'allerginsList'
        //
        if(this.props.user.watchlists!=null) {
            for (let i = 0; i < this.props.user.watchlists.length; i++) {
                (async () => {
                    const result = await client.query({
                        query: gql(getWatchList),
                        variables: {
                            id: this.props.user.watchlists[i],

                        },
                        fetchPolicy: 'network-only'
                    });
                    if (result.data.getWatchList.Toggle) {
                        let seperatedItems = result.data.getWatchList.list.split(",");
                        this.props.addAllerginList(seperatedItems);
                    }
                })();
            }
        }
    }

    handleBarCodeScanned = () => {
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        fetch("https://api.nutritionix.com/v1_1/item?upc=52200004265&appId=" + appID + "&appKey=" + applicationKey)
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseJson.nf_ingredient_statement);
                this.handleIngredientData(responseJson.nf_ingredient_statement);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    handleIngredientData = (data) => {
        let warning =false;
        let allerginsFound =[];
        ingredientList = data.split(',');
        let allerginsList = this.props.allergins.allergins;
        console.log(ingredientList);
        console.log(allerginsList);
        for (let i = 0; i < ingredientList.length; i++) {
            for (let a = 0; a < allerginsList.length; a++) {
                if (ingredientList[i].includes(allerginsList[a])) {
                    warning =true;
                    allerginsFound.push(allerginsList[a])
                }
            }
        }
        this.setState({allerginsFound:allerginsFound});
        if(!warning) {
            this.setPositiveModalVisible(true);
        } else{
            this.setNegativeModalVisible(true);
        }
    };



    render() {
        return (

            <ImageBackground source={require('../assets/MiddleBackground-E-llergic.png')}
                             style={{width: '100%', height: '100%'}}>

                {/*PositiveModal*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.positiveModalVisible}
                    onRequestClose={() => {this.setPositiveModalVisible(false)
                    }}>
                    <View style={styles.positiveModal}>

                        <Image source={require('../assets/PositiveModal-E-llergic.png')}
                               style={styles.modalCheck}/>
                        <TouchableOpacity
                            onPress={() => {
                                this.setPositiveModalVisible(!this.state.positiveModalVisible);
                            }}>
                            <Text style={styles.positiveModalText}>
                                Make sure all correct Watchlists are selected
                            </Text>
                        </TouchableOpacity>
                        <Image source={require('../assets/DarkSinnyBar-E-llergic.png')}
                               style={styles.subBar}/>
                        <Image source={require('../assets/AllClear-E-llergic.png')}
                               style={styles.allClear}/>
                    </View>
                </Modal>

                {/*NegativeModal*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.negativeModalVisible}
                    onRequestClose={() => {this.setNegativeModalVisible(false)
                    }}>
                    <View style={styles.negativeModal}>

                        <Image source={require('../assets/NegativeModal-E-llergic.png')}
                               style={styles.modalEx}/>
                        <TouchableOpacity
                            onPress={() => {
                                this.setNegativeModalVisible(!this.state.negativeModalVisible);
                            }}>
                            <Text style={styles.negativeModalText}>
                                This Contains ...
                            </Text>
                            <Text style={styles.negativeModalText}>
                                {this.state.allerginsFound}
                            </Text>
                        </TouchableOpacity>
                        <Image source={require('../assets/WatchOut-E-llergic.png')}
                               style={styles.notClear}/>
                    </View>
                </Modal>

                {/*Header */}
                <View style={styles.headerStyle}>
                    <TouchableOpacity style={styles.leftNavigationArrow}
                                      onPress={() => {
                                          this.props.navigation.navigate('ListsScreen')
                                      }}
                    >
                        <Image source={require('../assets/BackArrow-E-llergic.png')} // List Button
                               style={styles.arrowStyle}/>
                        <Text style={styles.navigationText}> Lists</Text>
                    </TouchableOpacity>

                    <Image source={require('../assets/MainPageLogo-E-llergic.png')} //Home Logo
                           style={styles.LogoStyle}/>

                    <TouchableOpacity style={styles.rightNavigationArrow}
                                      onPress={() => {
                                          this.props.navigation.navigate('AccountScreen')
                                      }}
                    >
                        <Text style={styles.navigationText}> Account</Text>
                        <Image source={require('../assets/RightArrow-E-llergic.png')} //Account Button
                               style={styles.arrowStyle}/>
                    </TouchableOpacity>
                </View>

                {/*Preview Body*/}
                <View style={styles.containerStyle}>
                    {this.state.hasCameraPermission &&
                    <BarCodeScanner
                        onBarCodeScanned={this.handleBarCodeScanned}
                        style={styles.CameraStyle}
                    />}
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.handleBarCodeScanned()
                    }}>
                    <Image source={require('../assets/MainPageLogo-E-llergic.png')} //Home Logo
                           style={styles.LogoStyle}/>
                </TouchableOpacity>

            </ImageBackground>
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
    const {user,allergins} = state;
    return {user,allergins}
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen);

const styles = StyleSheet.create({
    //Header Styles

    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftNavigationArrow: {
        flexDirection: 'row',
        marginTop: '15%',
        marginLeft: '2%',
    },
    rightNavigationArrow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '15%',
        marginRight: '12%',
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
        marginLeft: '10%',
        justifyContent: 'center',
        width: '17%',
        height: '100%'
    },

    //Body Styles
    containerStyle: {
        backgroundColor: 'white',
        width: '100%',
        height: '68%',
        top: '8%'
    },
    CameraStyle: {
        flex: 1,
    },

    //Positive Modal Style
    positiveModal: {
        top: 250,
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
        height: 320,
        backgroundColor: 'white',

        borderColor: '#88c540',
        borderWidth: 8,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    modalCheck: {
        marginTop: '8%',
        alignItems: 'center',
        alignSelf: 'center',
        width: 180,
        height: 160
    },
    subBar:{
        marginLeft:'3%',
        marginRight:'3%',
        marginTop:15,
        width:'94%',
        height:6,
    },
    allClear:{
        top:12,
        width:240,
        height: 60
    },
    positiveModalText:{
        top:6,
        fontSize: 12
    },

    //negative Modal Style
    negativeModal: {
        top: 250,
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
        height: 370,
        backgroundColor: 'white',

        borderColor: '#ff0d00',
        borderWidth: 8,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    modalEx: {
        marginTop: '8%',
        alignItems: 'center',
        alignSelf: 'center',
        width: 180,
        height: 180
    },
    notClear:{
        top:30,
        width:240,
        height: 45
    },
    negativeModalText:{
        top:6,
        fontSize: 12
    }


});