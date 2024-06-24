import { useState } from "react";
import { createContactForUsername, updateContactForUsername, getContactsByUSername } from "../contactApiUtils.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";


export const ContactForm = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const location = useLocation();
    const contact = location.state?.contact;
    const [formValues, setformValues] = useState({
        name: contact ? contact.name : '',
        email: contact ? contact.email : '',
        phone: contact ? contact.phone : '',
        address: contact ? contact.address : '',
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setformValues({ ...formValues, [name]: value });
        console.log(`handleOnChange:  ${[name]}, ${value}`);
    }

    const onSubmitHandle = async (event) => {
        event.preventDefault();
        if (contact !== undefined) {
            console.log('username: ', store.username)
            console.log('contact id: ', contact.id)
            console.log('form values: ', formValues)
            const uptadeContactResponse = await updateContactForUsername(store.username, contact.id, formValues);
            if (uptadeContactResponse.status === 200) {
                const contactsData = await getContactsByUSername(store.username);
                dispatch({
                    type: 'SET_CONTACTS',
                    payload: { contacts: contactsData.data.contacts }
                });
            } else {
                console.log('An error occured while updating the contact')
            }
        } else {
            console.log('contacts id is undefined then we will create a new one...')
            const createContactResponse = await createContactForUsername(store.username, formValues);
            if (createContactResponse.status === 201) {
                const contactsData = await getContactsByUSername(store.username);
                dispatch({
                    type: 'SET_CONTACTS',
                    payload: { contacts: contactsData.data.contacts }
                });
            } else {
                console.log('An error occured while creating the contact')
            }
        }

        navigate('/contacts');
    }

    return (
        <>
            <form onSubmit={onSubmitHandle} className="m-5 p-4">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        onChange={handleOnChange}
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="name"
                        placeholder={contact ? contact.name : 'Enter Full Name'}
                        // value={contact.name}
                        aria-describedby="fullNameHelp"
                    />
                    <div id="fullNameHelp" className="form-text">Enter the full name of your Contact</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        onChange={handleOnChange}
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder={contact ? contact.email : 'Enter Email'}
                        // value={contact.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone</label>
                    <input
                        onChange={handleOnChange}
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phone"
                        placeholder={contact ? contact.phone : 'Enter Phone Number'}
                        // value={contact.phone}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        onChange={handleOnChange}
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder={contact ? contact.address : 'Enter Address'}
                        // value={contact.address}
                    />
                </div>
                <button type="submit" className="w-100 btn btn-primary mb-3">Save</button>
                <Link to="/contacts">
                    <span >Navigate back to contacts page</span>
                </Link>
            </form>

        </>
    );

}