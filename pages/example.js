import { useState, useEffect } from 'react';
import styles from '../styles/gantt.module.css'
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable'
import { Tooltip } from 'react-tooltip'

export default function example() {

    const [dates, setDates] = useState([])

    const [timebar, setTimebar] = useState({
        start: new Date(2020, 0, 1, 1, 0),
        end: new Date(2020, 0, 2, 0, 0),
        step: 1,
    });

    const [resources, setresources] = useState({
        Gruas: "3 horas",
        Andamios: "3 cuerpos",
        Mecanicos: "3 Meca.",
    });

    const [tasks, setTasks] = useState([
        {
            id: 1,
            start: new Date(2020, 0, 1, 1, 0),
            end: new Date(2020, 0, 1, 2, 0),
        },
        {
            id: 2,
            start: new Date(2020, 0, 1, 1, 0),
            end: new Date(2020, 0, 1, 8, 0),
        },
        {
            id: 3,
            start: new Date(2020, 0, 1, 1, 0),
            end: new Date(2020, 0, 1, 14, 0),
        },
        {
            id: 4,
            start: new Date(2020, 0, 1, 1, 0),
            end: new Date(2020, 0, 1, 12, 0),
        }
    ]);

    useEffect(() => {

        function fetchData() {
            let currentDate = new Date(timebar.start);
            const newDates = [];

            while (currentDate <= timebar.end) {
                newDates.push(new Date(currentDate));
                currentDate.setHours(currentDate.getHours() + timebar.step);
            }

            setDates(newDates);
        }
        fetchData()
    }, [])

    const generateDatesInRange = () => {

        const startDate = new Date(timebar.start);
        const endDate = new Date(timebar.end);

        let currentDate2 = new Date(startDate);
        const NewDates2 = [];

        while (currentDate2 <= endDate) {
            NewDates2.push(new Date(currentDate2));
            currentDate2.setHours(currentDate2.getHours() + timebar.step);
        }
        setDates(NewDates2);
    };



    // const generateDatesInRange = (start, end, step) => {
    //     const dates = [];
    //     let currentDate = new Date(start);

    //     while (currentDate <= end) {
    //         dates.push(new Date(currentDate));
    //         currentDate.setHours(currentDate.getHours() + step);
    //     }

    //     return dates;
    // };

    // const dates = generateDatesInRange(timebar.start, timebar.end, timebar.step);


    const calculateTaskPosition = (task) => {
        const startPosition = dates.findIndex((date) => date >= task.start);
        const endPosition = dates.findIndex((date) => date >= task.end);

        return { start: startPosition, end: endPosition };
    };


    const Handlesettingbar = (e) => {
        if (e.target.name === "start" || e.target.name === "end") {
            setTimebar({
                ...timebar,
                [e.target.name]: new Date(e.target.value).toString(),
            });
        } else {
            setTimebar({
                ...timebar,
                [e.target.name]: parseInt(e.target.value, 10)
            });
        }
    }

    // const [start, setStart] = useState(0);
    // const [end, setEnd] = useState(100);
    // const [progress, setProgress] = useState(50); // Valor de progreso inicial

    // // Función para manejar el arrastre de la barra de avance
    // const handleDrag = (e, ui) => {
    //     const newPosition = Math.max(0, Math.min(100, progress + (ui.deltaX * 100 / 200))); // Limita el rango de 0 a 100
    //     setProgress(newPosition);
    // };

    // const handleResize = (e, direction, ref, delta, position) => {
    //     const newWidth = ref.offsetWidth;
    //     const newProgress = (newWidth * 100) / (end - start);
    //     setProgress(newProgress);
    // };


    // const timelineStyle = {
    //     width: `${end - start}%`,
    //     marginLeft: `${start}%`,
    // };


    // Establece el estilo de la barra de avance en función del progreso
    // const progressBarStyle = {
    //     width: `${progress}%`,
    // };


    return (
        <>
            <div className={styles.mainoptionbar}>
                <div>
                    <p>F. inicio</p>
                    <input name='start' type='datetime-local' onChange={Handlesettingbar} data-tooltip-id="my-tooltip" data-tooltip-content="Ingresa la fecha de inicio"></input>
                    <Tooltip id="my-tooltip" />
                    {/* datetime-local */}
                </div>
                <div>
                    <p>F. fin</p>
                    <input name='end' type='datetime-local' onChange={Handlesettingbar}></input>
                </div>
                <div>
                    <p>step</p>
                    <select name='step' onChange={Handlesettingbar}>
                        <option>1</option>
                        <option>2</option>
                        <option>4</option>
                        <option>6</option>
                        <option>12</option>
                        <option>24</option>
                    </select>
                </div>
                <button onClick={generateDatesInRange}>Set</button>
            </div>
            <div>
                <ul className={styles.mainbar} >
                    {dates.map((date, index) => (
                        <div key={index}>
                            <p>{date.toLocaleString('es-ES', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: '2-digit'
                            })}</p>
                        </div>
                    ))}
                </ul>
            </div>

            <div className={styles.timeline}>
                {tasks.map((task) => {
                    const taskPosition = calculateTaskPosition(task);
                    const taskStyle = {
                        top: `${task.id * 50}px`,
                        left: `${(taskPosition.start / dates.length) * 100}%`,
                        width: `${((taskPosition.end - taskPosition.start) / dates.length) * 100}%`,
                        "margin-left": "25px",
                    };

                    return (
                        <>
                            <div key={task.id} className={styles.task} style={taskStyle} data-tooltip-id="my-tooltip2">
                                Task {task.id}
                            </div>
                            <Tooltip id="my-tooltip2">
                                <div style={{ display: 'flex', flexDirection: 'row', gap:'5px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>{resources.Gruas}</span>
                                        <span>{resources.Andamios}</span>
                                        <span>{resources.Mecanicos}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>abc</span>
                                        <span>abc</span>
                                        <span>abc</span>
                                    </div>
                                </div>
                            </Tooltip>
                        </>

                    );
                })}
            </div>

            {/* <div className={styles.timeline}>
                <Draggable
                    axis="x" // Solo permite el movimiento horizontal
                    bounds=".timeline" // Limita el arrastre a la barra de tiempo
                    onDrag={handleDrag}
                >
                    <Resizable // Usa Resizable para permitir redimensionar la barra de avance
                        width={200} // Establece un ancho inicial
                        height={20} // Establece una altura inicial
                        onResize={handleResize} // Maneja el redimensionamiento
                    >
                    <div className={styles.progressbar} style={progressBarStyle} onResize={handleResize}>
                        <div className={styles.progresshandle}>
                            <div className={styles.progresslabel}>{progress.toFixed(2)}%</div>
                        </div>
                    </div>
                </Resizable>
            </Draggable>
            </div > */}


        </>
    );
};
