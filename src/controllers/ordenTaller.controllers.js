import { ordenTallerGet ,ordenTallerConsultaWebGet} from '../services/ordenTaller.service'

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
  
  //OBTENER DATOS DE UNA ORDEN CONSULTA WEE
const ordenTallerConsultaWebGetCtrl = async (req, res) => {

  const { CodigoCliente, Nro, IdOrden } = req.body;
  
  const responseOrdenTaller = await ordenTallerConsultaWebGet(CodigoCliente,Nro,IdOrden);
  if ( responseOrdenTaller ==='Orden_NoExiste'){
    res.status(400);
    res.send(responseOrdenTaller);
  }else{
    res.status(200);
    res.send(responseOrdenTaller);
  }
}

  export { ordenTallerGetCtrl,ordenTallerConsultaWebGetCtrl };