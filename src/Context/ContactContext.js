import { createContext, useEffect, useState } from "react";

export const ContactContext = createContext();

function ContactContextProvider(props){

    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState({});

    useEffect(()=>{
        getContacts();
    },[])

    function getContacts(){
        fetch("https://node-api-contact.herokuapp.com/contact").then(res => res.json()).then((data) => {
            data.sort((a,b) => a.name.localeCompare(b.name));
            setContacts(data);
        });
    }

    async function deleteContact(id){
        await fetch('https://node-api-contact.herokuapp.com/contact/' + id ,{
            method: 'delete',
        }).then(r=>console.log(r)).catch(e=>console.log(e));
        
        getContacts();
    }

    return(
        <ContactContext.Provider value={{contacts, setContacts, getContacts, deleteContact, editContact, setEditContact}}>
            {props.children}
        </ContactContext.Provider>
    )

}

export default ContactContextProvider;