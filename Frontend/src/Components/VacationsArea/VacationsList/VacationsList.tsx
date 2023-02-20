import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminVacationModel from "../../../Models/AdminVacationModel";
import UserModel from "../../../Models/UserModel";
import UserVacationModel from "../../../Models/UserVacationModel";
import { adminVacationStore } from "../../../Redux/AdminVacationsState";
import { authStore } from "../../../Redux/AuthState";
import { UserVacationStore } from "../../../Redux/UserVacationState";
import adminVacationService from "../../../Services/AdminVacationsService";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationsCard from "../../VacationsArea/VacationsCard/VacationsCard";
import UserVacationCard from "../UserVacationCard/UserVacationCard";
import "./VacationsList.css";


function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<AdminVacationModel[]>([]);
    const [userVacations, setUserVacations] = useState<UserVacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();


    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // page pagintion logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userVacations.slice(indexOfFirstItem, indexOfLastItem);

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

        // Subscribe to changes in user vacations
        UserVacationStore.subscribe(() => setUserVacations(UserVacationStore.getState().vacations));

        // Subscribe to changes in admin vacations
        if (user?.role === "Admin") {
            adminVacationStore.subscribe(() => setVacations(adminVacationStore.getState().vacations));
        }

        // Listen to user changes
    }, [user, userVacations]);

    // onClkick next page
    const nextPage = () => {
        if (currentPage < Math.ceil(userVacations.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // onClkick previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (

        <div className="VacationsList">

            {/* Return UI for admin or user */}
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
                    {/* {userVacations.map(v => <UserVacationCard key={v.vacationId} vacation={v} />)} */}
                    {currentItems.map(v => <UserVacationCard key={v.vacationId} vacation={v} />)}
                    <div>
                        {/* next and previous page */}
                        <button onClick={prevPage}>Previous Page</button>
                        <button onClick={nextPage}>Next Page</button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default VacationsList;
