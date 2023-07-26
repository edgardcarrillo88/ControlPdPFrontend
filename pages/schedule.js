import axios from 'axios'
import Navbar from '../component/navbar'
import { useState } from 'react'
import styles from '../styles/schedule.module.css';

export default function schedule(params) {

    const [file, setFile] = useState([])

    const handlefile = (e) => {

        setFile(e.target.value)
        console.log(e.target.value);

    }

    const sendfile = async () => {

        const excelfile = document.getElementById('fileuploaded').files[0]
        const newfile = new FormData()
        newfile.append('file', excelfile)
        console.log(newfile.get('file'));
        try {
            console.log("ejecutando");
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files`, newfile)
            console.log(response);
        } catch (error) {
            console.log(error);
        }


    }


    return (
        <>
            <Navbar />
            <div className={styles.dropcontainer}>
                <p className={styles.droptitle}>Cargar formato de cronograma</p>
                <input className={styles.inputfile} type='file' name='file' id='fileuploaded' value={file} onChange={handlefile}></input>
                <br />
                <button className={styles.buttonupload} onClick={sendfile}>Enviar archivo</button>
            </div>
        </>
    )
};  
