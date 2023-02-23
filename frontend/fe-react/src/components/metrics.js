import React, { useState, useEffect } from "react";
import { Metric } from './metric'

export const Metrics = () => {
    const [data, setData] = useState([
        { 
            'key': 'x',
            'value': 0,
        },
        { 
            'key': 'y',
            'value': 0,
        },
        { 
            'key': 'z',
            'value': 0,
        },
    ]);
    console.log(data)
    window.robothubApi.onNotification(n => {
        if (n.payload.id == "gyroscope-xyz") {
            const data = [
                { 
                    'key': 'x',
                    'value': n.payload.value.x,
                },
                { 
                    'key': 'y',
                    'value': n.payload.value.y,
                },
                { 
                    'key': 'z',
                    'value': n.payload.value.z,
                },
            ];
            setData(data);
        }
    })

    return (
        <div className="gyroscope__metrics">
            {data.map((item) => (
                <Metric item={item} />
            ))}
        </div>
    );
};