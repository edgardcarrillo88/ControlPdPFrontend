import { useState } from 'react'
import Navbar from '../component/navbar'
import axios from 'axios'


export default function sharepoint() {

    const [data, setData] = useState([])

    const url = 'https://accounts.accesscontrol.windows.net/00015d92-21ad-48a8-8445-a7d68bf899bd/tokens/OAuth/2/';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const requestBody = 'grant_type=client_credentials' +
        '&client_id=70dca697-58a6-4bc2-bb4e-126351d8f168@00015d92-21ad-48a8-8445-a7d68bf899bd' +
        '&client_secret=9fGYej3TzgW3BNyN7V3I/M6kEjHyqrxLafrRVZm/lhc=' +
        '&resource=00000003-0000-0ff1-ce00-000000000000/mineriabreca.sharepoint.com/sites/AppMantenimiento@00015d92-21ad-48a8-8445-a7d68bf899bd';


    const handlechange = async () => {


        const response = await axios.get(url, requestBody, { headers })
            .then(response => {
                // Manejar la respuesta exitosa
                console.log(response.data);
                setData(response    )
            })
            .catch(error => {
                // Manejar el error
                console.error(error);
            })
    }
    return (
        <>
            <Navbar />
            <h1>response: {data}</h1>
            <button onClick={handlechange}>Call API</button>
        </>
    )
};
