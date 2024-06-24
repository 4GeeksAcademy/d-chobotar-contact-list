
import { Contact } from "../components/Contact.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";

export const Contacts = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const onClickHandle = () => {
        navigate('/contactForm')
    }

    return (
        <div className="d-flex flex-column p-2">
            <div className="text-center">
                <div className="d-flex justify-content-between m-3">
                    <h1>Contacts List</h1>
                    <button onClick={onClickHandle} className="btn btn-primary"> Add Contact</button>
                </div>
                <ul className="list-group">
                    {store.contacts.map((contact) => <Contact key={contact.id} contactObj={contact} />)}
                </ul>
            </div>
            <div className="d-flex align-items-end m-3">
                <Link to="/demo">
                    <span className="">Navigate back to landing page</span>
                </Link>
            </div>
        </div>
    );
}; 