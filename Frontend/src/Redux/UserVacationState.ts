import { createStore } from "redux";
import UserVacationModel from "../Models/UserVacationModel";

// 1. App - Application level state
export class UserVacationsState {
    public vacations: UserVacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:
export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    ResetVacations = "ResetVacations"

}

// 3. Action - a single object describing single operation on the data:
export interface VacationsAction {

    //what we need to do
    type: VacationsActionType;

    // what is the data needed
    payload: any;
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function):
export function vacationsReducer(currentState = new UserVacationsState(), action: VacationsAction): UserVacationsState {

    // Duplicate state for making changes
    const newState: UserVacationsState = { ...currentState };

    switch (action.type) {

        // Payload is empty arr
        case VacationsActionType.ResetVacations:
            newState.vacations = [];
            break;

        // Payload is a vacations
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break;

    }

    return newState;
}

// 5. store - Redux manager:
export const UserVacationStore = createStore(vacationsReducer);