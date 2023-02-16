import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();
    const formRef = useRef(null);

    async function send(credentials: CredentialsModel) {
        try {
            await authService.Login(credentials);
            notify.success("Welcome back");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    // Clears form on click
    const handleClear = () => {
        formRef.current.reset();
    };

    return (
        <div className="Login Box">
            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)} ref={formRef}>

                <label>Email:</label>
                <input type="text" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <label>Password:</label>
                <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <button>Login</button>
                <button type="button" onClick={handleClear}>Clear</button>

            </form>
        </div>
    );
}

export default Login;
