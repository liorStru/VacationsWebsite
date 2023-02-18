class AppConfig {
    
    public registerUrl = "http://localhost:4000/api/auth/register/";
    public loginUrl = "http://localhost:4000/api/auth/login/";
    public adminVacationsUrl = "http://localhost:4000/api/admin/vacations/";
    public userVacationsUrl = "http://localhost:4000/api/users/vacations/";
    public vacationImageUrl = "http://localhost:4000/api/vacations/images/";
    
}

const appConfig = new AppConfig();

export default appConfig;
