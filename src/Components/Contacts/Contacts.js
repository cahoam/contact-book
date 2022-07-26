import React, { useEffect, useState } from 'react';
import Modal from '../Module/Modal';
import styles from './Contact.module.css'

function Contacts(){

    const [modalOpen, setModalOpen] = useState(false);
    const [contacts, setContacts] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3000/contact").then(res => res.json()).then((data) => {
            data.sort((a,b) => a.name.localeCompare(b.name));
            setContacts(data);
        })
    }, []);

    function loadImage(a){
        const base64String = btoa(String.fromCharCode(...new Uint8Array(a.data)));
        return `data:image/jpeg;base64,${base64String}`;
    }

    function phoneMask (number){
        var x = number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        return number;
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
                        <img src={loadImage(contact.profilePhoto)}/>
                        <div className={styles.contactData}>
                            <div className={styles.contactName}><b>Nome: </b>{contact.name}</div>
                            <div className={styles.contactEmail}><b>E-mail: </b>{contact.email}</div>
                            <div className={styles.contactPhone}><b>Telefone: </b>{phoneMask(contact.phone)}</div>
                            <div className={styles.contactBirthDate}><b>Data de nascimento: </b>{contact.birthDate}</div>
                        </div>
                        <div className={styles.contactAction}>
                            <button className={styles.editButton}>EDITAR</button>
                            <button className={styles.deleteButton}>EXCLUIR</button>
                        </div>
                        </div>
                    ))}


                </div>

            </div>


            {modalOpen && <Modal setOpenModal={setModalOpen} />}


        </div>
    );
}

export default Contacts;