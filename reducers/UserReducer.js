import {combineReducers} from 'redux';

const INITIAL_STATE = {
    ID: "TestID",
    watchlists: [],
    grocerylists: [],
};

const userReducer = (state = INITIAL_STATE, action) => {

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

export default combineReducers({
    user: userReducer,
});