import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminVacationModel from "../../../Models/AdminVacationModel";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationStore } from "../../../Redux/VacationsState";
import adminVacationService from "../../../Services/AdminVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationsCard from "../../VacationsArea/VacationsCard/VacationsCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<AdminVacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        // Get all vacations from DB
        adminVacationService.getAllVacations()
            .then(dbVacations => {
                setVacations(dbVacations)
            })
            .catch(err => notify.error(err));

        // Listen to changes in redux and setVacations accordingly
        vacationStore.subscribe(() => { setVacations(vacationStore.getState().vacations) });

        // Get user from state into setUser
        setUser(authStore.getState().user);

        // Listen to auth store state changes
        authStore.subscribe(() => {

            setUser(authStore.getState().user);

        });

    }, []);

    return (
        <div className="VacationsList">
            {user && user.role === "Admin" &&
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
            }
        </div>
    );
}

export default VacationsList;
