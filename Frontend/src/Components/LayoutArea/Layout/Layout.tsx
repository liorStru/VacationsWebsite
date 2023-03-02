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

        // get user for store to state
        setUser(authStore.getState().user);

        // listen to changes in store
        const unsubscribe = authStore.subscribe(() =>
            setUser(authStore.getState().user)
        )

        return () => unsubscribe();

    }, [user]);

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
