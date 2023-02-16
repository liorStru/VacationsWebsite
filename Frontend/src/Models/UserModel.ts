import { RegisterOptions } from "react-hook-form";

class UserModel {

	public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: string;

    public static firstNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing first name" },
        minLength: { value: 2, message: "First name must be minimum 2 chars" },
        maxLength: { value: 20, message: "First name can't exceed 20 chars" }
    }

    public static lastNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing last name" },
        minLength: { value: 2, message: "Last name must be minimum 2 chars" },
        maxLength: { value: 20, message: "Last name can't exceed 20 chars" }
    }

    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing email" },
        minLength: { value: 2, message: "Email must be minimum 2 chars" },
        maxLength: { value: 50, message: "Email can't exceed 50 chars" }
    }

    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 2, message: "Password must be minimum 4 chars" },
        maxLength: { value: 50, message: "Password can't exceed 256 chars" }
    }
    
}

export default UserModel;
