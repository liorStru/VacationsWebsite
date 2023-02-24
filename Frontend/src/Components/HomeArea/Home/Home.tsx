import { NavLink } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Header from "../../LayoutArea/Header/Header";
import "./Home.css";

function Home(): JSX.Element {

    return (
        <div className="Home">

            <Header />

            <div className="HomeLayout">
                <div className="TextWrapper">
                    <div className="LoginRegister">
                        To enjoy our site please login or <NavLink to="/register">register</NavLink> as a member
                    </div>
                    Welcome to our unique vacations website! Create your personalized travel feed by following and unfollowing vacations that match your interests. Browse and compare a wide selection of vacation packages from beach getaways to outdoor adventures. Join our community of travelers and start exploring the world on your own terms!
                </div>
                <Login />
            </div>

        </div>
    );
}

export default Home;
