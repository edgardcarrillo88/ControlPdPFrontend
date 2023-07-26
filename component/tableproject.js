import axios from 'axios';
import styles from '../styles/review.module.css'
// import data from '../project.json'
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function tableproject({ filter }) {

    const [data, setData] = useState([])

    useEffect(() => {

        async function fetchData() {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/data`)
            const { data } = response.data;
            setData(data)
        }
        fetchData()
    }, [])

    console.log(data);

    const filteredData = data.filter((item) => {
        return (
            (filter.responsable === '' || item.responsable === filter.responsable) &&
            (filter.contratista === '' || item.contratista === filter.contratista) &&
            (filter.estado === '' || item.estado === filter.estado)
        );
    });

    console.log(filteredData);

    return (
        <>
            <div className={styles.table}>
                
                <table>
                    <thead>
                        <tr>
                            <th>Nivel</th>
                            <th>WBS</th>
                            <th>Descripción</th>
                            <th>OT</th>
                            <th>TAG</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Avance</th>
                            <th>Estado</th>
                            <th>Responsable</th>
                            <th>Contratista</th>
                            <th>Editar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredData.map(option => (
                                <tr>
                                    <td>{option.nivel}</td>
                                    <td>{option.WBS}</td>
                                    <td>{option.descripcion}</td>
                                    <td>{option.OT}</td>
                                    <td>{option.TAG}</td>
                                    <td>{option.inicioplan}</td>
                                    <td>{option.finplan}</td>
                                    <td>{option.avance}</td>
                                    <td>{option.estado}</td>
                                    <td>{option.responsable}</td>
                                    <td>{option.contratista}</td>
                                    <td>
                                        <Link href={`/projects/${option.id}`}>ver detalle</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/* <div className={styles.datatable}>
                    <div>
                        <div className={styles.headertable}>
                            <div className={styles.singleheader}>Nivel</div>
                            <div className={styles.singleheader}>WBS</div>
                            <div className={styles.singleheader}>Descripción</div>
                            <div className={styles.singleheader}>OT</div>
                            <div className={styles.singleheader}>TAG</div>
                            <div className={styles.singleheader}>Inicio</div>
                            <div className={styles.singleheader}>Fin</div>
                            <div className={styles.singleheader}>Avance</div>
                            <div className={styles.singleheader}>Estado</div>
                            <div className={styles.singleheader}>Responsable</div>
                            <div className={styles.singleheader}>Contratista</div>
                            <div className={styles.singleheader}>Editar</div>
                        </div>
                    </div>

                    <div>
                        {
                            filteredData.map(option => (
                                <div  className={styles.grouprow}>
                                    <div className={styles.singlerow}>{option.nivel}</div>
                                    <div className={styles.singlerow}>{option.WBS}</div>
                                    <div className={styles.singlerow}>{option.descripcion}</div>
                                    <div className={styles.singlerow}>{option.OT}</div>
                                    <div className={styles.singlerow}>{option.TAG}</div>
                                    <div className={styles.singlerow}>{option.inicio}</div>
                                    <div className={styles.singlerow}>{option.fin}</div>
                                    <div className={styles.singlerow}>{option.avance}</div>
                                    <div className={styles.singlerow}>{option.estado}</div>
                                    <div className={styles.singlerow}>{option.responsable}</div>
                                    <div className={styles.singlerow}>{option.contratista}</div>
                                    <div className={styles.singlerow}>
                                        <Link href={`/projects/${option.id}`}>aa</Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div> */}

            </div>
        </>
    )
};
