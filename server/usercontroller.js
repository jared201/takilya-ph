exports.addUser = function (body, callback){
    const { dbPool } = require ('./dbmodule');
    const db = new dbPool();
    const dataQuery = {};
    const sha256 = require('js-sha256');
    const hashedpassword = sha256.sha256.hex(body.password);
    const hash = sha256.sha256.hex(body.mobile);
    dataQuery.text = 'INSERT INTO obs_users (username, mobile_num, password, activated, secret, hash, created_on) values ($1, $2,' +
        '$3, $4, $5, $6, $7);';
    //add the password encryptor    
    dataQuery.values = [body.email, body.mobile, hashedpassword, 'false', body.secret, hash, new Date()];
    (async ()=> {
        console.log("Connecting to DB...");
        const client = await db.connect();
        let rowCount = 0;
        let errorMsg = undefined;
        try {
            await client.query('BEGIN');
            await client.query(dataQuery, (err, result)=> {
                try {
                    if (err) {
                        throw err;
                    }
                    rowCount = result.rowCount;
                    
                } catch (er){
                    console.log('error rolling back ' + er.stack);
                    client.query('ROLLBACK;');
                    errorMsg = er;
                } finally {
                    client.release();
                    callback(rowCount, errorMsg, hash);
                }
            });
            await client.query('COMMIT;');
        } catch (e){
            console.log('ROLLING BACK', e);
            await client.query('ROLLBACK;');
        } finally {
            
        }
    })().catch((e)=> console.log(e.stack));    
}
exports.activateUser = function (email, hash, callback) {
    const { dbPool } = require ('./dbmodule');
    const db = new dbPool();
    const dataQuery = {};
    console.log ('Data:', {email: email, hash: hash});
    dataQuery.text = 'UPDATE obs_users SET activated = $1, last_modified = $2 WHERE username = $3 and hash = $4;';
    dataQuery.values = ['true', new Date(), email, hash];
    (async ()=> {
        console.log("Connecting to DB...");
        const client = await db.connect();
        let rowCount = 0;
        let errorMsg = undefined;
        try {
            console.log('beginning transaction...');
            await client.query('BEGIN');
            await client.query(dataQuery, (err, result)=> {
                try {
                    if (err) {
                        throw err;
                    }
                    rowCount = result.rowCount;
                    
                } catch (er){
                    console.log('error rolling back ' + er.stack);
                    client.query('ROLLBACK;');
                    errorMsg = er;
                } finally {
                    client.release();
                    callback(rowCount, errorMsg, hash);
                }
            });
            await client.query('COMMIT;');
        } catch (e){
            console.log('ROLLING BACK', e);
            await client.query('ROLLBACK;');
        } finally {
            
        }
    })().catch((e)=> console.log(e.stack));        

}
exports.getSecret = function (email, callback){
    const { dbPool } = require ('./dbmodule');
    const db = new dbPool();
    const dataQuery = {};
    dataQuery.text = 'SELECT secret FROM obs_users where username = $1';
    dataQuery.values = [email];
    (async ()=> {
        console.log("Connecting to DB...");
        const client = await db.connect();
        let rowCount = 0;
        let errorMsg = undefined;
        try {
            console.log('beginning transaction...');
            await client.query(dataQuery, (err, result) => {
                let secret;
                let rowcount = 0
                try {
                  if (err) {
                    throw err
                  }
                  rowcount = result.rowCount
                  for (const rows of result.rows) {
                    secret = rows.secret
                  }
                } catch (e) {
                  console.log(e)
                } finally {
                  callback(secret, rowcount)
                }
              })            
        } catch (e){
            console.log('ROLLING BACK', e);
            await client.query('ROLLBACK;');
        } finally {
            
        }
    })().catch((e)=> console.log(e.stack));       

}

exports.getUsernameFromSecret = function(secret, callback){
    const { dbPool } = require ('./dbmodule');
    const db = new dbPool();
    const dataQuery = {};
    dataQuery.text = 'SELECT username FROM obs_users where secret = $1 LIMIT 1;';
    dataQuery.values = [secret];
    (async ()=> {
        console.log("Connecting to DB...");
        const client = await db.connect();
        let rowCount = 0;
        let errorMsg = undefined;
        try {
            console.log('beginning transaction...');
            await client.query(dataQuery, (err, result) => {
                let username;
                let rowcount = 0
                try {
                  if (err) {
                    throw err
                  }
                  rowcount = result.rowCount
                  for (const rows of result.rows) {
                    username = rows.username;
                  }
                } catch (e) {
                  console.log(e)
                } finally {
                  callback(username, rowcount)
                }
              })            
        } catch (e){
            console.log('ROLLING BACK', e);
            await client.query('ROLLBACK;');
        } finally {
            
        }
    })().catch((e)=> console.log(e.stack));       

}
