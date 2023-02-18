import axios from "axios";
import AdminVacationModel from "../Models/AdminVacationModel";
import { VacationsActionType, adminVacationStore } from "../Redux/AdminVacationsState";
import appConfig from "../Utils/AppConfig";

class AdminVacationService {

    // Get all vacations
    public async getAllVacations(): Promise<AdminVacationModel[]> {

        // Take vacations from global state
        let vacations = adminVacationStore.getState().vacations;

        // If vacation
        if (vacations.length === 0) {

            // Get vacations from DB
            const response = await axios.get<AdminVacationModel[]>(appConfig.adminVacationsUrl);
            vacations = response.data;

            // Send vacations to redux global state and activate reducer
            adminVacationStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        // Return vacations
        return vacations;
    }

    // Get one vacation 
    public async getOneVacation(vacationId: number): Promise<AdminVacationModel> {

        // Take vacations from global state
        let vacations = adminVacationStore.getState().vacations;

        // Find needed vacation from global state
        let vacation = vacations.find(v => v.vacationId === vacationId)

        // If vacation not found
        if (!vacation) {

            // Get vacation from DB
            const response = await axios.get<AdminVacationModel>(appConfig.adminVacationsUrl + vacationId);
            vacation = response.data;
        }

        // Return vacation
        return vacation;
    }

    // Add new vacation
    public async addVacation(vacation: AdminVacationModel): Promise<void> {

        // Tell axios that we're sending text and file to backend:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send new vacation to DB
        const response = await axios.post<AdminVacationModel>(appConfig.adminVacationsUrl, vacation, { headers });
        const addedVacation = response.data;

        // Change imageName to absolute path before adding to redux
        addedVacation.imageName = appConfig.vacationImageUrl + addedVacation.imageName;
        
        // Send addedVacation to redux global state and activate reducer
        adminVacationStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });

    }

    // Update vacation
    public async updateVacation(vacation: AdminVacationModel): Promise<void> {

        // Tell axios that we're sending text and file to backend:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send updated vacation
        const response = await axios.put<AdminVacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data;

        // Change imageName to absolute path before adding to redux
        updatedVacation.imageName = appConfig.vacationImageUrl + updatedVacation.imageName;

        // Send updatedVacation to redux global state and activate reducer
        adminVacationStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });

    }

    // Delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.adminVacationsUrl + vacationId);

        // Send deleted id to redux global state and activate reducer
        adminVacationStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });

    }

}

const adminVacationService = new AdminVacationService();

export default adminVacationService;