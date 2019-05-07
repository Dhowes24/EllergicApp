import {combineReducers} from 'redux';

const USER_STATE = {
    ID: "",
    watchlists: [],
    grocerylists: [],
};

const LIST_STATE = {
    ListName: "",
    listItems: [],
    ID:"",
    Create: false,
};

const userReducer = (state = USER_STATE, action) => {

    let {
        ID,
        watchlists,
        grocerylists
    } = state;

    switch (action.type) {
        case 'ADD_WATCHLIST':

            const newWatchlist = action.payload.watchlists;

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
        listItems,
        ID,
        Create
    } = state;

    switch (action.type) {
        case 'EDIT_LIST':
            ListName = action.payload.ListName;
            listItems = action.payload.List;
            ID = action.payload.ID;
            Create = action.payload.Create;


            let newState = {
                ListName,
                listItems,
                ID,
                Create
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