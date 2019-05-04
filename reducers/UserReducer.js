import {combineReducers} from 'redux';

const USER_STATE = {
    ID: "TestID",
    watchlists: [],
    grocerylists: [],
};

const LIST_STATE = {
    ListName: "",
    listItems: [],
};

const userReducer = (state = USER_STATE, action) => {

    let {
        ID,
        watchlists,
        grocerylists
    } = state;

    switch (action.type) {
        case 'ADD_WATCHLIST':

            const newWatchlist = action.payload;

            watchlists.push(newWatchlist);

            let newState = {
                ID,
                watchlists,
                grocerylists
            };
            return newState;
        case 'REMOVE_WATCHLIST':

            const watchlistToDelete = action.payload;

            watchlists.splice(watchlists.findIndex(watchlistToDelete), 1);

            newState = {
                ID,
                watchlists,
                grocerylists
            };
            return newState;
        case "UPDATE_USER":

            ID = action.payload.username;
            watchlists = action.payload.watchlists;
            grocerylists = action.payload.grocerylists;

            newState = {
                ID,
                watchlists,
                grocerylists
            };
            return newState;
        default:
            return state;
    }
};

const ListReducer = (state = LIST_STATE, action) => {

    let {
        ListName,
        listItems
    } = state;

    switch (action.type) {
        case 'EDIT_LIST':
            ListName = action.payload.ListName;
            listItems = action.payload.List;

            let newState = {
                ListName,
                listItems
            };
            return newState;

        default:
            return state;
    }
};

export default combineReducers({
    user: userReducer,
    list:ListReducer
});