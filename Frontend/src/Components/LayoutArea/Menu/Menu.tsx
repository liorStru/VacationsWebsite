import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        // Get user from state into setUser
        setUser(authStore.getState().user);

        // Listen to auth store state changes
        authStore.subscribe(() => {

            setUser(authStore.getState().user);

        });

    }, []);

    return (
        <div className="Menu">

            {/* Login/logout menu */}
            <AuthMenu />

            {/* If admin show menu  */}
            {user?.role === "Admin" &&
                <>
                    <NavLink to="/vacations">Vacations</NavLink>
                    <span> | </span>
                    < NavLink to="/vacations/new">Add Vacation</NavLink>
                    <span> | </span>
                    <NavLink to="/vacations/reports">Reports</NavLink>
                </>
            }
        </div>
    );
}

export default Menu;
