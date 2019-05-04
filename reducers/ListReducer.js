import {combineReducers} from 'redux';

const INITIAL_STATE = {
    ListName: "",
    listItems: [],
};

const ListReducer = (state = INITIAL_STATE, action) => {

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
    list: ListReducer,
});