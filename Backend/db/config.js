const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("MONGODBURL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));
