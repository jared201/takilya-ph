const express = require ('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')

express()
    .use(express.static(path.join(__dirname, 'dist')))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .set('views', path.join(__dirname, 'dist'))
    .set('view engine', 'html')
    .get('/', (req, res)=>{
        console.log("Entry point");
        res.render('index.html');
    })
    .get('/test_api', (req, res)=>{
        console.log("test_api");
        res.status(200).send('OK');
    })
    .post('/test_add_orders', (req, res)=> {
        let body = req.body;
        const oc = require('./server/orderscontroller');
        oc.addOrders(body, req, (rowcount, errorMsg)=> {
            if (rowcount > 0){
                res.status(200).send('Orders submitted pending payment confirmation');
            } else {
                if (errorMsg != undefined){
                    res.status(404).send('Orders not sent');
                }
            }
        });
    })
    .get('/test_create_bucket', (req, res)=>{
        const obs = require('./server/bucket_operations');
        obs.createBucket('from-node', (message)=>{
            res.status(200).send(message);
        });
    })
    .get('/test_list_buckets', (req, res)=>{
        const obs = require ('./server/bucket_operations');
        obs.listBuckets((message)=>{
            let msg = JSON.stringify(message);
            res.status(200).send(msg);
        });
    })
    .get('/test_check_bucket', (req, res)=>{
        const obs = require ('./server/bucket_operations');
        obs.checkBucket('takilya-videos', (message)=>{
            res.status(200).send(message);
        });
    })
    .get('/test_delete_bucket', (req, res)=>{
        const obs = require('./server/bucket_operations');
        obs.deleteBucket('from-node', (message)=>{
            res.status(200).send(message);
        });
    })
    .get('/test_list_objects', (req, res)=>{
        const obs = require('./server/bucket_operations');
        obs.listObjects('takilya-videos', (message)=>{
            let msg = JSON.stringify(message);
            res.status(200).send(msg);
        });
    })
    .get('/test_create_folder', (req, res)=>{
        const obs = require('./server/bucket_operations');
        obs.createFolder('test-folder', 'takilya-videos', (message)=>{
            let msg = JSON.stringify(message);
            res.status(200).send(msg);
        });
    })
    .get('/test_delete_folder',(req, res)=>{
        const obs = require('./server/bucket_operations');
        obs.deleteFolder('test-folder', 'takilya-videos', (message)=>{
            res.status(200).send(message);
        });
    })
    .get('/test_file_upload', (req, res)=> {
        const obs = require('./server/bucket_operations');
        obs.uploadFile('test-upload2.txt', 'takilya-videos', (message)=>{
            res.status(200).send(message);
        });
    })
    .get('/test_delete_file', (req, res)=> {
        const obs = require('./server/bucket_operations');
        obs.deleteFile('test-upload2.txt', 'takilya-videos', (message)=>{
            res.status(200).send(message);
        });
    })
    .listen(PORT, ()=> console.log(`Listening on ${ PORT }`));