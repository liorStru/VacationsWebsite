import UserVacationModel from "../../../Models/UserVacationModel";
import "./UserVacationCard.css";

interface UserVacationCardProps {
    vacation: UserVacationModel;
}

function UserVacationCard(props: UserVacationCardProps): JSX.Element {
    return (
        <div className="UserVacationCard">
            <div>
                {props.vacation.destination}
                <br />
                {props.vacation.description}
                <br />
                {UserVacationModel.formatTime(props.vacation.startDate)}-{UserVacationModel.formatTime(props.vacation.endDate)}
                <br />
                {props.vacation.price}$
                <br />
                {props.vacation.isFollowing}
                <br />
                <div>
                    <img alt="vacation" src={props.vacation.imageName} />

                </div>
            </div>
        </div>
    );
}

export default UserVacationCard;
