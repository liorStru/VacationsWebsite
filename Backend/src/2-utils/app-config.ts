class AppConfig {
    public port = 4000;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacationsDatabase"; 
    public vacationImagesAddress = `http://localhost:${this.port}/api/admin/vacations/images/`;
}

const appConfig = new AppConfig();

export default appConfig;
