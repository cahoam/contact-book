import React, { useContext, useState } from 'react';
import { ContactContext } from '../../Context/ContactContext';
import ContactCard from './ContactCard';
import Modal from '../Module/Modal';
import styles from './Contact.module.css';

function Contacts(){

    const {contacts} = useContext(ContactContext);

    const [modalOpen, setModalOpen] = useState(false);

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
                        <ContactCard key={contact.id} contact={contact}/>
                    ))}

                </div>

            </div>

            {modalOpen && <Modal setOpenModal={setModalOpen}/>}

        </div>
    );
}

export default Contacts;