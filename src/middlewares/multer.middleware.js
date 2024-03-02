// import multer from "multer";
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/public/TEMP')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)    
//     }
//   })
  
// export const upload = multer(
//     { 
//       storage: storage 
//     })
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.join(__dirname, 'C:\\Users\\abhil\\OneDrive\\Desktop\\Backend\\public\\TEMP'));
    },
    filename: function (_req, file, cb) {
      cb(null, file.originalname);    
    }
});
  
export const upload = multer({ 
    storage: storage 
});
