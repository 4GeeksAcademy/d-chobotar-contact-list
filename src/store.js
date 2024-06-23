export const initialStore = () => {
  return {
    username: null,
    contacts: [
      {  name: "John Doe", phone: "123-456-7890", email: "john@example.com", address: "123 Main St" }
    ]
  }
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'SET_USERNAME':
      const {user} = action.payload;
      const newState = {
        ...store,
        username: user
      };
      console.log('SET_USERNAME performed new state set to: ', newState);
      return newState;
    default:
      throw Error('Unknown action.');
  }
}
