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
    // const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/verify`, credentials, {
    //   withCredentials: true,
    // } );
    const response = await axios.post(`/api/auth/login`, credentials);
    console.log(response);
    if (response.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <Link href="/register">Registrate</Link>
        </form>
      </div>
    </>
  );
}
