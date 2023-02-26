import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, VacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class UserVacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {

        // Take vacations from global state
        let vacations = VacationsStore.getState().vacations;

        // If vacation
        if (vacations.length === 0) {

            // Get vacations from DB
            const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
            vacations = response.data;

            // Send vacations to redux global state and activate reducer
            VacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        // Return vacations
        return vacations
    }

    // follow vacation
    public async followVacation(vacationId: number): Promise<void> {

        // Follow vacation and update redux 
        return axios.post(appConfig.followVacationUrl + vacationId)
            .then(this.updateRedux)

    }

    // Unfollow vacation
    public async unfollowVacation(vacationId: number): Promise<void> {

        // unfollow vacation and update redux 
        return axios.delete(appConfig.unfollowVacationUrl + vacationId)
            .then(this.updateRedux)
    }

    // Func for updating redux with follow/unfollow on vacations
    public async updateRedux(): Promise<void> {

        // Get updated vacation from DB 
        const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
        // let vacations = response.data;
        const vacations = response.data;

        // Update redux
        VacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });

    }
}

const userVacationsService = new UserVacationsService();

export default userVacationsService;