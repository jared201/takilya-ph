exports.createBucket = function (bucketName, callback) {
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    var location = process.env.OBS_LOCATION;
    obsClient.createBucket({
        Bucket: bucketName,
        Location: location
    }, (err, result)=> {
        if (err){
            console.error('Error --> ' + err);
        }else {
            let message = bucketName + ' ' + result.CommonMsg.Message;
            callback (message);
        }
    });
}
exports.listBuckets = function(callback){
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.listBuckets({
        QueryLocation: true
    }, (err, result)=> {
        if (err) {
            console.error('Error --> ' + err);
            callback('No Result');
        } else {
            if (result.CommonMsg.Status < 300) {
                let buckets = [];
                
                for (let i =0;i<result.InterfaceResult.Buckets.length;i++){
                    let bucket = {};
                    bucket.BucketName = result.InterfaceResult.Buckets[i].BucketName;
                    buckets.push(bucket);
                }
                callback(buckets);
            }
        }
    });    
}
