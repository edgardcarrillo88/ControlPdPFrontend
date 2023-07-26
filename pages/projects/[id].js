import axios from 'axios';
import Navbar from '../../component/navbar'
import { getfiltereddata } from '../api/data/mongodb'
import { useState, useEffect } from 'react';
import styles from '../../styles/formedit.module.css'

export default function ProjectDetails({ projectId }) {

  console.log(projectId);
  console.log(projectId._id);

  const [taskdata, setTaskdata] = useState({
    comentario: '',
    inicio: '',
    fin: '',
    avance: ''
  });


  const [id, setId] = useState([])


  useEffect(() => {
    setId(projectId._id)
  }, [projectId._id])


  const taskupdate = (e) => {

      setTaskdata({
        ...taskdata,
        [e.target.name]: e.target.value,
      });
      console.log(taskdata);

  };


  const handleAddInfo = async () => {
    setId(projectId._id);
    console.log(id);
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/updatedata`, { 
      id: id,
      comentario: taskdata.comentario,
      inicio:taskdata.inicio,
      fin:taskdata.fin,
      avance:taskdata.avance });
    console.log(response);
  };

  return (
    <>
      <Navbar />
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
            <input name='inicio' type='datetime-local' onChange={taskupdate}></input>
          </div>

          <div>
            <h1>Fin</h1>
            <input name='fin' type='datetime-local' onChange={taskupdate}></input>
          </div>
        </div>
        <div className={styles.progresscontainer}>
          <h1>Avance</h1>
          <input name='avance' type='number' max={100} onChange={taskupdate}></input>
        </div>

        <div className={styles.buttoncontainer}>
          <button onClick={handleAddInfo}>Actualizar</button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {

  console.log(params);
  console.log(params.id);
  console.log("ejecutando getserversideprops");
  //const response = await getfiltereddata({ projectId: params.id })
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/filtereddata`, { params: { id: params.id } })
  console.log(response);
  console.log(response.data);
  console.log(response.data.data);
  const data = response.data;

  return {
    props: {
      // projectId: response,
      projectId: data,
    },
  };


}
