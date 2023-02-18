import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

// All vacations for user
async function getAllVacations(user: UserModel): Promise<VacationModel> {

    // query for what is needed for user vacations
    const sql = `
    SELECT DISTINCT
        V.*,
        EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
        COUNT(F.userId) AS followersCount,
        CONCAT(?, imageName) AS imageName
    FROM vacations AS V LEFT JOIN followers AS F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY startDate
    `;

    // get vacations using dal
    const vacations = await dal.execute(sql, user.userId, appConfig.vacationImagesAddress);

    // return user vacations
    return vacations;
}

// Follow vacation
async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = "INSERT INTO followers VALUES(?, ?)";
    await dal.execute(sql, userId, vacationId);
}

// Unfollow vacation
async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    await dal.execute(sql, userId, vacationId);
}

export default {
    getAllVacations,
    follow,
    unfollow
};
