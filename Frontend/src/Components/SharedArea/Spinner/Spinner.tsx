import "./Spinner.css";
import imageSource from "../../../Assets/Images/loading.gif"

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img alt="spinner" src={imageSource} />
        </div>
    );
}

export default Spinner;
