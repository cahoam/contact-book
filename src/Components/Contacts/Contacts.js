import React, { useEffect, useState } from 'react';
import Modal from '../Module/Modal';
import styles from './Contact.module.css';

function Contacts(){

    const [modalOpen, setModalOpen] = useState(false);
    const [contacts, setContacts] = useState([]);


    useEffect(() => {
        getContacts();
    }, []);

    function getContacts(){
        fetch("https://node-api-contact.herokuapp.com/contact").then(res => res.json()).then((data) => {
            data.sort((a,b) => a.name.localeCompare(b.name));
            setContacts(data);
        })
    }

    function loadImage(img){
        return `${img}`;
    }

    function phoneMask (number){
        var x = number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        return number;
    }

    function formatDate(date){
        date = date.split(/-/g);
        return `${date[2]}/${date[1]}/${date[0]}`;
    }

    async function deleteContact(id){
        await fetch('https://node-api-contact.herokuapp.com/contact/' + id ,{
            method: 'delete',
        }).then(r=>console.log(r)).catch(e=>console.log(e));
        
        getContacts();
    }

    return(
        <div className={styles.body}>
            <div className={styles.mainCard}>
                <div className={styles.titleCard}>
                    <h1>Agenda de contados</h1>
                </div>

                <div className={styles.contactsFrame}>
        
                    <div className={styles.discriptionBar}>
                        <h2>Contatos cadastrados</h2>
                        <button onClick={()=>{
                            setModalOpen(true)
                        }}>NOVO</button>
                    </div>

                    {contacts.map(contact => (
                        <div key={contact.id} className={styles.contactCard}>
                        <img src={loadImage(contact.profilePhoto)} alt={contact.name}/>
                        <div className={styles.contactData}>
                            <div className={styles.contactName}><b>Nome: </b>{contact.name}</div>
                            <div className={styles.contactEmail}><b>E-mail: </b>{contact.email}</div>
                            <div className={styles.contactPhone}><b>Telefone: </b>{phoneMask(contact.phone)}</div>
                            <div className={styles.contactBirthDate}><b>Data de nascimento: </b>{formatDate(contact.birthDate)}</div>
                        </div>
                        <div className={styles.contactAction}>
                            <button className={styles.editButton} onClick={()=>{}}>EDITAR</button>
                            <button className={styles.deleteButton} onClick={()=>{deleteContact(contact.id)}}>EXCLUIR</button>
                        </div>
                        </div>
                    ))}


                </div>

            </div>


            {modalOpen && <Modal setOpenModal={setModalOpen} setContacts={setContacts}/>}


        </div>
    );
}

export default Contacts;