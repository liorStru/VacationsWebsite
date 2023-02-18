import Login from "../../AuthArea/Login/Login";
import Header from "../../LayoutArea/Header/Header";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            
                <Header />

                <Login />
			
        </div>
    );
}

export default Home;
