import axios from 'axios';
import Navbar from '../../component/navbar'
import { getfiltereddata } from '../api/data/mongodb'
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from '../../styles/formedit.module.css'

export default function ProjectDetails({ projectId }) {

  const [showMessage, setShowMessage] = useState(false);

  const [user, setUser] = useState({
    email: '',
    username: ''
  })

  const [taskdata, setTaskdata] = useState({
    comentario: '',
    inicio: '',
    fin: '',
    avance: ''
  });

  const [id, setId] = useState([])

  const router = useRouter();


  useEffect(() => {
    setId(projectId._id)
  }, [projectId._id])


  useEffect(() => {
    async function getprofile() {
      const response = await axios.get('/api/profile')
      setUser(response.data)
    }
    getprofile();
  }, [])


  const taskupdate = (e) => {
    if (parseFloat(e.target.value) > 100 && e.target.name === "avance") {
      setTaskdata({
        ...taskdata,
        [e.target.name]: 100,
      });
    } else {
      setTaskdata({
        ...taskdata,
        [e.target.name]: e.target.value,
      });

    }
  };


  const handleAddInfo = async () => {

    if (!taskdata.inicio && !projectId.inicioreal) {
      alert("debe agregar la fecha de inicio")
      return
    }

    if (!taskdata.avance) {
      alert("debe agregar datos de avance")
      return
    }

    if (parseFloat(taskdata.avance) === 100 && !taskdata.fin) {
      alert("debe agregar la fecha fin")
      return
    }


    setId(projectId._id);
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/updatedata`, {
      id: id,
      comentario: taskdata.comentario,
      inicio: taskdata.inicio,
      fin: taskdata.fin,
      avance: taskdata.avance,
      usuario:  user.email});

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1200);
    router.push("/review");
  };

  return (
    <>
      <Navbar />
      {showMessage && <div className={styles.notification}>¡Mensaje de notificación!</div>}
      <div className={styles.maincontainer}>

        <div className={styles.activitycontainer}>
          <h1>Actividad</h1>
          <p>{projectId.descripcion}</p>
        </div>

        <div className={styles.systemcontainer}>
          <h1>OT</h1>
          <p>{projectId.OT}</p>

          <h1>TAG</h1>
          <p>{projectId.TAG}</p>
        </div>

        <div className={styles.thirdpartycontainer}>
          <h1>Responsable</h1>
          <p>{projectId.responsable}</p>

          <h1>Contratista</h1>
          <p>{projectId.contratista}</p>

          <h1>Comentarios de la actividad</h1>
          <textarea name='comentario' onChange={taskupdate} />
        </div>

        <div className={styles.datescontainer}>
          <div>
            <h1>Inicio</h1>
            <input name='inicio' type='datetime-local' defaultValue={projectId.inicioreal} onChange={taskupdate}></input>
          </div>

          <div>
            <h1>Fin</h1>
            <input name='fin' type='datetime-local' defaultValue={projectId.finreal} onChange={taskupdate}></input>
          </div>
        </div>
        <div className={styles.progresscontainer}>
          <h1>Avance</h1>
          <input name='avance' type='number' max={100} defaultValue={projectId.avance} value={taskdata.avance} onChange={taskupdate}></input>
        </div>

        <div className={styles.buttoncontainer}>
          <button onClick={handleAddInfo}>Actualizar</button>
        </div>
      </div>
    </>
  );
}





export async function getServerSideProps({ params }) {

  console.log("ejecutando getserversideprops");
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/filtereddata`, { params: { id: params.id } })
  const data = response.data;

  return {
    props: {
      projectId: data,
    },
  };


}
