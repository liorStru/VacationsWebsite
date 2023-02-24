import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminVacationService from "../../../Services/AdminVacationsService";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>();
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {

        // Get user from state into setUser
        setUser(authStore.getState().user);

    }, [])

    // Handle checkbox onChange 
    function handleFollowing(event: ChangeEvent<HTMLInputElement>) {

        // if checkbox checked
        if (event.target.checked) {

            // follow vacation
            userVacationsService.followVacation(props.vacation.vacationId)
        }
        else {

            // unfollow vacation
            userVacationsService.unfollowVacation(props.vacation.vacationId)
        }

    }

    // default checkbox to false
    let isFollowed = false;

    // if .isFollowing true
    if (props.vacation.isFollowing) {

        // Set checkbox value to true
        isFollowed = true
    }

    // Handle description collapse btn
    const handleCollapse = () => {

        // set to false
        setIsCollapsed(!isCollapsed);
    };

    // On click delete vacation for admin
    async function deleteVacation() {
        try {

            // Asking admin to confirm deleting
            const sure = window.confirm("Are you sure? action can't be undone!");
            if (!sure) return;

            // Delete from DB
            await adminVacationService.deleteVacation(props.vacation.vacationId);
            notify.success("Vacation has been deleted");

            // Return to vacations
            navigate("/vacations");

        }
        catch (err: any) {
            notify.error(err);
        }
    }
    return (
        <div className="VacationCard">

            {user?.role === "Admin" ? (
                <>
                    {/* Admin vacation card */}
                    <div className="DestinationContainer">
                        {props.vacation.destination}
                    </div>
                        <img alt="vacation" src={props.vacation.imageName} />

                    <br />
                    <button onClick={handleCollapse}>
                        {isCollapsed ? "Read More" : "Read Less"}
                    </button>
                    <br />
                    {!isCollapsed && <p>{props.vacation.description}</p>}
                    <br />
                    {VacationModel.formatTime(props.vacation.startDate)}-{VacationModel.formatTime(props.vacation.endDate)}
                    <br />
                    {props.vacation.price}$
                    <br />

                    <br />

                    {/* update vacation link */}
                    <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>Edit </NavLink>
                    &nbsp; | &nbsp;

                    {/* Delete vacation link */}
                    <NavLink to="#" onClick={deleteVacation}>Delete</NavLink>

                </>
            ) : (
                <>
                    {/* User vacation card  */}
                    {props.vacation.destination}
                    <br />
                    <button onClick={handleCollapse}>
                        {isCollapsed ? "Read More" : "Read Less"}
                    </button>
                    <br />
                    {!isCollapsed && <p>{props.vacation.description}</p>}
                    <br />
                    {VacationModel.formatTime(props.vacation.startDate)}-{VacationModel.formatTime(props.vacation.endDate)}
                    <br />
                    {props.vacation.price}$
                    <br />
                    <input type="checkbox" onChange={handleFollowing} defaultChecked={isFollowed} />
                    <br />
                    {props.vacation.followersCount} Followers
                    <br />
                    <div>
                        <img alt="vacation" src={props.vacation.imageName} />
                    </div>

                </>
            )}

        </div>
    );
}

export default VacationCard;
