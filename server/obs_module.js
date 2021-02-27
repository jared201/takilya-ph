exports.obsModule = function () {

    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    return obsClient;
}
