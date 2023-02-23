import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import ReportModel from "../4-models/report-model";
import VacationModel from "../4-models/vacation-model";

// Get all vacations
async function getAllVacations(): Promise<VacationModel[]> {

    // Create sql query and execute
    const sql = `SELECT *, CONCAT( ?, imageName) AS imageName FROM vacations ORDER BY startDate`;
    const vacations = await dal.execute(sql, appConfig.vacationImagesAddress);
    
    // Return vacations
    return vacations;
}

// Get one vacation
async function getOneVacation(vacationId: number): Promise<VacationModel[]> {

    // Create sql query and execute
    const sql = `SELECT *, CONCAT( ?, imageName) AS imageName FROM vacations WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, appConfig.vacationImagesAddress, vacationId);

    // extract vacation
    const vacation = vacations[0];

    // Return vacation
    return vacation;
}

// Add new vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    // TODO: validation
    vacation.validatePost();

    // Save image to to disk and get its name
    vacation.imageName = await imageHandler.saveImage(vacation.image);

    // Create sql query and execute
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);

    // give new vacation a id
    vacation.vacationId = result.insertId;

    // Delete image file from vacation object
    delete vacation.image;
    
    // return added vacation
    return vacation;
}

// Update existing vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // validate:
    vacation.validatePut();

    // Get image name from database
    vacation.imageName = await getImageNameFromDb(vacation.vacationId);

    // Update existing image
    if (vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName);
    }
    // Create sql query
    const sql = `UPDATE vacations SET
                    destination = ?,
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    imageName = ?
                    WHERE vacationId = ?`;

    // Execute query
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);

    // If product not exist
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Delete image file from product object
    delete vacation.image;

    // Return updated product:
    return vacation;
}

// Delete vacation
async function deleteVacation(vacationId: number): Promise<void> {

    // Get image name from database:
    const imageName = await getImageNameFromDb(vacationId);

    // Delete that image 
    imageHandler.deleteImage(imageName);

    // create sql query & execute
    const sql = "DELETE FROM vacations WHERE vacationId =?";
    const result: OkPacket = await dal.execute(sql, vacationId);

    // if no such vacation throw error
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

// Get imageName from DB for update & delete
async function getImageNameFromDb(vacationId: number): Promise<string> {

    // Create sql query:
    const sql = "SELECT imageName FROM vacations WHERE vacationId = ?";

    // Get object array:
    const vacations = await dal.execute(sql, vacationId);

    // Extract single product:
    const vacation = vacations[0];

    // If no such product:
    if (!vacation) return null;

    // Return image name:
    return vacation.imageName;

}


// Get followers and destinations for admin report
async function getFollowersByDestination(): Promise<ReportModel[]> {

    // query for what is needed for report
    const sql = `
    SELECT DISTINCT
        V.destination,
        COUNT(F.userId) AS followersCount
    FROM vacations AS V LEFT JOIN followers AS F
    ON V.vacationId = F.vacationId
    GROUP BY V.vacationId
    `;

    // get report using dal
    const report = await dal.execute(sql);

    // return admin report
    return report;
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    getFollowersByDestination
}