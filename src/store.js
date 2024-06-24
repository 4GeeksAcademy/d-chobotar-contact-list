export const initialStore = () => {
  return {
    username: null,
    sample: { name: "John Doe", phone: "123-456-7890", email: "john@example.com", address: "123 Main St" },
    contacts: []
  }
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'SET_USERNAME':
      const {user} = action.payload;
      const setUsernameState = {
        ...store,
        username: user
      };
      console.log('SET_USERNAME performed new state set to: ', setUsernameState);
      return setUsernameState;
    case 'ADD_CONTACT':
      const addContactState = {
          ...store,
          contacts: [...store.contacts, action.payload.contact]
        };
      console.log('ADD_CONTACT performed and new state set to: ', addContactState);  
      return addContactState;  
    case 'SET_CONTACTS': 
      const setContactsState = {
        ...store,
        contacts: action.payload.contacts
      }
      console.log('SET_CONTACTS performed and new state set to: ', setContactsState);  
      return setContactsState;
    default:
      throw Error('Unknown action.');
  }
};
