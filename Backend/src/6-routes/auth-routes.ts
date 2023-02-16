import express, { Request, Response, NextFunction } from "express";
import CredentialModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import authService from "../5-services/auth-service";

const router = express.Router(); 

// Post http://localhost:4000/api/auth/register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// Post http://localhost:4000/api/auth/login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
