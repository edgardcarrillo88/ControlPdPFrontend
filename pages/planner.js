import React, { useState } from 'react';
import Navbar from '../component/navbar';
import { Gantt } from "react-virtual-gantt";

export default function Planner() {

    const [data, setData] = useState([
        {
          key: "task-1",
          title: "Some task without data",
          children: [
            {
              key: "task-1-1",
              title: "Some non repeating task",
              data: {
                startDate: "2023-03-09T08:00:00.000Z",
                endDate: "2023-03-09T08:00:00.000Z",
              },
              children: [
                {
                  key: "task-1-1-1",
                  title: "Some weekly repeating task",
                  data: {
                    repeatType: "WEEK",
                    fromTime: 28800,
                    endDate: 64800,
                    weekdays: [1, 3, 6],
                  },
                },
              ],
            },
            {
              key: "task-1-2",
              title: "Some daily repeating task",
              data: {
                repeatType: "DAY",
                fromTime: 28800,
                endDate: 64800,
              },
            },
          ],
        },
        {
          key: "task-2",
          title: "Some monthly repeating task",
          data: {
            repeatType: "MONTH",
            fromTime: 28800,
            endDate: 64800,
            monthdays: [1, 3, 5, 9, 11, 14, 21, 31],
          },
        },
      ]);

    console.log(data);

    return (
        <>
            <Navbar />
            <h1>planner</h1>
            <div>
                <Gantt>
                    <Gantt.Controls />
                    <Gantt.Chart data={[
        {
          key: "task-1",
          title: "Some task without data",
          children: [
            {
              key: "task-1-1",
              title: "Some non repeating task",
              data: {
                startDate: "2023-03-09T08:00:00.000Z",
                endDate: "2023-03-09T08:00:00.000Z",
              },
              children: [
                {
                  key: "task-1-1-1",
                  title: "Some weekly repeating task",
                  data: {
                    repeatType: "WEEK",
                    fromTime: 28800,
                    endDate: 64800,
                    weekdays: [1, 3, 6],
                  },
                },
              ],
            },
            {
              key: "task-1-2",
              title: "Some daily repeating task",
              data: {
                repeatType: "DAY",
                fromTime: 28800,
                endDate: 64800,
              },
            },
          ],
        },
        {
          key: "task-2",
          title: "Some monthly repeating task",
          data: {
            repeatType: "MONTH",
            fromTime: 28800,
            endDate: 64800,
            monthdays: [1, 3, 5, 9, 11, 14, 21, 31],
          },
        },
      ]} />
                </Gantt>
            </div>
        </>
    );
}
