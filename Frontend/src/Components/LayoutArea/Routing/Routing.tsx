import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationsReport from "../../VacationsArea/vacationsReport/vacationsReport";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    return (
        
        <Routes>

            {/* Register */}
            <Route path="/register" element={<Register />} />

            {/* Login */}
            {/* <Route path="/login" element={<Login />} /> */}

            {/* Home page */}
            <Route path="/home" element={<Home />} />

            {/* Vacations list */}
            <Route path="/vacations" element={<VacationsList />} />

            {/* Vacation Details */}
            {/* <Route path="/vacations/details/:vacationId" element={<VacationDetails />} /> */}

            {/* Add vacation */}
            <Route path="/vacations/new" element={<AddVacation />} />

            {/* Edit Vacation */}
            <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />

            {/* Default Route to home page */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* vacations report */}
            <Route path="/vacations/reports/" element={<VacationsReport />} />


            {/* Page nit found */}
            <Route path="/*" element={<PageNotFound />} />

        </Routes>
    );
}

export default Routing;
