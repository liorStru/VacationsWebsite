import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();
    const formRef = useRef(null);

    // registers user onSubmit
    async function send(user: UserModel) {
        try {

            // Use service to register new user
            await authService.register(user);
            // notify.success("Welcome" + user.firstName);
            notify.success("Registered successfully");

            // navigate to vacations
            // navigate("/vacations");
            navigate("/login");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // Clears form on click
    const handleClear = () => {
      formRef.current.reset();
    };
    
    return (
        <div className="Register Box">

            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)} ref={formRef}>

                <label>First name:</label>
                <input type="text" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Err">{formState.errors.firstName?.message}</span>

                <label>Last name:</label>
                <input type="text" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Err">{formState.errors.lastName?.message}</span>

                <label>Email:</label>
                <input type="email" {...register("email", UserModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <label>Password:</label>
                <input type="password" {...register("password", UserModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <button>Register</button>
                <button type="button" onClick={handleClear}>Clear</button>

            </form>

        </div>
    );
}

export default Register;
