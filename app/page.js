import styles from '../styles/main.module.css'


export default function Home() {

  const logo = '/logomarcobrelalora.png'

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.name}>
            <h1>G. Mantenimiento</h1>
          </div>
          <div className={styles.options}>
            <h1>Parada de Planta</h1>
            <h1>Option 2</h1>
            <h1>Option 3</h1>
            <h1>Option 4</h1>
            <button>Login</button>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.comment}>
            <h1>Plataforma de Gestión de Mantenimiento</h1>
            <p>Parada de Planta Marcobre</p>
          </div>
          <div className={styles.logo}>
            <img src={logo} height={1000} alt='logo'/>
          </div>
        </div>
      </div>
    </>
  )
}
