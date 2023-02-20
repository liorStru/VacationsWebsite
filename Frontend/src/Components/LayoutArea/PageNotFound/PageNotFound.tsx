import "./PageNotFound.css";
import imageSource from "../../../Assets/Images/page-not-found.jpg"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">

			<img alt="pageNotFound" src={imageSource} />
            
        </div>
    );
}

export default PageNotFound;
