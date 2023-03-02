import { RegisterOptions } from "react-hook-form";

class CredentialsModel {

    public email: string;
    public password: string;
    
    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing email" },
        minLength: { value: 2, message: "Email must be minimum 2 chars" },
        maxLength: { value: 50, message: "Email can't exceed 50 chars" },
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Incorrect email format"
          }
    }

    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password must be minimum 4 chars" },
        maxLength: { value: 256, message: "Password can't exceed 256 chars" }
    }
}

export default CredentialsModel;
