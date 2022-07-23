const CSVToJSON = require("csvtojson");
const mongoose = require("mongoose");

const main = async () => {
  try {
    mongoose.connect(
      "mongodb://localhost:27018/testdb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      async () => {
        const csvFilePath = "./listings.csv";
        const jsonArray = await CSVToJSON().fromFile(csvFilePath);

        const scheme = new mongoose.Schema({}, { strict: false,collection: "testcollection"});
        const csvModel = mongoose.model("testcollection", scheme);
        csvModel.insertMany(jsonArray, function (err, docs) {
          if (err) {
            console.log("ERR : 43")
            console.log(err);
          } 
        });
        console.log("connected to db");
      }
    );
  } catch (error) {
    console.log("ERROR : 50")
    console.log(error);
  }
};

main();
