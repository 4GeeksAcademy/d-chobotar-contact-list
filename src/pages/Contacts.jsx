
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import avatarImage from "../assets/img/m-avatar.png"

export const Contacts = (props) => {

    const { store, dispatch } = useGlobalReducer();

    const onClickHandler = () => {
        // some code
    } 


    return (
        <div className="text-center mt-5">
            <h1>Contacts List</h1>
            <ul className="list">
                {store.contacts.map((contact, index) => (
                    <li key={index} className="d-flex justify-content-between align-items-center contactCont">
                        {/* TODO - make this as a small component Contact */}
                        <div className="">
                            <img className="avatar" src={avatarImage} alt="none" />
                        </div>
                        <div>
                            <div>{contact.name}</div>
                            <div>ph: {contact.phone}, email: {contact.email}, address: {contact.address}</div>
                        </div>
                        <div className="contactManagement">
                            <button className="btn" onClick={onClickHandler}><i className="fa-solid fa-pen-to-square"></i></button>
                            <button className="btn" onClick={onClickHandler}><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}; 