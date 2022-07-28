import { useState, useContext } from 'react';
import { ContactContext } from '../../Context/ContactContext';
import styles from './Contact.module.css';
import EditModal from '../Modal/EditModal';

function ContactCard({contact}){

    const { deleteContact } = useContext(ContactContext);

    const [editModalOpen, setEditModalOpen] = useState(false);

    function phoneMask (number){
        var x = number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        return number;
    }

    function formatDate(date){
        date = date.split(/-/g);
        return `${date[2]}/${date[1]}/${date[0]}`;
    }

    return(
        <div key={contact.id} className={styles.contactCard}>
            <img src={contact.profilePhoto} alt={contact.name}/>
            <div className={styles.contactData}>
                <div className={styles.contactName}><b>Nome: </b>{contact.name}</div>
                <div className={styles.contactEmail}><b>E-mail: </b>{contact.email}</div>
                <div className={styles.contactPhone}><b>Telefone: </b>{phoneMask(contact.phone)}</div>
                <div className={styles.contactBirthDate}><b>Data de nascimento: </b>{formatDate(contact.birthDate)}</div>
            </div>
            <div className={styles.contactAction}>
                <button className={styles.editButton} onClick={()=>{
                    setEditModalOpen(true);
                }}>EDITAR</button>
                <button className={styles.deleteButton} onClick={()=>{
                    deleteContact(contact.id)
                }}>EXCLUIR</button>
            </div>
            {editModalOpen && <EditModal setEditOpenModal={setEditModalOpen} contact={contact}/>}
        </div>

    );
}

export default ContactCard; 