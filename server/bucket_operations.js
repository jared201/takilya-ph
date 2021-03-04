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
    obsClient.close();
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
    obsClient.close();
}
exports.checkBucket = function(bucketName, callback){
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.headBucket({
        Bucket: bucketName
    }, (err, result)=>{
        if (err){
            console.log('Error --> ' + err);
        } else {
            if (result.CommonMsg.Status < 300){
                callback(bucketName + ' already exists.');
            }else if (result.CommonMsg.Status === 404){
                callback(bucketName + ' does not exist');
            }
        }
    });
    obsClient.close();
}
exports.deleteBucket = function(bucketName, callback){
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.deleteBucket({
        Bucket: bucketName
    }, (err, result)=>{
        if (err){
            console.log('Error --> ' + err);
        } else {
            if (result.CommonMsg.Status < 300){
                callback(bucketName + ' has been deleted.');
            } else {
                callback (result.CommonMsg.Message);
            }
        }
    });
    obsClient.close();
}
exports.listObjects = function (bucketName, callback) {
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.listObjects({
        Bucket: bucketName,
        MaxKeys: 100
    }, (err, result)=>{
        if (err){
            callback({message: err});
        } else {
            if (result.CommonMsg.Status < 300){
                let contents = [];
                for (let j=0;j< result.InterfaceResult.Contents.length;j++) {
                    let content = {};
                    content.Key = result.InterfaceResult.Contents[j]['Key'];
                    content.LastModified = result.InterfaceResult.Contents[j]['LastModified'];
                    contents.push(content);
                }
                callback(contents);
            } else {
                callback({message: result.CommonMsg.Message});
            }
        }
    });
    obsClient.close();
}
exports.createFolder = function(folderName, bucketName, callback){
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.putObject({
        Bucket: bucketName,
        Key: folderName + '/'
    }, (err, result)=>{ 
        if (err){
            callback({message: err});
        } else {
            if (result.CommonMsg.Status < 300){
                callback({message: folderName + ' has been created.'});
            } else {
                callback ({message: result.CommonMsg.Message});
            }
        }
    });
    obsClient.close();
}
exports.deleteFolder = function(folderName, bucketName, callback){
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.deleteObject({
        Bucket: bucketName,
        Key: folderName + '/'
    }, (err, result)=>{
        if (err){
            callback({message: err});
        } else {
            if (result.CommonMsg.Status < 300){
                callback({message: folderName + ' has been deleted'});
            } else {
                callback({message: result.CommonMsg.Message});
            }
        }
    });
    obsClient.close();
}
exports.uploadFile = function(objectName, bucketName, callback){
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.putObject({
        Bucket: bucketName,
        Key: objectName,        
        ContentType: 'text/plain',
        SourceFile: 'static.json'
    }, (err,result)=>{
        if (err){
            callback({message: 'Error-> ' + err});
        } else {
            if (result.CommonMsg.Status < 300){
                callback({message: objectName + ' file has been uploaded.'});
            } else {
                callback({message: result.CommonMsg.Status});
            }
        }
    });
    obsClient.close();
}
exports.uploadVideoFile = function(key, bucketName, data, callback){
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.putObject({
        Bucket: bucketName,
        Key: key,        
        Body: data
    }, (err,result)=>{
        if (err){
            callback({message: 'Error-> ' + err});
        } else {
            if (result.CommonMsg.Status < 300){
                let link = 'https://' + bucketName + '.' + process.env.OBS_ENDPOINT + '/' + key;
                callback({message:' file has been uploaded.', link: link});
            } else {
                callback({message: result.CommonMsg.Status, err: 'Upload failed.'});
            }
        }
    });
    obsClient.close();
}
exports.deleteFile = function(objectName, bucketName, callback){
    var ObsClient = require('esdk-obs-nodejs');
    var obsClient = new ObsClient({
        access_key_id: process.env.OBS_ACCESS_KEY,
        secret_access_key: process.env.OBS_SECRET_KEY,
        server: process.env.OBS_ENDPOINT
    });
    obsClient.deleteObject({
        Bucket: bucketName,
        Key: objectName
    }, (err, result)=>{
        if (err) {
            callback({message: 'Error--> ' + err});
        } else {
            if (result.CommonMsg.Status < 300){
                callback({message: objectName + ' has been deleted.'})
            } else {
                callback ({message: result.CommonMsg.Message});
            }
        }
    });
    obsClient.close();
}