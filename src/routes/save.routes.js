import { Router } from  'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const filesystem = fs.promises
//GUARDO UN TOKEN PUSH
router.post('/save', (req,res)=>{

    //PROCESO LOCALEMNTE DESPUES DESARMAR

    const name = Math.floor(Date.now()/1000);
    
    let tokenBrowser =req.body;

    let data = JSON.stringify(tokenBrowser);
    

    // filesystem.writeFile(`./tokens/token-${name}.json`, data,calback(err | null) => {
    //     if (err) throw err;


    fs.writeFile(`./tokens/token-${name}.json`, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

    })

export default router