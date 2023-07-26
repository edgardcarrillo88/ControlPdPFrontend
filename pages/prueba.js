import axios from 'axios'
import Navbar from '../component/navbar'
import { useState } from 'react'

export default function prueba() {

    const [data, setData] = useState([])

    const handlechange = async () => {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/data`)
        const { data } = response.data;
        setData(data)

    }


    return (
        <>
            <Navbar />
            <h1>Prueba getalldata</h1>
            {
                data.map(item =>(
                    <p key={item.id}>{item.descripcion}</p>
                ))
            }
            <button onClick={handlechange}>get all data</button>
        </>
    )
};


