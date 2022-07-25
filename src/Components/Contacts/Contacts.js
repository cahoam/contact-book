import styles from './Contact.module.css'

function Contacts(){
    return(
        <div className={styles.body}>
            <div className={styles.mainCard}>
                <div className={styles.titleCard}>
                    <h1>Agenda de contados</h1>
                </div>

                <div className={styles.contactsFrame}>
        
                    <div className={styles.discriptionBar}>
                        <h2>Contatos cadastrados</h2>
                        <button>NOVO</button>
                    </div>

                    <div className={styles.contactCard}>
                        <img src='https://media-cdn.tripadvisor.com/media/photo-s/15/a4/9b/77/legacy-hotel-at-img-academy.jpg'/>
                        <div className={styles.contactData}>
                            <div className={styles.contactName}>neni</div>
                            <div className={styles.contactEmail}>nei</div>
                            <div className={styles.contactPhone}>lerim</div>
                            <div className={styles.contactBirthDate}>chain</div>
                        </div>
                        <div className={styles.contactAction}>
                            <button className={styles.editButton}>EDITAR</button>
                            <button className={styles.deleteButton}>EXCLUIR</button>
                        </div>
                    </div>
                </div>

            </div>



            {/* Modal */}

            {/* <div className={styles.modal} id="modal"> */}

            {/* </div>   */}




        </div>
    );
}

export default Contacts;