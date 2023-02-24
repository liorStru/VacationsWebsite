import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {

    return (
        <div className="Menu">

            {/* Admin menu  */}
            <NavLink to="/vacations">Vacations</NavLink>
            <span> | </span>
            < NavLink to="/vacations/new">Add Vacation</NavLink>
            <span> | </span>
            <NavLink to="/vacations/reports">Reports</NavLink>

        </div>
    );
}

export default Menu;
