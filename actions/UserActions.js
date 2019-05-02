export const addWatchlist = WatchlistID => (
    {
        type: 'ADD_WATCHLIST',
        payload: WatchlistID,
    }
);
export const removeWatchlist = WatchlistID => (
    {
        type: 'REMOVE_WATCHLIST',
        payload: WatchlistID,
    }
);
export const updateUser = User => (
    {
        type: 'UPDATE_USER',
        payload: User,
    }
);
