import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import userVacationsService from "../5-services/user-vacations-service";
import vacationsService from "../5-services/user-vacations-service";

const router = express.Router();

// GET http://localhost:4000/api/users/vacations
router.get("/users/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacations = await userVacationsService.getAllVacations(user);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/users/follow/:vacationId
router.post("/users/follow/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await vacationsService.follow(user.userId, vacationId);
        response.sendStatus(201);

    }
    catch (err: any) {
        next(err);
    }
    
});

// DELETE http://localhost:4000/api/users/unfollow/:vacationId
router.delete("/users/unfollow/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await vacationsService.unfollow(user.userId, vacationId);
        response.sendStatus(204);

    }
    catch (err: any) {
        next(err);
    }
});

export default router;
