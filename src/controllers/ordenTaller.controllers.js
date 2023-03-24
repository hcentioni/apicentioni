import { ordenTallerGet } from '../services/ordenTaller.service'

//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
const ordenTallerGetCtrl = async (req, res) => {

    const IdOrden = req.params.id;
    const responseOrdenTaller = await ordenTallerGet(IdOrden);
    if ( responseOrdenTaller ==='Orden_NoExiste'){
      res.status(400);
      res.send(responseOrdenTaller);
    }else{
      res.status(200);
      res.send(responseOrdenTaller);
    }
  }
  
  export { ordenTallerGetCtrl };