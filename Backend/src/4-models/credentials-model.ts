import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialModel {
    
    public email: string;
    public password:string;

    public constructor(user:CredentialModel){
        this.email = user.email;
        this.password = user.password;
    }

    //add validate
    private static ValidationSchema = Joi.object({
        email: Joi.string().required().email().min(2).max(50),
        password: Joi.string().required().min(2).max(256)

    });

    public validate(): void {
        const result = CredentialModel.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default CredentialModel;