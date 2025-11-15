const multer=require("multer");
const storage=multer.memoryStorage();
const uplaod=multer({storage:storage });
module.exports=uplaod;