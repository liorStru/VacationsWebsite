import { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CSVLink } from 'react-csv'
import adminVacationService from '../../../Services/AdminVacationsService';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import notify from '../../../Utils/Notify';
import "./vacationsReport.css";

function VacationsReport(): JSX.Element {

    // states for reports avd csv download
    const [vacationData, setVacationData] = useState<{ destination: string; followerCount: number }[]>([]);
    const [csvData, setCsvData] = useState([]);

    // props for reports
    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    // Get data for report and csv file
    useEffect(() => {

        // Use service func
        adminVacationService.getFollowersByDestination()
            .then(report => {

                // map report and set data for report and csv
                const vacationData = report.map(r => ({ destination: r.destination, followerCount: r.followersCount }));
                setVacationData(vacationData);
                setCsvData(vacationData);
            })
            .catch(err => notify.error(err));
    }, []);


    return (
        <div className="vacationsReport" >

            {/* Link for csv download */}
            <CSVLink data={csvData} filename={'vacation_data.csv'}>
                <button className='Csv'><SystemUpdateAltIcon fontSize='medium'/>CSV</button>
            </CSVLink>

            {/* Props needed for report */}
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
