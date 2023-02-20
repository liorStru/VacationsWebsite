import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { VacationsStore } from "../../../Redux/VacationsState";
import adminVacationService from "../../../Services/AdminVacationsService";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./DisplayVacations.css";

function DisplayVacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [VacationsPerPage, setItemsPerPage] = useState(10);

    // page pagintion logic
    const indexOfLastVacations = currentPage * VacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacations - VacationsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacations);

    useEffect(() => {

        // Get user from state into setUser
        setUser(authStore.getState().user);

    }, []);

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
                .then(dbVacations => setVacations(dbVacations))
                .catch(err => notify.error(err));
        }

        // Subscribe to changes in user vacations
        VacationsStore.subscribe(() => setVacations(VacationsStore.getState().vacations));


        console.log(currentVacations[0]?.isFollowing);
        console.log(currentVacations[0]?.followersCount);

        // Listen to user changes
    }, [user]);

    // onClkick next page
    const nextPage = () => {
        if (currentPage < Math.ceil(vacations.length / VacationsPerPage)) {
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
        <div className="DisplayVacations">

            {/* Spinner when loading vacations */}
            {vacations.length === 0 && <Spinner />}

            <h2>Our Vacations</h2>

            <div>
                {currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </div>
            <div>
                {/* next and previous page */}
                <button onClick={prevPage}>Previous Page</button>
                <button onClick={nextPage}>Next Page</button>
            </div>


        </div >
    );
}

export default DisplayVacations;
