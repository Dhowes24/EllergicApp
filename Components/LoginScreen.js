import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

import AWSAppSyncClient from "aws-appsync";
import aws_config from "../aws-exports";
import gql from "graphql-tag";

import { connect } from 'react-redux';

import {getUser} from "../src/graphql/queries";
import {createUser} from "../src/graphql/mutations";

import {updateUser} from "../actions/UserActions";
import {bindActionCreators} from "redux";

const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: aws_config.aws_appsync_authenticationType,
        apiKey: aws_config.aws_appsync_apiKey,
    }
});


class LoginScreen extends React.Component {

    state = {
        fontLoaded: false,
        Login: true,
        Password: '',
        ConfirmPassword: '',
        Username: '',
        modalVisible: false,
    };

    static navigationOptions = {
        header: null
    };


    async loginOrSignUp() {
        if(this.state.Username.length==0 || this.state.Password.length==0){
            //TODO set a state which switches a note
        }

        else if(!this.state.Login&& this.state.ConfirmPassword.length==0){
            //TODO set note
        }

        else {
            await client.hydrated();

            try {


                (async () => {

                    let result = await client.query({
                        query: gql(getUser),
                        variables: {
                            username: this.state.Username
                        },
                        fetchPolicy: 'network-only'
                    });
                    console.log(result);

                    if (this.state.Login) {
                        console.log(result.data.getUser);
                        if (this.state.Password == result.data.getUser.password) {
                            console.log(result.data.getUser.password);
                            this.props.updateUser(result.data.getUser);
                            this.props.navigation.navigate('ScannerScreen')
                        }
                        else{
                            //TODO incorrect password or username
                        }

                    } else {
                        if(result.data.getUser==null) {
                            if (this.state.Password == this.state.ConfirmPassword) {
                                (async () => {
                                    const result = await client.mutate({
                                        mutation: gql(createUser),
                                        variables: {
                                            input: {
                                                username: this.state.Username,
                                                password: this.state.Password,
                                            }
                                        }
                                    });
                                    console.log(result);
                                })();
                                this.props.navigation.navigate('ScannerScreen')
                            } else {
                                //TODO passwords must be the same note
                            }
                        } else{
                            //TODO username in use note
                        }
                    }
                })();
            } catch (err) {
                console.log('error: ', err)
            }
        }

    };


    render(){
        return(
        <ImageBackground source={require('../assets/MiddleBackground-E-llergic.png')}
                         style={{width: '100%', height: '100%'}}>
            <Image
                source={require('../assets/TitleLogo-E-llergic.png')}
                style={styles.Title}>
            </Image>
            <View>
                <Text style={styles.LoginSignUpFont}>
                    {this.state.Login ? 'Login' : 'SignUp'}
                </Text>
            </View>

            {/*Sign In*/}

            {this.state.Login && <View style={styles.contentLogin}>
                <TextInput placeholderTextColor={'darkgrey'}
                           placeholder="Username/Email"
                           onChangeText={(Username) => this.setState({Username:Username})}
                           style={styles.textInputStyle}/>
                <Image
                source={require('../assets/greyLoginBar-E-llergic.png')}
                style={styles.greyBarStyle}/>

                <TextInput placeholderTextColor={'darkgrey'}
                           placeholder="Password"
                           onChangeText={(Password) => this.setState({Password:Password})}
                           secureTextEntry={true}
                           style={styles.textInputStyle}/>

                <Image
                    source={require('../assets/greyLoginBar-E-llergic.png')}
                    style={styles.greyBarStyle}/>

                <TouchableOpacity
                    onPress={()=>{this.loginOrSignUp()}}
                    style={styles.buttonBorderLogin}>

                <View>
                        <Text style={styles.clickableText}>
                            {this.state.Login ? 'Login' : 'SignUp'}
                        </Text>
                </View>
                </TouchableOpacity>

            </View>}

            {/*Sign Up*/}
            {!this.state.Login && <View style={styles.contentSignUp}>
                <TextInput placeholderTextColor={'darkgrey'}
                           placeholder="Username"
                           onChangeText={(Username) => this.setState({Username:Username})}
                           style={styles.textInputStyle}/>
                <Image
                    source={require('../assets/greyLoginBar-E-llergic.png')}
                    style={styles.greyBarStyle}/>

                <TextInput placeholderTextColor={'darkgrey'}
                           placeholder="Password"
                           onChangeText={(Password) => this.setState({Password:Password})}
                           secureTextEntry={true}
                           style={styles.textInputStyle}/>

                <Image
                    source={require('../assets/greyLoginBar-E-llergic.png')}
                    style={styles.greyBarStyle}/>

                <TextInput placeholderTextColor={'darkgrey'}
                           placeholder="Confirm Password"
                           onChangeText={(confirmPassword) => this.setState({ConfirmPassword:confirmPassword})}
                           secureTextEntry={true}
                           style={styles.textInputStyle}/>

                <Image
                    source={require('../assets/greyLoginBar-E-llergic.png')}
                    style={styles.greyBarStyle}/>
                <TouchableOpacity
                    onPress={()=>{this.loginOrSignUp()}}
                    style={styles.buttonBorderLogin}>

                    <View>
                        <Text style={styles.clickableText}>
                            {this.state.Login ? 'Login' : 'SignUp'}
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>}

            <View style={styles.container}>
                <Button
                    title={this.state.Login ? "SignUp?" : "Already have an account?"}
                    onPress={()=>
                        this.setState({Login:!this.state.Login})}/>
            </View>

        </ImageBackground>)

    }

}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUser,
    }, dispatch)
);
const mapStateToProps = (state) => {
    const { user } = state;
    return { user }
};

export default connect (mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles= StyleSheet.create({
    Title:{
        alignSelf: 'center',
        marginTop: '30%',
        width: 254,
        height: 66
    },
    LoginSignUpView:{
        alignSelf: 'center',
        marginTop: '15%',
        width: '40%',
        height: '10%',
    },
    LoginSignUpFont:{
        marginTop: '10%',
        alignSelf:'center',
        flexDirection: 'row',
        color: 'white',
        fontSize:40,
    },
    contentLogin:{
        alignSelf:'center',
        marginTop: '5%',
        width: 280,
        height: 210,
        backgroundColor:'white',
        borderColor: '#88c540',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 2
    },
    contentSignUp:{
        alignSelf:'center',
        marginTop: '5%',
        width: 300,
        height: 275,
        backgroundColor:'white',
        borderColor: '#88c540',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 2
    },
    textInputStyle: {
        fontSize: 26,
        marginTop:'7%',
        width:'90%',
        textAlign: "center"
    },
    greyBarStyle:{
        alignSelf:'center',
        width:'90%',
        marginTop:'1%'
    },
    buttonBorderLogin: {
        borderColor: '#88c540',
        backgroundColor:'#adea57',
        borderWidth: 3,
        width: 160,
        height: 50,
        alignSelf:'center',
        marginTop: '10%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    clickableText: {
        marginTop:'5%',
        fontSize: 20,
        alignSelf:'center',
        color:'white'
    },

});