import RoleModel from "./role-model";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    // User validation schema
    private static ValidationSchema = Joi.object({

        userId: Joi.number().forbidden().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().required().email().min(2).max(50),
        password: Joi.string().required().min(2).max(256),
        role: Joi.string().forbidden()
    });

    public validate(): void {
        const result = UserModel.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default UserModel;