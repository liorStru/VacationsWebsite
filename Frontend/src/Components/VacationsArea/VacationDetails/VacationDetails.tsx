import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationService from "../../../Services/AdminVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {

    const params = useParams();
    const navigate = useNavigate();

    const [vacation, setVacation] = useState<VacationModel>();

    useEffect(() => {
        adminVacationService.getOneVacation(+params.vacationId)
            .then(dbVacation => {
                setVacation(dbVacation);
            })
            .catch(err => notify.error(err));
    }, []);


    async function deleteVacation() {
        try {

            // Asking admin to confirm deleting
            const sure = window.confirm("Are you sure? action can't be undone!");
            if(!sure) return;

            // Delete from DB
             await adminVacationService.deleteVacation(vacation.vacationId);
             notify.success("Vacation has been deleted");

            // Return to vacations
             navigate("/vacations");

        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="VacationDetails">

            { !vacation && <Spinner /> }

            {vacation &&
                <>
                    <h2>{vacation.destination}</h2>
                    <h4>Description: {vacation.description}</h4>
                    <h4>Dates: {VacationModel.formatTime(vacation.startDate)} - {VacationModel.formatTime(vacation.endDate)}</h4>
                    <h5>Price: {vacation.price}</h5>
                    <img alt="vacation" src={vacation.imageName} />

                    <br /><br />

                    <NavLink to="/vacations">Back</NavLink>

                    <span> | </span>

                    <NavLink to={"/vacations/edit/" + vacation.vacationId}>Edit</NavLink>

                    <span> | </span>

                    <NavLink to="#" onClick={deleteVacation}>Delete</NavLink>
                </>
            }
        </div>
    );
}

export default VacationDetails;
