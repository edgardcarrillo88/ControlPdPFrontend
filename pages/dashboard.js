import Navbar from '../component/navbar'

import axios from "axios"
import { useState } from "react";
import { useRouter } from "next/router";

export default function dashboard() {

    const [user, setUser] = useState({
        email: '',
        username: ''
    })

    const router = useRouter()

    const getprofile = async () => {
        const response = await axios.get('/api/profile')
        setUser(response.data)
    }

    const logoutProfile = async () => {
        const response = await axios.post('/api/auth/logout')
        console.log(response);
        router.push('/login')
    }

    const deleteall = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/delete`)
    }

    const deltehistory = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/deletehistory`)
    }

    return (
        <>
            <Navbar />
            <div>
                <h1>Dashboard</h1>
                <p>{JSON.stringify(user, null, 2)}</p>
                <button onClick={() => getprofile()}>get profile</button>
                <button onClick={() => logoutProfile()}>LogOut</button>
                {/* <button onClick={deleteall}>borrar datos</button>
                <button onClick={deltehistory}>borrar historico</button> */}

                <iframe
                    title="Report Section"
                    width="100%"
                    height="800"
                    src="https://app.powerbi.com/view?r=eyJrIjoiNjc2OTQ1YWUtNDU2Yi00YTI1LWFkMWItMjJjNzMwZGY5YmI1IiwidCI6IjAwMDE1ZDkyLTIxYWQtNDhhOC04NDQ1LWE3ZDY4YmY4OTliZCIsImMiOjR9"
                    frameborder="0"
                    allowFullScreen="true"
                ></iframe>
            </div>
        </>
    )
};
