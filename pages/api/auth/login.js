import jwt from "jsonwebtoken"
import { serialize } from "cookie"

export default function loginHandler(req, res) {

    const { email, password } = req.body

    if (email === 'ea_carrillo@hotmail.com' && password === '123') {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: 'ea_carrillo@hotmail.com',
            username: 'carrillo'
        }, 'secret')//este secret debería ser una variable de entorno

        const serialized = serialize('MyTokenName',token,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',//none para comunicarse con otro dominio
            MaxAge: 1000*60*60*24*30,
            path: '/'
        })
    
        res.setHeader('Set-Cookie',serialized)
        return (
            res.json({response:'Inicio de sesión exitoso', token:token})
        )
    }
    return res.status(401).json({error:'correo o contraseña incorrecto'})
};
