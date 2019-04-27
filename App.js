import React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Font } from 'expo';
import {Root} from "native-base";

import {ApolloProvider} from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';



import LoginScreen from './Components/LoginScreen';
import ScannerScreen from './Components/ScannerScreen';
import ListsScreen from './Components/ListsScreen';
import AccountScreen from './Components/AccountScreen';
import FriendsScreen from './Components/FriendsScreen';
import SocialAccountsScreen from './Components/SocialAccountsScreen';
import SettingsScreen from './Components/SettingsScreen';
import DownloadFriendListScreen from "./Components/DownloadFriendListScreen";
import FriendCard from './Components/FriendCard';
import WatchListScreen from './Components/WatchListScreen';
import GroceryListsScreen from './Components/GroceryListsScreen';
import EditWatchListScreen from './Components/EditWatchlistScreen';
import EditGroceryListScreen from './Components/EditGroceryListScreen';

// import { withAuthenticator } from 'aws-amplify-react-native'


// class App extends React.Component {
//   componentDidMount() {
//     Font.loadAsync({
//       'Comfortaa-Light': require('./assets/fonts/Comfortaa-Light.ttf'),
//       'Comfortaa-Bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
//     });
//   }
//
//   render() {
//     return (
//         <Root>
//           <AppNavigator/>
//         </Root>
//     );
//   }
// }
import AWSAppSyncClient from 'aws-appsync';
import aws_config from './aws-exports';


const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: aws_config.aws_appsync_authenticationType,
    apiKey: aws_config.aws_appsync_apiKey,
  }
});

const WithProvider = () => (
    <ApolloProvider client={client}>
      <Rehydrated>
        <AppContainer />
      </Rehydrated>
    </ApolloProvider>
);

const AppNavigator = createStackNavigator({
  Home: {
    screen: LoginScreen,
  },
  ScannerScreen:{
    screen: ScannerScreen,
  },
  ListsScreen:{
    screen: ListsScreen,
  },
  AccountScreen:{
    screen: AccountScreen,
  },
  FriendsScreen:{
    screen: FriendsScreen,
  },
  SocialAccountsScreen:{
    screen:SocialAccountsScreen
  },
  SettingsScreen:{
    screen:SettingsScreen
  },
  DownloadFriendListScreen:{
    screen:DownloadFriendListScreen
  },
  FriendCard:{
    screen:FriendCard
  },
  WatchListScreen:{
    screen:WatchListScreen
  },
  GroceryListsScreen:{
    screen:GroceryListsScreen
  },
  EditWatchListScreen:{
    screen:EditWatchListScreen
  },
  EditGroceryListScreen:{
    screen:EditGroceryListScreen
  }
}, {
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);

export default WithProvider;

const HomeBackground = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});