// eslint-disable
// this is an auto generated file. This will be overwritten

export const getGroceryList = `query GetGroceryList($id: ID!) {
  getGroceryList(id: $id) {
    id
    name
    list
  }
}
`;
export const listGroceryLists = `query ListGroceryLists(
  $filter: TableGroceryListFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroceryLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      list
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($username: String!) {
  getUser(username: $username) {
    username
    password
    watchlists
    grocerylists
    friendslist
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: TableUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      username
      password
      watchlists
      grocerylists
      friendslist
    }
    nextToken
  }
}
`;
export const getWatchList = `query GetWatchList($id: ID!) {
  getWatchList(id: $id) {
    id
    name
    Toggle
    list
  }
}
`;
export const listWatchLists = `query ListWatchLists(
  $filter: TableWatchListFilterInput
  $limit: Int
  $nextToken: String
) {
  listWatchLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      Toggle
      list
    }
    nextToken
  }
}
`;
