import styles from '../styles/review.module.css'
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function optionbar({ handleFilterChange, clearFilter }) {


    const [datafilter, setDatafilter] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/filters`)
            const { data } = response.data;
            console.log(data);
            setDatafilter(data)
            console.log(data);
            setIsLoading(false);
        }
        fetchData();
    }, [])


    const responsableRef = useRef(null);
    const contratistaRef = useRef(null);
    const estadoRef = useRef(null);

    const handleClearFilter = () => {
        clearFilter();
        responsableRef.current.value = '';
        contratistaRef.current.value = '';
        estadoRef.current.value = '';
    };

    return (
        <>
            <div className={styles.optionbar}>
                {!isLoading && (
                    <div>
                        <div>

                        </div>
                        <div className={styles.optionbarchild}>
                            <p className={styles.filtertitles}>Responsable</p>
                            <select className={styles.filteroptions} name="responsable" onChange={handleFilterChange} ref={responsableRef}>
                                <option value="">Todos</option>
                                {
                                    datafilter.map(option => (
                                        option.responsable && <option key={option.id} value={option.responsable}>{option.responsable}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={styles.optionbarchild}>
                            <p className={styles.filtertitles}>Contratista</p>
                            <select className={styles.filteroptions} name="contratista" onChange={handleFilterChange} ref={contratistaRef}>
                                <option value="">Todos</option>
                                {
                                    datafilter.map(option => (
                                        option.contratista && <option key={option.id} value={option.contratista}>{option.contratista}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={styles.optionbarchild}>
                            <p className={styles.filtertitles}>Estado</p>
                            <select className={styles.filteroptions} name="estado" onChange={handleFilterChange} ref={estadoRef}>
                                <option value="">Todos</option>
                                {
                                    datafilter.map(option => (
                                        option.estado && <option key={option.id} value={option.estado}>{option.estado}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                )}
                {isLoading && <p>Cargando datos...</p>}
                <div className={styles.optionbarchild}>
                    <button className={styles.clearfilter} onClick={handleClearFilter}>Limpiar filtros</button>
                </div>
            </div>
        </>
    )
};
