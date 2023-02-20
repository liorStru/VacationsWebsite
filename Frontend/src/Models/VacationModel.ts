class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: File;
    public isFollowing: number;
    public followersCount: number;

    // Change date format 
    public static formatTime(time: string): string {
        const date = new Date(time);
        return date.toLocaleDateString("he-IL");
    }
}

export default VacationModel;