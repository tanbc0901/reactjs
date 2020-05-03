import React, { useEffect, useState } from 'react';
import { Analysis } from '../../models/analysis';
import { fetchData } from '../../data-source/fetch-data';

export function AnalysisData() {
    const [datas, setAnalysis] = useState<Analysis[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/analysis');

                setAnalysis(data);

            } catch (e) {
                setAnalysis([]);
            }
        })();
    }, []);

    return (
        <div>
            {
                datas.map((data) => {
                    return (
                        <div className="container">
                            <div className="icon" style={{ backgroundImage: "url(" + data.icon + ")", }} ></div>
                            <div className="title">{data.value}</div>
                            <div className="sub-title">{data.title}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}