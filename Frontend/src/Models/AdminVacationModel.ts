import { RegisterOptions } from "react-hook-form";

class AdminVacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: File;

    // Validation for update and adding vacations
    public static destinationValidation: RegisterOptions = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 2, message: "destination must be minimum 2 chars" },
        maxLength: { value: 50, message: "destination can't exceeds 50 chars" }
    };

    public static descriptionValidation: RegisterOptions = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 5, message: "description must be minimum 5 chars" },
        maxLength: { value: 1000, message: "description can't exceeds 1000 chars" }
    };

    public static startDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing start date" },
        valueAsDate: true
    };

    public static endDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing end date" },
        valueAsDate: true
    };

    public static priceValidation: RegisterOptions = {
        required: { value: true, message: "Missing price" },
        min: { value: 100, message: "Price can't be less than 100" },
        max: { value: 10000, message: "Maximum price 10,000" }
    };

    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image" },

    };

    // Change date format 
    public static formatTime(time: string): string {
        const date = new Date(time);
        return date.toLocaleDateString("he-IL");
    }


}

export default AdminVacationModel;