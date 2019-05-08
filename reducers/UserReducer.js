import {combineReducers} from 'redux';

const USER_STATE = {
    ID: "",
    watchlists: [],
    grocerylists: [],
    friendslist: [],
};

const LIST_STATE = {
    ListName: "",
    listItems: [],
    ID: "",
    Create: false,
};

const WATCH_FOR_STATE = {
    allergins: []
};

const userReducer = (state = USER_STATE, action) => {

    let {
        ID,
        watchlists,
        grocerylists,
        friendslist
    } = state;

    switch (action.type) {
        case 'ADD_WATCHLIST':

            const newWatchlist = action.payload.watchlists;
            alert(newWatchlist);

            watchlists.push(newWatchlist);

            let newState = {
                ID,
                watchlists,
                grocerylists,
                friendslist
            };
            return newState;
        case 'REMOVE_WATCHLIST':

            const watchlistToDelete = action.payload;

            watchlists.splice(watchlists.findIndex(watchlistToDelete), 1);

            newState = {
                ID,
                watchlists,
                grocerylists,
                friendslist
            };
            return newState;
        case "UPDATE_USER":

            ID = action.payload.username;
            watchlists = action.payload.watchlists;
            grocerylists = action.payload.grocerylists;
            friendslist = action.payload.friendslist;

            newState = {
                ID,
                watchlists,
                grocerylists,
                friendslist
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

const allerginReducer = (state = WATCH_FOR_STATE, action) => {
    let {allergins} = state;

    switch (action.type) {
        case 'ADD_WATCHLIST_ALLERGINS':
            let newList = action.payload;
            for (let i = 0; i < newList.length; i++) {
                if(!allergins.includes(newList[i])){
                    allergins.push(newList[i])
                }
            }
            let newState ={allergins};

            return newState;

        case 'REMOVE_WATCHLIST_ALLERGINS':
             newList =[];
             allergins = newList;

             newState = {allergins};

             return newState;

        default:
            return state;
    }

};

export default combineReducers({
    user: userReducer,
    list: ListReducer,
    allergins: allerginReducer
});