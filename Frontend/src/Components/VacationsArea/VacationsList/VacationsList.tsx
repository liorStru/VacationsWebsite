import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { VacationsStore } from "../../../Redux/VacationsState";
import adminVacationService from "../../../Services/AdminVacationsService";
import authService from "../../../Services/AuthService";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    const navigate = useNavigate();

    // States for vacations and user
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    // states for filter and pagination
    const [isFollowingFilter, setIsFollowingFilter] = useState(false);
    const [inFutureFilter, setInFutureFilter] = useState(false);
    const [inDateRangeFilter, setInDateRangeFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    // Update the current page to 0 when the filters change
    useEffect(() => {
        setCurrentPage(0);
    }, [isFollowingFilter, inFutureFilter, inDateRangeFilter]);

    //  Get user form store
    useEffect(() => {
        setUser(authStore.getState().user);

        // If no token
        if (!authService.isLoggedIn()) {

            // navigate to login
            navigate("/login");
        }
    }, []);

    // 
    useEffect(() => {

        // getVacations depending on user
        if (user?.role === "Admin") {
            adminVacationService
                .getAllVacations()
                .then(dbVacations => setVacations(dbVacations))
                .catch(err => notify.error(err));
        } else {
            userVacationsService
                .getAllVacations()
                .then(dbVacations => setVacations(dbVacations))
                .catch(err => notify.error(err));
        }

        // listen to vacationsStore changes
        const unsubscribe = VacationsStore.subscribe(() =>
            setVacations(VacationsStore.getState().vacations)
        );

        return () => unsubscribe();

    }, [user]);

    // vacations per page
    const vacationsPerPage = 10;

    // filter vacations according to checkboxes
    const filteredVacations = vacations
        .filter(v => (!isFollowingFilter || v.isFollowing === 1))
        .filter(v => (!inFutureFilter || new Date(v.startDate).getTime() > new Date().getTime()))
        .filter(v => (!inDateRangeFilter || (new Date(v.startDate).getTime() <= new Date().getTime() && new Date(v.endDate).getTime() >= new Date().getTime())));

    // Calc pages for pagination
    const pageCount = Math.ceil(filteredVacations.length / vacationsPerPage);

    // Getting specific vacations after filtering
    const paginatedVacations = filteredVacations.slice(currentPage * vacationsPerPage, (currentPage + 1) * vacationsPerPage);

    // Get num according to page clicked 
    const handlePages = (event: { selected: number }) => {

        // set page 
        setCurrentPage(event.selected);
    };

    return (
        <div className="VacationsList">

            {/* Spinner when loading vacations */}
            {vacations.length === 0 && <Spinner />}

            <h2>Our Vacations</h2>
            {user?.role === "User" &&
                <div>
                    <label>
                        <input type="checkbox" checked={isFollowingFilter} onChange={() => setIsFollowingFilter(!isFollowingFilter)} />
                        Liked vacations
                    </label>
                    <label>
                        <input type="checkbox" checked={inFutureFilter} onChange={() => setInFutureFilter(!inFutureFilter)} />
                        Upcoming vacations
                    </label>
                    <label>
                        <input type="checkbox" checked={inDateRangeFilter} onChange={() => setInDateRangeFilter(!inDateRangeFilter)} />
                        Ongoing vacations
                    </label>
                </div>
            }

            {/* Display Vacations */}
            <div>
                {paginatedVacations.map(v => (<VacationCard key={v.vacationId} vacation={v} />))}
            </div>

            {vacations.length > 0 && (

                // Pagination props
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next"
                    onPageChange={handlePages}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="previous"
                    activeClassName="active"
                    containerClassName="pagination"
                />
            )}
        </div>
    );
}

export default VacationsList;
