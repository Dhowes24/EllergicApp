import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {createStackNavigator, createAppContainer} from 'react-navigation';
// import {Font} from 'expo';
// import {Root} from "native-base";

// /**
//  * redux imports
//  */
// import {Provider} from 'react-redux';
// import {createStore} from 'redux';
// import userReducer from "./reducers/UserReducer"
// import {ApolloProvider} from 'react-apollo';

// /**
//  * Screen Imports
//  */
// import LoginScreen from './Components/LoginScreen';
// import ScannerScreen from './Components/ScannerScreen';
// import ListsScreen from './Components/ListsScreen';
// import AccountScreen from './Components/AccountScreen';
// import FriendsScreen from './Components/FriendsScreen';
// import SocialAccountsScreen from './Components/SocialAccountsScreen';
// import SettingsScreen from './Components/SettingsScreen';
// import DownloadFriendListScreen from "./Components/DownloadFriendListScreen";
// import FriendCard from './Components/FriendCard';
// import WatchListScreen from './Components/WatchListScreen';
// import WatchListCards from './Components/WatchListCards';
// import GroceryListsScreen from './Components/GroceryListsScreen';
// import EditWatchListScreen from './Components/EditWatchlistScreen';
// import EditGroceryListScreen from './Components/EditGroceryListScreen';

// /**
//  * Appsync Imports
//  */
// import AWSAppSyncClient from 'aws-appsync';
// import aws_config from './aws-exports';
// import {Rehydrated} from 'aws-appsync-react';


// const client = new AWSAppSyncClient({
//     url: aws_config.aws_appsync_graphqlEndpoint,
//     region: aws_config.aws_appsync_region,
//     auth: {
//         type: aws_config.aws_appsync_authenticationType,
//         apiKey: aws_config.aws_appsync_apiKey,
//     }
// });

// const store = createStore(userReducer);


// export default class App extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     render() {
//         return (
//             <ApolloProvider client={client}>
//                 <Provider store={store}>
//                     <AppContainer/>
//                 </Provider>
//             </ApolloProvider>
//         )
//     }
// }

// const AppNavigator = createStackNavigator({
//     Home: {
//         screen: LoginScreen,
//     },
//     ScannerScreen: {
//         screen: ScannerScreen,
//     },
//     ListsScreen: {
//         screen: ListsScreen,
//     },
//     AccountScreen: {
//         screen: AccountScreen,
//     },
//     FriendsScreen: {
//         screen: FriendsScreen,
//     },
//     SocialAccountsScreen: {
//         screen: SocialAccountsScreen
//     },
//     SettingsScreen: {
//         screen: SettingsScreen
//     },
//     DownloadFriendListScreen: {
//         screen: DownloadFriendListScreen
//     },
//     FriendCard: {
//         screen: FriendCard
//     },
//     WatchListCards:{
//       screen: WatchListCards
//     },
//     WatchListScreen: {
//         screen: WatchListScreen
//     },
//     GroceryListsScreen: {
//         screen: GroceryListsScreen
//     },
//     EditWatchListScreen: {
//         screen: EditWatchListScreen
//     },
//     EditGroceryListScreen: {
//         screen: EditGroceryListScreen
//     }
// }, {
//     initialRouteName: 'Home',
// });

// const AppContainer = createAppContainer(AppNavigator);


// const HomeBackground = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });