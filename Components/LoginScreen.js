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

// import { compose, graphql } from 'react-apollo'
import  getUser from "./queries/getUser";


class LoginScreen extends Component {

    state = {
        fontLoaded: false,
        Login: true,
        Password: '',
        ConfirmPassword: '',
        Email: '',
        modalVisible: false,
    };

    static navigationOptions = {
        header: null
    };


    async login() {
        this.props.navigation.navigate('ScannerScreen')
        // try {
        //     const response = await Auth.signIn(this.state.User, this.state.Password);
        //     this.props.navigation.navigate('ScannerScreen')
        // } catch (err) {
        //     console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        // }
    };

    // handleSignUp = () => {
    //     // alert(JSON.stringify(this.state));
    //     const { Email, Password, ConfirmPassword } = this.state;
    //     // Make sure passwords match
    //     if (Password === ConfirmPassword) {
    //         Auth.signUp({
    //             username: Email,
    //             password: Password,
    //             attributes: { Email },
    //         })
    //         // On success, show Confirmation Code Modal
    //             .then(() => this.setState({ modalVisible: true }))
    //             // On failure, display error in console
    //             .catch(err => console.log(err));
    //     } else {
    //         alert('Passwords do not match.');
    //     }
    // };

    // handleSignUp = () => {
    //     const email = this.state.Email;
    //
    //     Auth.signUp({
    //         username:"d.howes242@gmail.com",
    //         password:'Password1!',
    //         attributes:{ email},
    //     }).catch(err => console.log(err));
    //     this.handleConfirmationCode()
    //
    // };
    //
    // handleConfirmationCode = () => {
    //     const { email, confirmationCode } = this.state;
    //     Auth.confirmSignUp(email, confirmationCode, {})
    //         .then(() => {
    //             this.setState({ modalVisible: false });
    //             this.props.navigation.navigate('ScannerScreen')
    //         })
    //         .catch(err => console.log(err));
    // };

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
                           onChangeText={(User) => this.setState({User:User})}
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
                    onPress={()=>{this.state.Login ? this.login() : this.signUp()}}
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
                           placeholder="Enter Phone Number"
                           onChangeText={(Phone) => this.setState({Phone:Phone})}
                           style={styles.textInputStyle}/>
                <Image
                    source={require('../assets/greyLoginBar-E-llergic.png')}
                    style={styles.greyBarStyle}/>

                <TextInput placeholderTextColor={'darkgrey'}
                           placeholder="Enter Password"
                           onChangeText={(Password) => this.setState({Password:Password})}
                           secureTextEntry={true}
                           style={styles.textInputStyle}/>

                <Image
                    source={require('../assets/greyLoginBar-E-llergic.png')}
                    style={styles.greyBarStyle}/>

                <TextInput placeholderTextColor={'darkgrey'}
                           placeholder="Enter Username"
                           onChangeText={(User) => this.setState({User:User})}
                           secureTextEntry={true}
                           style={styles.textInputStyle}/>

                <Image
                    source={require('../assets/greyLoginBar-E-llergic.png')}
                    style={styles.greyBarStyle}/>
                <TouchableOpacity
                    onPress={()=>{this.state.Login ? this.login() : this.handleSignUp()}}
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

export default LoginScreen;

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