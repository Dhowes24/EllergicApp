// eslint-disable
// this is an auto generated file. This will be overwritten

export const createGroceryList = `mutation CreateGroceryList($input: CreateGroceryListInput!) {
  createGroceryList(input: $input) {
    id
    name
    list
  }
}
`;
export const updateGroceryList = `mutation UpdateGroceryList($input: UpdateGroceryListInput!) {
  updateGroceryList(input: $input) {
    id
    name
    list
  }
}
`;
export const deleteGroceryList = `mutation DeleteGroceryList($input: DeleteGroceryListInput!) {
  deleteGroceryList(input: $input) {
    id
    name
    list
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    username
    password
    watchlists
    grocerylists
    friendslist
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    username
    password
    watchlists
    grocerylists
    friendslist
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    username
    password
    watchlists
    grocerylists
    friendslist
  }
}
`;
export const createWatchList = `mutation CreateWatchList($input: CreateWatchListInput!) {
  createWatchList(input: $input) {
    id
    name
    Toggle
    list
  }
}
`;
export const updateWatchList = `mutation UpdateWatchList($input: UpdateWatchListInput!) {
  updateWatchList(input: $input) {
    id
    name
    Toggle
    list
  }
}
`;
export const deleteWatchList = `mutation DeleteWatchList($input: DeleteWatchListInput!) {
  deleteWatchList(input: $input) {
    id
    name
    Toggle
    list
  }
}
`;
