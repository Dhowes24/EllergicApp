// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateGroceryList = `subscription OnCreateGroceryList($id: ID, $name: String, $list: String) {
  onCreateGroceryList(id: $id, name: $name, list: $list) {
    id
    name
    list
  }
}
`;
export const onUpdateGroceryList = `subscription OnUpdateGroceryList($id: ID, $name: String, $list: String) {
  onUpdateGroceryList(id: $id, name: $name, list: $list) {
    id
    name
    list
  }
}
`;
export const onDeleteGroceryList = `subscription OnDeleteGroceryList($id: ID, $name: String, $list: String) {
  onDeleteGroceryList(id: $id, name: $name, list: $list) {
    id
    name
    list
  }
}
`;
export const onCreateUser = `subscription OnCreateUser(
  $username: String
  $password: String
  $watchlists: [String]
  $grocerylists: [String]
) {
  onCreateUser(
    username: $username
    password: $password
    watchlists: $watchlists
    grocerylists: $grocerylists
  ) {
    username
    password
    watchlists
    grocerylists
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser(
  $username: String
  $password: String
  $watchlists: [String]
  $grocerylists: [String]
) {
  onUpdateUser(
    username: $username
    password: $password
    watchlists: $watchlists
    grocerylists: $grocerylists
  ) {
    username
    password
    watchlists
    grocerylists
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser(
  $username: String
  $password: String
  $watchlists: [String]
  $grocerylists: [String]
) {
  onDeleteUser(
    username: $username
    password: $password
    watchlists: $watchlists
    grocerylists: $grocerylists
  ) {
    username
    password
    watchlists
    grocerylists
  }
}
`;
export const onCreateWatchList = `subscription OnCreateWatchList(
  $id: ID
  $name: String
  $Toggle: Boolean
  $list: String
) {
  onCreateWatchList(id: $id, name: $name, Toggle: $Toggle, list: $list) {
    id
    name
    Toggle
    list
  }
}
`;
export const onUpdateWatchList = `subscription OnUpdateWatchList(
  $id: ID
  $name: String
  $Toggle: Boolean
  $list: String
) {
  onUpdateWatchList(id: $id, name: $name, Toggle: $Toggle, list: $list) {
    id
    name
    Toggle
    list
  }
}
`;
export const onDeleteWatchList = `subscription OnDeleteWatchList(
  $id: ID
  $name: String
  $Toggle: Boolean
  $list: String
) {
  onDeleteWatchList(id: $id, name: $name, Toggle: $Toggle, list: $list) {
    id
    name
    Toggle
    list
  }
}
`;
