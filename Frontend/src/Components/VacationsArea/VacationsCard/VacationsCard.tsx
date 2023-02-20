import { NavLink } from "react-router-dom";
import AdminVacationModel from "../../../Models/AdminVacationModel";

interface VacationsCardProps {
    vacation: AdminVacationModel;
}

function VacationsCard(props: VacationsCardProps): JSX.Element {

    return (
        <div className="VacationsCard">
            <div>
                {props.vacation.destination}
                <br />
                {/* {props.vacation.description} */}
                <br />
                {AdminVacationModel.formatTime(props.vacation.startDate)}-{AdminVacationModel.formatTime(props.vacation.endDate)}
                <br />
                {props.vacation.price}$
                <br />
                <div>
                    <NavLink to={"/vacations/details/" + props.vacation.vacationId}>
                        <img alt="vacation" src={props.vacation.imageName} />
                    </NavLink>

                </div>
            </div>
        </div>
    );
}

export default VacationsCard;
