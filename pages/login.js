import Navbar from '../component/navbar'
import Link from "next/link";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/verify`, { params: credentials });
    console.log(response.data);
    if (response.data.data === process.env.NEXT_PUBLIC_LOGIN_VERIFY && response.data.verify === true) {
      const verifysesion = await axios.post(`/api/auth/login`, credentials);
      if (verifysesion.status === 200) {
        router.push("/review");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <img src='https://statics.turecibo.com/media/custom/login/marcobre_logo.jpg' alt='Logo' width={220} height={50} />
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Email"
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
            Login
          </button>
          <p>¿Aún no eres usuario? </p>
          <Link href="/register" style={{ textDecoration: 'none', color:'darkblue' }}>Registrate</Link>
        </form>
      </div>
    </>
  );
}
