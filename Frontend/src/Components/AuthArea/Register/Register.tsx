import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    // registers user onSubmit
    async function send(user: UserModel) {
        try {

            // Use service to register new user
            await authService.register(user);
            // notify.success("Welcome" + user.firstName);
            notify.success("Registered successfully");

            // navigate to vacations
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (

        <div className="Register">

            {/* <h2 className="RegisterHeader">Register</h2> */}
            <div className="RegisterWrapper">
                <div className="Title">Register</div>

                <form onSubmit={handleSubmit(send)}>
                    <div className="input-container ic2">
                        <input id="firstName" className="input" type="text" placeholder=" " {...register("firstName", UserModel.firstNameValidation)} />
                        <div className="cut cut-short"></div>
                        <label htmlFor="firstName" className="placeholder">First name:</label>
                        <span className="Error">{formState.errors.firstName?.message}</span>
                    </div>
                    <div className="input-container ic2">
                        <input id="lastName" className="input" type="text" placeholder=" " {...register("lastName", UserModel.lastNameValidation)} />
                        <div className="cut cut-short"></div>
                        <label htmlFor="lastName" className="placeholder">Last name:</label>
                        <span className="Error">{formState.errors.lastName?.message}</span>
                    </div>

                    <div className="input-container ic2">
                        <input id="email" className="input" type="text" placeholder=" "  {...register("email", UserModel.emailValidation)} />
                        <div className="cut cut-short"></div>
                        <label htmlFor="email" className="placeholder">Email</label>
                        <span className="Error">{formState.errors.email?.message}</span>
                    </div>
                    <div className="input-container ic2">
                        <input id="password" className="input" type="password" placeholder=" " {...register("password", UserModel.passwordValidation)} />
                        <div className="cut cut-short"></div>
                        <label htmlFor="password" className="placeholder">Password</label>
                        <span className="Error">{formState.errors.password?.message}</span>
                    </div>

                    <button className="submit">Register</button>

                    <div className="LoginLink">
                        Already a member? <NavLink to="/home"> Login </NavLink>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;
