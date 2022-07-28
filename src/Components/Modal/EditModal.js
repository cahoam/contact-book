import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import styles from './Modal.module.css';
import { ContactContext } from '../../Context/ContactContext';

import "react-datepicker/dist/react-datepicker.css";

function EditModal({ setEditOpenModal, contact }) {

  const { getContacts } = useContext(ContactContext);

  const id = contact.id;

  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(phoneMask(contact.phone));
  const [profilePhoto, setProfilePhoto] = useState(contact.profilePhoto);
  const [birthDate, setStartDate] = useState(new Date());

  function phoneMask (number){
    var x = number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    return number;
  }

  function phoneMaskInput (e){
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    setPhone(e.target.value);
  }

  function getFile(e){
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setProfilePhoto(reader.result);
    }
    // reader.onerror = function (error) {
    //   console.log('Error: ', error);
    // };
  }

  function validForm(){
    var isValid = true;

    if(name.length < 1){
      document.getElementById('nameInput').style.borderColor = 'crimson';
      isValid = false;
    } else {
      document.getElementById('nameInput').style.borderColor = '#000';
    }

    if(phone.length < 14){
      document.getElementById('phoneInput').style.borderColor = 'crimson';
      isValid = false;
    } else {
      document.getElementById('phoneInput').style.borderColor = '#000';
    }

    if(!(/\S+@\S+\.\S+/.test(email))){
      document.getElementById('emailInput').style.borderColor = 'crimson';
      isValid = false;
    } else {
      document.getElementById('emailInput').style.borderColor = '#000';
    }

    if(birthDate == null){
      document.getElementById('bitrhDateInput').style.borderColor = 'crimson';
      isValid = false;
    } else {
      document.getElementById('bitrhDateInput').style.borderColor = '#000';
    }

    if(profilePhoto.length < 1){
      document.getElementById('profilePictureInput').style.color = 'crimson';
      isValid = false;
    } else {
      document.getElementById('profilePictureInput').style.color = '#000';
    }

    if(!isValid){
      alert('Verifique os erros no formulário!');
    }
    return isValid;
  }

  function editUser(){
    if(validForm())
        fetch('https://node-api-contact.herokuapp.com/contact',{
            method: 'put',
            headers: {    
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name, email, phone: phone.replace( /\D/g, '' ), birthDate, profilePhoto })
        }).then(r => r.json()).then(data =>{
            if(data.status === "success"){
                alert('Atualizado com sucesso!');
                getContacts();
                setEditOpenModal(false);
            } else {
                alert("Falha ao editar usuário");
            }
        }).catch(e=>{
            alert("Falha ao editar usuário");
        })
  }


  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        
        <div className={styles.title}>
          <h1>Editar contato</h1>
        </div>

        <div className={styles.body}>
          <div className={styles.bodyLeft}>
            <div className={styles.inputContainer}>
              <label>Nome</label>
              <input value={name} tabIndex="1" onChange={(e)=>{setName(e.target.value)}} type="text" id="nameInput"/>
            </div>
            <div className={styles.inputContainer}>
              <label>Telefone</label>
              <input type="text" tabIndex="3" value={phone} onChange={phoneMaskInput} id="phoneInput"/>
            </div>
            <div className={styles.inputContainer}>
              <input type="file" tabIndex="5" onChange={getFile} id="profilePictureInput"/>
            </div>
          </div>

          <div className={styles.bodyRight}>
            <div className={styles.inputContainer}>
                <label>E-mail</label>
                <input value={email} tabIndex="2" onChange={(e)=>{setEmail(e.target.value)}} type="email" id="emailInput"/>
            </div>
            <div className={styles.inputContainer}>
              <label>Data de nascimento</label>
              <DatePicker 
                selected={birthDate}
                onChange={(date) => setStartDate(date)} 
                dateFormat="dd/MM/yyyy"
                tabIndex="4"
                id="bitrhDateInput"
                maxDate={new Date()}
              />
            </div>

            <div className={styles.inputContainer}>
                <img src={profilePhoto}/>
            </div>


          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={() => {
              setEditOpenModal(false);
            }}>
            Cancel
          </button>

          <button onClick={editUser}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;