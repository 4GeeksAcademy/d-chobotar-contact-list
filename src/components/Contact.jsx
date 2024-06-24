import avatarImage from "../assets/img/m-avatar.png"
import { useNavigate } from "react-router-dom";
import { getContactsByUSername, deleteContactForUsername } from "../contactApiUtils";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";

export const Contact = (props) => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const onClickHandler = async (param) => {
        console.log(`action: ${param.actionType} and the contact: ${JSON.stringify(param.contact)}`)
        if (param.actionType === 'edit') {
            navigate('/contactForm', { state: { contact: param.contact } });
        } else {
            const deleteContactResponse = await deleteContactForUsername(store.username, param.contact.id);
            if (deleteContactResponse.status === 204) {
                console.log('removed successfully ', deleteContactResponse.data)
                dispatch({
                    type: 'SET_CONTACTS',
                    payload: { contacts: store.contacts.filter(cont => cont.id !== param.contact.id) }
                });
            }
        }
    }

    useEffect(() => {
        const handleGetContacts = async () => {
            const contactsData = await getContactsByUSername(store.username);
            dispatch({
                type: 'SET_CONTACTS',
                payload: { contacts: contactsData.data.contacts }
            });
        }
        handleGetContacts();
    }, []);


    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="">
                    <img className="avatar" src={avatarImage} alt="none" />
                </div>
                <div className="d-flex flex-column align-items-start w-80">
                    <div className="fs-1 fw-bolder">{props.contactObj.name}</div>
                    <div className="d-flex gap-5 text-secondary fs-4 ">
                        <span>
                            <i className="fa-solid fa-phone"></i>
                            <span className="p-2">{props.contactObj.phone}</span>
                        </span>
                        <span>
                            <i className="fa-solid fa-envelope"></i>
                            <span className="p-2">{props.contactObj.email}</span>
                        </span>
                        <span>
                            <i className="fa-solid fa-map-pin"></i>
                            <span className="p-2">{props.contactObj.address}</span>
                        </span>
                    </div>
                </div>
                <div className="text-secondary-emphasis">
                    <button className="btn" onClick={() => onClickHandler({ actionType: 'edit', contact: props.contactObj })}>
                        <i className="fs-3 fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="btn" onClick={() => onClickHandler({ actionType: 'delete', contact: props.contactObj })}>
                        <i className=" fs-3 fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </li>
        </>
    );
}