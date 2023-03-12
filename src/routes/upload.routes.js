import multer from 'multer';
import Router from 'express';
import fs from 'fs';

const router = Router()
const filesystem = fs.promises

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop(); 
    const fileName = Date.now(); 
    cb(null, `${fileName}.${ext}`); 
  },
  destination: function (req, file, cb) {
    cb(null, `./public`);
  },
});

const upload = multer({ storage });
  
router.post("/auth/upload", upload.single("myFile"), (req, res) => {
  
  const file = req.file;

  res.send({data:"ok", url:file.filename , name:file.originalname});

});

//ELEMINAR ARCHIVOS
router.delete('/auth/upload/:fileName', async(req,res)=>{
  console.log('Eliminando Archivo:',req.params.fileName)
  filesystem.unlink(`./public/${req.params.fileName}`)
  .then(() => {
    console.log('File removed')
    res.status(200).send('File removed');
  }).catch(err => {
    console.error('Something wrong happened removing the file')
    res.status(500).send('Something wrong happened removing the file');
  })
})

export default router