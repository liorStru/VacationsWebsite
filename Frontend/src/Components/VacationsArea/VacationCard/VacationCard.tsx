import { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import userVacationsService from "../../../Services/UserVacationsService";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const [user, setUser] = useState<UserModel>();

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
    return (
        <div className="VacationCard">

            {user?.role === "Admin" ? (
                <>
                    {props.vacation.destination}
                    <br />
                    {/* {props.vacation.description} */}
                    <br />
                    {VacationModel.formatTime(props.vacation.startDate)}-{VacationModel.formatTime(props.vacation.endDate)}
                    <br />
                    {props.vacation.price}$
                    <br />
                    <div>
                        <NavLink to={"/vacations/details/" + props.vacation.vacationId}>
                            <img alt="vacation" src={props.vacation.imageName} />
                        </NavLink>

                    </div>
                </>
            ) : (
                <>
                    {props.vacation.destination}
                    <br />
                    {props.vacation.description}
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
