import { tecnicosGet } from '../services/tecnicos.service'

//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
const tecnicosGetCtrl = async (req, res) => {
    let IdTecnico = null;
    if (req.query.IdTecnico) {
        IdTecnico = req.query.IdTecnico;
    };
   
    let Activo = null;
    if (req.query.Activo) {
        Activo = parseInt(req.query.Activo);
    };
  
    const responseTecnicos = await tecnicosGet(IdTecnico, Activo);
    if ( responseTecnicos ==='Tecnicos_NoExiste'){
      res.status(400);
      res.send(responseTecnicos);
    }else{
      res.status(200);
      res.send(responseTecnicos);
    }
  }
  
  export { tecnicosGetCtrl };