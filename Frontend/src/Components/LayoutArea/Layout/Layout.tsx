import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {

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
        <div className="Layout">

            <nav>
                {/* If admin show menu */}
                {user?.role === "Admin" && <Menu />}
            </nav>

            <main className="Main">
                <AuthMenu />
                <Routing />
            </main>

        </div>
    );
}

export default Layout;
