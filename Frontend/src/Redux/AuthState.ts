import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. App - Application level state
export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    // load back token from storage if exists
    public constructor() {

        // Get token from storage if exists
        this.token = localStorage.getItem("token");
        if (this.token) {

            // Extract user from token 
            const userContainer = jwtDecode<{ user: UserModel }>(this.token);
            this.user = userContainer.user;
        }
    }
}

// 2. Action Type - list of actions needed on the data:
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Action - a single object describing single operation on the data:
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function):
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    // Duplicate state for making changes
    const newState = { ...currentState };

    switch (action.type) {

        case AuthActionType.Register:
        case AuthActionType.Login:

            // get token from payload
            newState.token = action.payload;

            // Extract user from token
            const userContainer = jwtDecode<{ user: UserModel }>(newState.token);
            newState.user = userContainer.user;

            // Save token to local storage
            localStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:

            // delete token for logout 
            newState.token = null;
            newState.user = null;

            // remove token from local storage
            localStorage.removeItem("token");

            break;
    }

    // return new state to authStore
    return newState;

}

// 5. Store
export const authStore = createStore(authReducer);