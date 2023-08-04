import { useState } from 'react';
import Navbar from '../component/navbar'
import styles from "../styles/login.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function register() {


    const [datauser, setDatauser] = useState({
        usuario: "",
        email: "",
        contrasena: "",
        empresa: "",
        celular: "",
    })

    const handleChange = (e) => {
        setDatauser({
            ...datauser,
            [e.target.name]: e.target.value
        })
    }

    const router = useRouter();

    const handleSubmit = async (e) => {
        console.log("ejecutando");
        e.preventDefault();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`, datauser);
        console.log(response);
        if (response.status === 200) {
            router.push("/login");
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
                        name="usuario"
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
                        name="contrasena"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button className={styles.button} onClick={handleSubmit} type="submit">
                        Registrarse
                    </button>
                </form>
            </div>
        </>

    )

};
