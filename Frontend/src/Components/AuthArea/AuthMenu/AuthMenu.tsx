import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        // get user for store to state
        setUser(authStore.getState().user);

        // listen to changes in store
        const unsubscribe = authStore.subscribe(() =>
            setUser(authStore.getState().user)
        )

        return () => unsubscribe();

    }, [user]);

    // Use authService for logout
    function logout() {
        authService.logout();
    }

    return (
        <div className="AuthMenu">

            {!user && <>

                <span>Hello Guest | </span>

                <NavLink to="/home">Login</NavLink>

                <span> | </span>

                <NavLink to="/register">Register</NavLink>

            </>}

            {user && <>

                <span>Hello {user.firstName} {user.lastName} | </span>

                <NavLink to="/home" onClick={logout}>Logout</NavLink>

            </>}

        </div>
    );
}

export default AuthMenu;
