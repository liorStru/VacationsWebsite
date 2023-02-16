import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

    // validation for adding vacation
    private static postValidationSchema = Joi.object({

        vacationId: Joi.number().forbidden().integer().positive(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(5).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().required().min(100).max(20000),
        imageName: Joi.string().forbidden().min(38).max(50),
        image: Joi.object().required()

    });
    
    // validation for updating vacation
    private static putValidationSchema = Joi.object({

        vacationId: Joi.number().required().integer().positive(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(5).max(100),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().required().min(100).max(20000),
        imageName: Joi.string().optional().min(38).max(50),
        image: Joi.object().optional()

    });

    public validatePost(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default VacationModel;