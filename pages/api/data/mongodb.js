import database from '../../../project.json';

export default function getalldata(req, res) {
    return(
        database
    )
}

export async function getfiltereddata({projectId}) {
    
    console.log(projectId);
    const projectinfo = database.find((item) => item.id.toString() === projectId)

    return{
        id: projectId,
        data: projectinfo
    }
}