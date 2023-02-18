import { ChangeEvent, useEffect, useState } from "react";
import UserVacationModel from "../../../Models/UserVacationModel";
import userVacationsService from "../../../Services/UserVacationsService";
import "./UserVacationCard.css";

interface UserVacationCardProps {
    vacation: UserVacationModel;
}

function UserVacationCard(props: UserVacationCardProps): JSX.Element {

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
                <input type="checkbox" onChange={handleFollowing} defaultChecked={isFollowed} />
                <br />
                {props.vacation.followersCount} Followers
                <br />
                <div>
                    <img alt="vacation" src={props.vacation.imageName} />
                </div>
            </div>
        </div>
    );
}

export default UserVacationCard;
