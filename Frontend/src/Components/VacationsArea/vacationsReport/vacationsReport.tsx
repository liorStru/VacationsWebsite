import { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ReportModel from '../../../Models/ReportModel';
import adminVacationService from '../../../Services/AdminVacationsService';
import notify from '../../../Utils/Notify';
import "./vacationsReport.css";

// interface VacationData {
//     destination: string;
//     followerCount: number;
// }

function VacationsReport(): JSX.Element {

    const [vacationData, setVacationData] = useState<{ destination: string; followerCount: number }[]>([]);

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        adminVacationService.getFollowersByDestination()
            .then(report => {
                const vacationData = report.map(r => ({ destination: r.destination, followerCount: r.followersCount }));
                setVacationData(vacationData);
            })
            .catch(err => notify.error(err));
    }, []);


    return (
        <div className="vacationsReport" >
                {/* <h2>Vacations Report</h2> */}
                <Bar 
                    data={{
                        labels: vacationData.map(data => data.destination),
                        datasets: [{
                            label: 'Followers Count',
                            data: vacationData.map(data => data.followerCount),
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 1,
                        }]
                    }}
                    options={{
                        plugins: {
                            title: { display: true },
                            legend: { display: true, position: 'top' }
                        },
                        scales: {
                            y: { beginAtZero: true, ticks: { color: 'red' } },
                            x: { ticks: { color: 'white' } },
                        },
                    }}
                />
        </div>
    );
}

export default VacationsReport;
