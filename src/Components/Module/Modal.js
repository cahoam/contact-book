import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styles from './Modal.module.css';

import "react-datepicker/dist/react-datepicker.css";

function Modal({ setOpenModal }) {

  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState(new Date());


  function phoneMask (e){
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    setPhone(e.target.value);
  }



  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        
        <div className={styles.title}>
          <h1>Novo contato</h1>
        </div>

        <div className={styles.body}>
          <div className={styles.bodyLeft}>
            <div className={styles.inputContainer}>
              <label>Nome</label>
              <input type="text"/>
            </div>
            <div className={styles.inputContainer}>
              <label>Telefone</label>
              <input type="text" value={phone} onChange={phoneMask}/>
            </div>
            <div className={styles.inputContainer}>
              <label>Foto</label>
              <input type="text"/>
            </div>
          </div>

          <div className={styles.bodyRight}>
          <div className={styles.inputContainer}>
              <label>E-mail</label>
              <input type="text"/>
            </div>
            <div className={styles.inputContainer}>
              <label>Data de nascimento</label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy"/>
              {/* <input type="text"/> */}
            </div>

          </div>
        </div>



        <div className={styles.footer}>
          <button onClick={() => {
              setOpenModal(false);
            }} id="cancelBtn">
            Cancel
          </button>

          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;