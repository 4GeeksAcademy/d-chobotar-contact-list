// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { getUserData, createUserData, createContactForUsername, getContactsByUSername } from "../contactApiUtils";

export const LandingPage = () => {

    const { store, dispatch } = useGlobalReducer();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username) {
            alert('Please enter your username.')
            return;
        }

        const userResponse = await getUserData(username);

        console.log('checking the status code...')
        if (userResponse.status === 200) {
            console.log('Found user: ', username)
            console.log('Navigating to /contacts route')
            dispatch({
                type: 'SET_USERNAME',
                payload: { user: username }
            });
            const contactsData = await getContactsByUSername(username);
            dispatch({
                type: 'SET_CONTACTS',
                payload: { contacts: contactsData.data.contacts }
            });
            navigate('/contacts');
        } else {
            console.log(`username ${username} not found, creating a new record.`)
            const createUserResponse = await createUserData(username);

            if (createUserResponse.status === 201) {
                console.log(`username ${username} successfully created`);
                console.log('adding a sample contact to the user...', store.sample)
                dispatch({
                    type: 'SET_USERNAME',
                    payload: { user: username }
                });
                const createContactsResponse = await createContactForUsername(username, store.sample);

                if (createContactsResponse.status === 201) {
                    console.log('contacts successfully created');
                    console.log('here it is: ', createContactsResponse);
                    dispatch({
                        type: 'ADD_CONTACT',
                        payload: { contact: createContactsResponse.data }
                    });

                    navigate('/contacts');
                }

            } else {
                alert('Failed to create an user with username: ' + username + '. Please try agin!')
            }
        }
    }

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    }

    return (
        <div className="container p-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                    >
                        Enter your username to access your contact list:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter your username"
                        onChange={handleInputChange}
                        value={username}
                    />
                    <div id="username" className="form-text">If your username is not foud we will automatically create one for you...</div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
};
