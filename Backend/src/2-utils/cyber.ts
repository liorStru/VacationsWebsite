import UserModel from "../4-models/user-model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request } from "express";
import { AuthenticationError } from "../4-models/client-errors";
import crypto from "crypto";
import RoleModel from "../4-models/role-model";

const secretKey = "4578-86 Students Are Amazing!";

function createNewToken(user: UserModel): string {

    // Remove password:
    delete user.password;

    // Create container for the user object:
    const container = { user };

    // Create options: 
    const options = { expiresIn: "5h" };

    // Create the token:
    const token = jwt.sign(container, secretKey, options);

    return token;
}

// Verify if token is valid
function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {

            // Extract authorization header:
            const header = request.header("authorization");

            // if missing:
            if (!header) {
                reject(new AuthenticationError("Invalid token"));
                return;
            }

            // Extract token:
            const token = header.substring(7);

            // If missing:
            if (!token) {
                reject(new AuthenticationError("Invalid token"));
                return;
            }

            // Verify:
            jwt.verify(token, secretKey, (err: JsonWebTokenError) => {

                // console.log(err);

                // If token not valid:
                if (err) {
                    reject(new AuthenticationError("Invalid token"));
                    return;
                }

                // Here the token must be valid:
                resolve(true);
            });

        }
        catch (err: any) {
            reject(err);
        }
    });

}

// Verify if token is valid
async function verifyAdmin(request: Request): Promise<boolean> {

    await verifyToken(request);
    const user = getUserFromToken(request);
    return user.role === RoleModel.Admin;
}

function getUserFromToken(request: Request): UserModel {
    const header = request.header("authorization");
    const token = header.substring(7);
    const user: UserModel = (jwt.decode(token) as any).user;
    return user;

}

// Hash password: 
function hashPassword(plainText: string): string {

    if (!plainText) return null;

    // Hashing with salt: 
    const salt = "MakeThingsGoRight";
    const hashedPassword = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedPassword;
}

export default {
    createNewToken,
    verifyToken,
    hashPassword,
    verifyAdmin,
    getUserFromToken

};