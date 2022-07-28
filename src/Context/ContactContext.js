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
            if(data.status === "success"){
                data.data.sort((a,b) => a.name.localeCompare(b.name));
                setContacts(data.data);
            } else {
                alert("Falha ao recuperar os dados do servidor.")
            }
        }).catch((e)=>{
            alert("Falha ao recuperar os dados do servidor.")            
        });
    }

    async function deleteContact(id){
        await fetch('https://node-api-contact.herokuapp.com/contact/' + id ,{
            method: 'delete',
        }).then(res=>res.json()).then((data)=>{
            if(data.status === "success"){
                alert("Contato removido com sucesso!");
            } else {
                alert("Falha ao remover o contato.");
            }
        }).catch((e)=>{
            alert("Falha ao remover o contato.");
        });
        
        getContacts();
    }

    return(
        <ContactContext.Provider value={{contacts, setContacts, getContacts, deleteContact, editContact, setEditContact}}>
            {props.children}
        </ContactContext.Provider>
    )

}

export default ContactContextProvider;