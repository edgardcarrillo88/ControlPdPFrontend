import database from '../../../project.json';
import fs from 'fs';

export default function editdata(req,res) {
    
    console.log(req.body);
    console.log(req.method);
    
    const item = database.find((item) => item.id === req.body.id);
    console.log(item);
    item.Comentarios = req.body.comment;
    res.status(200)

};
