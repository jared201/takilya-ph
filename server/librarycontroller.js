exports.getLibrary = function (callback) {
    const { dbPool } = require ('./dbmodule');
    const db = new dbPool();
    const dataQuery = {};
    dataQuery.text = 'SELECT username, video_id, title, description, created_on, link, poster FROM LIBRARY;';
    (async ()=> {
        console.log("Connecting to DB...");
        const client = await db.connect();
        let rowCount = 0;
        let errorMsg = undefined;
        try {
            console.log('beginning transaction...');
            await client.query(dataQuery, (err, result) => {
                let library = [];
                
                let rowcount = 0
                try {
                  if (err) {
                    throw err
                  }
                  rowcount = result.rowCount
                  for (const rows of result.rows) {
                    let items = {};  
                    items.username = rows.username;
                    items.video_id = rows.video_id;
                    items.title = rows.title;
                    items.description = rows.description;
                    items.created_on = rows.created_on;
                    items.link = rows.link;
                    items.poster = rows.poster;
                    library.push(items);
                  }
                } catch (e) {
                  console.log(e)
                } finally {
                  callback(library, rowcount)
                }
              })            
        } catch (e){
            console.log('ROLLING BACK', e);
            await client.query('ROLLBACK;');
        } finally {
            
        }
    })().catch((e)=> console.log(e.stack));        
}
exports.addLibrary = function (title, description, username, link, callback){
  const { dbPool } = require ('./dbmodule');
  const db = new dbPool();
  const dataQuery = {};  
  dataQuery.text = 'INSERT INTO LIBRARY (username, title, description, created_on, link) ' +
                   'VALUES ($1, $2, $3, $4, $5);';
  dataQuery.values = [username, title, description, new Date(), link];
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