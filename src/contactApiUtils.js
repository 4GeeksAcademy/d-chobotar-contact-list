const BASE_URL = 'https://playground.4geeks.com/contact/agendas';

const getUserData = async (username) => {
    const response = await fetch(`${BASE_URL}/${username}`);
    const data = await response.json();
    console.log('Performed getUserData: ', response, data);
    return { status: response.status, data }
};

const createUserData = async (username) => {
    const response = await fetch(`${BASE_URL}/${username}`, { method: 'POST' });
    const data = await response.json();
    console.log('Performed createUserData: ', response, data);
    return { status: response.status, data };
};

const getContactsByUSername = async (username) => {
    const response = await fetch(`${BASE_URL}/${username}/contacts`);
    const data = await response.json();
    console.log('Performed getContactsByUSername: ', response, data);
    return { status: response.status, data };
};

const createContactForUsername = async (username, payload) => {
    const response = await fetch(`${BASE_URL}/${username}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log('Performed createContactForUsername: ', response, data);
    return { status: response.status, data }
};

const updateContactForUsername = async (username, contanct_id, payload) => {
    const response = await fetch(`${BASE_URL}/${username}/contacts/${contanct_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log('Performed updateContactForUsername: ', response, data);
    return { status: response.status, data }
}

const deleteContactForUsername = async (username, contanct_id) => {
    const response = await fetch(`${BASE_URL}/${username}/contacts/${contanct_id}`, { method: 'DELETE' });
    console.log('Performed deleteContactForUsername: ', response);
    return { status: response.status, data: response.body };
}

export {
    getUserData,
    createUserData,
    getContactsByUSername,
    createContactForUsername,
    updateContactForUsername,
    deleteContactForUsername
}




