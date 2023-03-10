class AppConfig {
    
    public registerUrl = "http://localhost:4000/api/auth/register/";
    public loginUrl = "http://localhost:4000/api/auth/login/";
    public adminVacationsUrl = "http://localhost:4000/api/admin/vacations/";
    public adminReportUrl = "http://localhost:4000/api/admin/vacations/reports/";
    public userVacationsUrl = "http://localhost:4000/api/users/vacations/";
    public followVacationUrl = "http://localhost:4000/api/users/follow/";
    public unfollowVacationUrl = "http://localhost:4000/api/users/unfollow/";
    public vacationImageUrl = "http://localhost:4000/api/vacations/images/";
    
}

const appConfig = new AppConfig();

export default appConfig;
