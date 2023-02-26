import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App - Application level state
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:
export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
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
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate state for making changes
    const newState: VacationsState = { ...currentState };

    switch (action.type) {

        // Payload is empty arr
        case VacationsActionType.ResetVacations:
            newState.vacations = [];
            break;

        // Payload is a vacations
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break;

        // Payload is a new vacation
        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload);

            // Sort vacations by startDate
            newState.vacations.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1);
            break;

        // Payload is a updated vacation
        case VacationsActionType.UpdateVacation:

            // Search global state for vacation by id
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;

                // Sort vacations by startDate
                newState.vacations.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1);
            }
            break;

        // Payload is a vacationId
        case VacationsActionType.DeleteVacation:

            // Search global state for vacation to delete
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }

            break;
    }

    return newState;
}

// 5. store - Redux manager:
export const VacationsStore = createStore(vacationsReducer);