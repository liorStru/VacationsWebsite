import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminVacationService from "../../../Services/AdminVacationsService";
import userVacationsService from "../../../Services/UserVacationsService";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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

    // onClick follow/unfollow func
    function handleFollowing() {
        if (props.vacation.isFollowing) {
            // unfollow vacation
            userVacationsService.unfollowVacation(props.vacation.vacationId);
        } else {
            // follow vacation
            userVacationsService.followVacation(props.vacation.vacationId);
        }
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

    // sets all icons to empty hart  
    let isFollowedIcon = <FavoriteBorderIcon color="error" />;

    if (props.vacation.isFollowing) {

        // if user following show full hart
        isFollowedIcon = <FavoriteIcon color="error" />;
    }

    return (
        <div className="VacationCard">

            {/* Admin vacation card */}
            {user?.role === "Admin" ? (
                <div className="AdminCard">
                    <div className="DestinationContainer">
                        {props.vacation.destination}
                    </div>
                    <img alt="vacation" src={props.vacation.imageName} />
                    <div className="PriceContainer">
                        {props.vacation.price}$
                    </div>
                    <div className="LinksContainer">
                        {/* update vacation link */}
                        <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>
                            <EditOutlinedIcon fontSize="large" />
                        </NavLink>
                        &nbsp;&nbsp;
                        {/* Delete vacation link */}
                        <NavLink to="#" onClick={deleteVacation}>
                            <DeleteOutlineOutlinedIcon fontSize="large" />
                        </NavLink>
                    </div>
                    <div className="DescriptionContainer">
                        {isCollapsed ? (
                            <>
                                {props.vacation.description.slice(0, 85)}...
                                <span onClick={handleCollapse} className="ReadMore">
                                    Read More
                                </span>
                            </>
                        ) : (
                            <>
                                {props.vacation.description}
                                <span onClick={handleCollapse} className="ReadMore">
                                    &nbsp;&nbsp;
                                    Read Less
                                </span>
                            </>
                        )}
                    </div >
                    <div className="DateContainer">
                        {VacationModel.formatTime(props.vacation.startDate)}&nbsp;-&nbsp;
                        {VacationModel.formatTime(props.vacation.endDate)}
                    </div >
                </div>
            ) : (
                <div className="UserCard">
                    <div className="DestinationContainer">
                        {props.vacation.destination}
                    </div>
                    <img alt="vacation" src={props.vacation.imageName} />
                    <div className="PriceContainer">
                        {props.vacation.price}$
                    </div>
                    <div className="DescriptionContainer">
                        {isCollapsed ? (
                            <>
                                {props.vacation.description.slice(0, 85)}...
                                <span onClick={handleCollapse} className="ReadMore">
                                    Read More
                                </span>
                            </>
                        ) : (
                            <>
                                {props.vacation.description}
                                <span onClick={handleCollapse} className="ReadMore">
                                    &nbsp;&nbsp;
                                    Read Less
                                </span>
                            </>
                        )}
                    </div >
                    <div className="DateContainer">
                        {VacationModel.formatTime(props.vacation.startDate)}&nbsp;-&nbsp;
                        {VacationModel.formatTime(props.vacation.endDate)}
                    </div >

                    <div className="FollowersContainer">
                        <div className={`${props.vacation.isFollowing ? 'is-following' : 'not-following'}`}>
                            <button onClick={handleFollowing}>{isFollowedIcon}</button>
                            {props.vacation.followersCount}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default VacationCard;
