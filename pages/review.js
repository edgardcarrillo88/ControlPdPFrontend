import Navbar from '../component/navbar'
import Optionbar from '../component/optionbar'
import Tableproject from '../component/tableproject'
import { useState } from 'react'

import styles from '../styles/review.module.css'

export default function review() {

    const [filter, setFilter] = useState({
        responsable: '',
        contratista: '',
        estado: '',
      });

    const handleFilterChange = (e) => {

    setFilter({
        ...filter,
        [e.target.name]: e.target.value,
    });
    };

    const clearFilter = () => {
        setFilter({
            responsable: '',
            contratista: '',
            estado: '',
        });
    };

    console.log(filter);

    return (
        <>
            <Navbar />
            <div className={styles.main}>
                <Optionbar handleFilterChange={handleFilterChange} clearFilter={clearFilter} />
                <Tableproject filter ={filter}/>
            </div>
        </>
    )
};
