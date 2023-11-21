import Link from "next/link";
import style from "../styles/navbar.module.css"
import { useAppContext } from './stateoptions'
import { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/router";

export default function Menu() {

    const options = useAppContext()

    const [user, setUser] = useState({
        email: '',
        username: ''
    })

    const router = useRouter()

    function handleOpenCart() {
        if (options.isOpen === true) {
            options.CloseCart()
        } else {
            options.openCart()
        }
    }

    const logoutProfile = async () => {
        const response = await axios.post('/api/auth/logout')
        console.log(response);
        router.push('/login')
    }


    useEffect(() => {
        async function getprofile() {
            try {
                const response = await axios.get('/api/profile')
                setUser(response.data)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                    console.log(!user);
                }
            }              
        }
        getprofile();
    }, [])



    return (
        <nav className={style.navbar}>
            <div className={style.mobilemenu} onClick={handleOpenCart}>&#9776;</div>
            <div className={style.navbaroption}>
                <Link className={style.linkoption} href="/schedule">Cargar de cronograma</Link>
                <Link className={style.linkoption} href="/review">Revision de cronograma</Link>
                <Link className={style.linkoption} href="/planner">Planeamiento</Link>
                <Link className={style.linkoption} href="/valorizaciones">Valorizaciones</Link>
                <Link className={style.linkoption} href="/Provisiones">Provisiones</Link>
                <Link className={style.linkoption} href="/dashboard">Dashboard</Link>
            </div>
            <div className={style.loginoption}>
                {!user && <Link className={style.linkoption} href="/login">Login</Link>}
                {user && <Link className={style.linkoption} href="/login" onClick={() => logoutProfile()}>LogOut</Link>}
                {/* <Link className={style.linkoption} href="/login">Login</Link> */}
            </div>
        </nav>
    )
}

