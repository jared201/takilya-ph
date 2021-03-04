const express = require ('express')
const path = require('path')
const muliparty = require('multiparty');
const PORT = process.env.PORT || 5000
//const bodyParser = require('body-parser');

express()
    .use(express.static(path.join(__dirname, 'dist')))
    //.use(bodyParser.urlencoded({extended: true, limit: '2000mb'}))
    //.use(bodyParser.json({limit: '2000mb'}))
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
    .post('/signup', (req, res)=> {
        //console.log(req.body);
        const uc = require('./server/usercontroller');        
        uc.addUser(req.body, (rowcount, err, hash)=>{
            if (rowcount > 0){
                const mg = require ('./server/mailgunner');
                mg.sendNodeMail(req.body.email, hash, req, (body)=>{
                    console.log('Email sent: ' + body);
                    res.status(200).send('User has been registered please check email to activate account.');                            
                });
                
            } else {
                res.status(200).send('Registration failed.');
                console.log('Signup error: -->' + err);
            }
        })
    })
    .get('/activate', (req, res)=>{
        console.log({email: req.query.email, hash: req.query.hash});
        const uc = require('./server/usercontroller');
        const obs = require('./server/bucket_operations');
        uc.activateUser(req.query.email, req.query.hash, (rowcount, err, hash)=>{
            if (rowcount > 0) {
                uc.getSecret(req.query.email, (secret, rowCnt)=>{
                    if (rowCnt > 0){
                        obs.createFolder(secret, 'takilya-videos', (message)=>{
                            let msg = JSON.stringify(message);
                            console.log(msg);
                            res.redirect("/#/login");                        });
                         
                    }
                });
            } else {
                console.log('Error: ' + err);
                res.redirect('/');
            }
        })
        
    })
    .get('/get_library', (req, res)=>{
        const lc = require ('./server/librarycontroller');
        lc.getLibrary((library,rowcount)=>{
            if (rowcount>0){
                console.log(JSON.stringify(library));
                res.status(200).send(JSON.stringify(library));
            }
        });
    })
    .post('/upload', (req, res)=>{
        const bo = require('./server/bucket_operations');
        const lc = require('./server/librarycontroller');
        const uc = require('./server/usercontroller');
        const form = new muliparty.Form();
        var description;
        var title;
        var secret;
                
        form.on('field', function(name, value) {
            if (name === 'description'){
                description = value;
            }
            if (name === 'title'){
                title = value;
            }
            if (name === 'secret') {
                secret = value;                
            }
            console.log ('Fields: ' + title + ', ' + description + ', ' + secret);
            //res.status(200).send("Testing upload");

        });
        form.on('part', function(part){
            console.log('Filename: ', part.filename);

            let key = secret + "/" + part.filename;
            let link = '';
            bo.uploadVideoFile(key, 'takilya-videos', part, (message)=>{
                link = message.link;
                uc.getUsernameFromSecret(secret, (username, rowcount)=>{
                    if (rowcount > 0){
                        lc.addLibrary(title, description, username, link, (rowcount, errMsg)=>{
                            if (rowcount > 0){
                                res.status(200).send(part.filename +  " " + message.message);
                            }else {
                                res.status(200).send(errMsg + ' Upload failed.');
                            }
                        });
                    }
                });
                
            });
            
        });
        form.on('error', (err)=>{
            console.log(err);
            res.status(200).send(err);
        });
        form.parse(req);
       
    })
    .listen(PORT, ()=> console.log(`Listening on ${ PORT }`));