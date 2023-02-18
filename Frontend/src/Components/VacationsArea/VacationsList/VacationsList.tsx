import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminVacationModel from "../../../Models/AdminVacationModel";
import UserModel from "../../../Models/UserModel";
import UserVacationModel from "../../../Models/UserVacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminVacationService from "../../../Services/AdminVacationsService";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationsCard from "../../VacationsArea/VacationsCard/VacationsCard";
import UserVacationCard from "../UserVacationCard/UserVacationCard";
import "./VacationsList.css";


function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<AdminVacationModel[]>([]);
    const [UserVacations, setUserVacations] = useState<UserVacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    // useEffect(() => {

    // Get user from state into setUser
    // setUser(authStore.getState().user);

    // // Listen to auth store state changes
    // authStore.subscribe(() => {

    //     setUser(authStore.getState().user);

    // });

    // }, [])

    useEffect(() => {

        // Get user from state into setUser
        setUser(authStore.getState().user);

    }, [])

    useEffect(() => {

        // Get vacations depending on role
        if (user?.role === "Admin") {

            // Get all admin vacations from DB
            adminVacationService.getAllVacations()
                .then(dbVacations => setVacations(dbVacations))
                .catch(err => notify.error(err));
        }
        else {

            // Get all user vacations from DB
            userVacationsService.getAllVacations()
                .then(dbVacations => setUserVacations(dbVacations))
                .catch(err => notify.error(err));
        }

        // // Subscribe to changes in user vacations
        // UserVacationStore.subscribe(() => setUserVacations(UserVacationStore.getState().vacations));

        // // Subscribe to changes in admin vacations
        // if (user?.role === "Admin") {
        //     vacationStore.subscribe(() => setVacations(vacationStore.getState().vacations));
        // }

    // Listen to user changes
    }, [user]);

    return (

        <div className="VacationsList">
            {user?.role === "Admin" ? (
                <>
                    {/* Spinner when loading vacations */}
                    {vacations.length === 0 && <Spinner />}

                    {/* link to adding vacation */}
                    <NavLink to="/vacations/new">Add Vacation</NavLink>

                    <h2>Our Vacations</h2>

                    <div>
                        {/* displaying vacations using VacationCard */}
                        {vacations.map(v => <VacationsCard key={v.vacationId} vacation={v} />)}
                    </div>
                </>
            ) : (
                <div>
                    {/* displaying vacations using UserVacationCard */}
                    {UserVacations.map(v => <UserVacationCard key={v.vacationId} vacation={v} />)}

                </div>
            )}
        </div>
    );
}

export default VacationsList;
