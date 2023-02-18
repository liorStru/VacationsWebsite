import axios from "axios";
import UserVacationModel from "../Models/UserVacationModel";
import { UserVacationStore, VacationsActionType } from "../Redux/UserVacationState";
import appConfig from "../Utils/AppConfig";

class UserVacationsService {

    // Get all vacations
    public async getAllVacations(): Promise<UserVacationModel[]> {

        // Take vacations from global state
        let vacations = UserVacationStore.getState().vacations;

        // If vacation
        if (vacations.length === 0) {

            // Get vacations from DB
            const response = await axios.get<UserVacationModel[]>(appConfig.userVacationsUrl);
            vacations = response.data;

            // Send vacations to redux global state and activate reducer
            UserVacationStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        // Return vacations
        return vacations
    }
}

const userVacationsService = new UserVacationsService();

export default userVacationsService;