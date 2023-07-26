import { useState } from 'react';
import Navbar from '../component/navbar'
import styles from "../styles/login.module.css";


export default function register() {


    const [datauser,setDatauser]= useState({
        Nombres:"",
        email:"",
        Empresa:"",
        Celular:"",
        Password:"",
    })

    const handleChange = (e) =>{
        setDatauser({
            ...datauser,
            [e.target.name]: e.target.value
        })
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/verify`, credentials);
        //const response = await axios.post(`/api/auth/login`, credentials);
        console.log(response);
        if (response.status === 200) {
          router.push("/dashboard");
        }
      };





    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1>Registrarse</h1>
                <form className={styles.form}
                //onSubmit={handleSubmit}
                >
                    <input
                        className={styles.input}
                        name="Nombres"
                        type="Nombres"
                        placeholder="Nombres"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="empresa"
                        type="empresa"
                        placeholder="empresa"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="Celular"
                        type="Celular"
                        placeholder="Celular"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button className={styles.button} type="submit">
                        Registrarse
                    </button>
                </form>
            </div>
        </>

    )

};
