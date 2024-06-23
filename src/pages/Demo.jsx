// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { getUserData, createUserData, createContactForUsername } from "../contactApiUtils";

export const Demo = () => {
    
    const { store, dispatch } = useGlobalReducer();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!username){
            alert('Please enter your username.')
            return;
        }

        const userResponse = await getUserData(username);

        console.log('checking the status code...')
        if(userResponse.status === 200){
            console.log('Navigating to /contacts route')
            navigate('/contacts');
        } else {
            console.log(`username ${username} not found, creating a new record.`)
            const createUserResponse = await createUserData(username);

            if(createUserResponse.status === 201){
                console.log(`username ${username} successfully created`);
                console.log('adding a sample contact to the user...', store.contacts[0])
                
                const createContactsResponse = await createContactForUsername(username, store.contacts[0]);
                
                if(createContactsResponse.status === 201){
                    console.log('contacts successfully created')
                    console.log('here it is: ', createContactsResponse)
                }
                navigate('/contacts');
            } else {
                alert('Failed to create an user with username: ' + username + '. Please try agin!')
            }
        }

        dispatch({
            type: 'SET_USERNAME',
            payload: { user: username }
        }
        );
    }

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                        onChange={handleInputChange}
                        value={username}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
