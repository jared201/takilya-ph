exports.addOrders = function (body, req, callback){
    const { dbPool } = require ('./dbmodule');
    const db = new dbPool();
    const dataQuery = {};
    const secret = process.env.SECRET;
    let bodySecret = body.secret;
    
    dataQuery.text = 'INSERT INTO okra_orders (name, email, mobile, weight, address, secret,created_on) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7);'
    dataQuery.values = [body.name, body.email, body.mobile, body.weight, body.address, body.secret, new Date()];
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
                    callback(rowCount, errorMsg);
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

exports.getOrders = function (callback) {

}