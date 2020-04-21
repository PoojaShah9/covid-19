let appConfig = {};

appConfig.port = 3001;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb+srv://ecommarcedb:Ab88Mi!318@mydb-i78bf.mongodb.net/covid19?retryWrites=true&w=majority'
    // uri: 'mongodb://localhost:27017/covid19'
  };
appConfig.apiVersion = '/api/v1';


module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion
};
