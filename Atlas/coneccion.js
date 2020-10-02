var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://jhonny95:369852147@1-1.xxloa.mongodb.net/Archivosdb?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Archivosdb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("archivos").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
})