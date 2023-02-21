import { useEffect, useState } from "react";
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

    // states for filters
    const [isFollowing, setIsFollowing] = useState(false);
    const [isUpcoming, setIsUpcoming] = useState(false);
    const [isOngoing, setIsOngoing] = useState(false);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [VacationsPerPage, setItemsPerPage] = useState(10);

    // page pagination logic
    const indexOfLastVacations = currentPage * VacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacations - VacationsPerPage;
    let currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacations);

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

    // Sets isFollowing according to checkbox
    const handleFollowingChange = () => {
        setIsFollowing(!isFollowing);

        // set page to 1 on every click
        setCurrentPage(1);

    };

    // Sets isUpcoming according to checkbox
    const handleUpcomingChange = () => {
        setIsUpcoming(!isUpcoming);

        // set page to 1 on every click
        setCurrentPage(1);

    };

    // Sets isOngoing according to checkbox
    const handleOngoingChange = () => {
        setIsOngoing(!isOngoing);

        // set page to 1 on every click
        setCurrentPage(1);

    };

    // Update vacations with filter based on checkbox state
    currentVacations = vacations
        .filter(v => !isFollowing || v.isFollowing === 1)
        .filter(v => !isUpcoming || new Date(v.startDate) > new Date())
        .filter(v => !isOngoing || (new Date(v.startDate) <= new Date() && new Date(v.endDate) >= new Date()))
        .slice(indexOfFirstVacation, indexOfLastVacations);

    // onClick next page
    const nextPage = () => {
        if (currentPage < Math.ceil(vacations.length / VacationsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // onClick previous page
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
            {user?.role === "User" &&
                <>
                    {/* Filtering checkboxes */}
                    <label>
                        <input type="checkbox" checked={isFollowing} onChange={handleFollowingChange} />
                        Liked vacations
                    </label>
                    <label>
                        <input type="checkbox" checked={isUpcoming} onChange={handleUpcomingChange} />
                        Upcoming vacations
                    </label>
                    <label>
                        <input type="checkbox" checked={isOngoing} onChange={handleOngoingChange} />
                        Ongoing vacations
                    </label>
                </>
            }
            
            {/* Display vacations  */}
            <div>
                {currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </div>

            <div>
                <button onClick={prevPage}>Previous Page</button>
                {currentPage}
                <button onClick={nextPage}>Next Page</button>
            </div>

        </div >
    );
}

export default DisplayVacations;
