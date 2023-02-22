import axios from "axios";
import ReportModel from "../Models/ReportModel";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, VacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AdminVacationService {

    // Get all vacations
    public async getAllVacations(): Promise<VacationModel[]> {

        // Take vacations from global state
        let vacations = VacationsStore.getState().vacations;

        // If vacation
        if (vacations.length === 0) {

            // Get vacations from DB
            const response = await axios.get<VacationModel[]>(appConfig.adminVacationsUrl);
            vacations = response.data;

            // Send vacations to redux global state and activate reducer
            VacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        // Return vacations
        return vacations;
    }

    // Get one vacation 
    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        // Take vacations from global state
        let vacations = VacationsStore.getState().vacations;

        // Find needed vacation from global state
        let vacation = vacations.find(v => v.vacationId === vacationId)

        // If vacation not found
        if (!vacation) {

            // Get vacation from DB
            const response = await axios.get<VacationModel>(appConfig.adminVacationsUrl + vacationId);
            vacation = response.data;
        }

        // Return vacation
        return vacation;
    }

    // Add new vacation
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Tell axios that we're sending text and file to backend:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send new vacation to DB
        const response = await axios.post<VacationModel>(appConfig.adminVacationsUrl, vacation, { headers });
        const addedVacation = response.data;

        // Change imageName to absolute path before adding to redux
        addedVacation.imageName = appConfig.vacationImageUrl + addedVacation.imageName;

        // Send addedVacation to redux global state and activate reducer
        VacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });

    }

    // Update vacation
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Tell axios that we're sending text and file to backend:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send updated vacation
        const response = await axios.put<VacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data;

        // Change imageName to absolute path before adding to redux
        updatedVacation.imageName = appConfig.vacationImageUrl + updatedVacation.imageName;

        // Send updatedVacation to redux global state and activate reducer
        VacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });

    }

    // Delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.adminVacationsUrl + vacationId);

        // Send deleted id to redux global state and activate reducer
        VacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });

    }

    public async getFollowersByDestination(): Promise<ReportModel[]> {
        const response = await axios.get<ReportModel[]>(appConfig.adminReportUrl);
        const report = response.data

        return report
    }
}

const adminVacationService = new AdminVacationService();

export default adminVacationService;