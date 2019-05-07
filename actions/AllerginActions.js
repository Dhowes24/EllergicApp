export const addAllerginList = WatchlistID => (
    {
        type: 'ADD_WATCHLIST_ALLERGINS',
        payload: WatchlistID,
    }
);
export const removeAllergins = WatchlistID => (
    {
        type: 'REMOVE_WATCHLIST_ALLERGINS',
        payload: WatchlistID,
    }
);