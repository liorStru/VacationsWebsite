import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import { vacationStore, VacationsActionType } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AuthService {

    // Register: 
    public async register(user: UserModel): Promise<void> {

        // send user to backend
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // get the returned token
        const token = response.data;

        // Send token to global state
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }

    // Login:
    public async Login(credentials: CredentialsModel): Promise<void> {

        // send user to backend:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // get the returned toke:
        const token = response.data;

        // send toke to global state:
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    // Logout
    public logout(): void {

        // remove token from user
        authStore.dispatch({ type: AuthActionType.Logout });

        // Empty vacation store after logout
        vacationStore.dispatch({ type: VacationsActionType.ResetVacations, payload: [] });

    }

    // Is user logged in:
    public isLoggedIn(): boolean {

        return authStore.getState().token !== null;
        
    }

}

const authService = new AuthService();


export default authService;
