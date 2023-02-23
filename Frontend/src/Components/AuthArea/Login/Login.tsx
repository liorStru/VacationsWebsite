import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

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

    return (

        <div className="Login">
            <div className="LoginWrapper">
                <div className="Title">Login</div>
                <form onSubmit={handleSubmit(send)} >

                    <div className="input-container ic2">
                        <input id="email" className="input" type="text" placeholder=" "  {...register("email", CredentialsModel.emailValidation)} />
                        <div className="cut cut-short"></div>
                        <label htmlFor="email" className="placeholder">Email</label>
                        <span className="Err">{formState.errors.email?.message}</span>
                    </div>
                    <div className="input-container ic2">
                        <input id="password" className="input" type="password" placeholder=" " {...register("password", CredentialsModel.passwordValidation)} />
                        <div className="cut cut-short"></div>
                        <label htmlFor="password" className="placeholder">Password</label>
                        <span className="Err">{formState.errors.password?.message}</span>

                    </div>
                    <button className="submit">Login</button>

                    <div className="RegisterLink">
                        Not a member? <NavLink to="/register"> register</NavLink>
                    </div>

                    {/* <label>Email:</label>
                    <input type="text" {...register("email", CredentialsModel.emailValidation)} />
                    <span className="Err">{formState.errors.email?.message}</span>

                    <label>Password:</label>
                    <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                    <span className="Err">{formState.errors.password?.message}</span>

                    <button>Login</button>
                    <button type="button" onClick={handleClear}>Clear</button>

                    <span>
                        Not a member? <NavLink to="/register">register</NavLink>
                    </span> */}


                </form>

            </div>
        </div>
    );
}

export default Login;
