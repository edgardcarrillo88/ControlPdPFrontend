import Link from "next/link";
import style from "../styles/navbar.module.css"

export default function Menu() {




    return (
        <nav className={style.navbar}>
            <div className={style.navbaroption}>
                <Link className={style.linkoption} href="/schedule">Cargar de cronograma</Link>
                <Link className={style.linkoption} href="/review">Revision de cronograma</Link>
                <Link className={style.linkoption} href="/dashboard">Dashboard</Link>
            </div>
            <div className={style.loginoption}>
                <Link className={style.linkoption} href="/login">Login</Link>
            </div>
        </nav>
    )
}

