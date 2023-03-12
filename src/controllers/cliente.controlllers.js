import { clienteExiste } from '../services/cliente.service'

//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
const clienteExisteCtrl = async (req, res) => {
    let NroDocumento = null;
    if (req.query.NroDocumento) {
        NroDocumento = req.query.NroDocumento;
    };
   
    let idTipoDeDocuemento = null;
    if (req.query.idTipoDeDocuemento) {
        idTipoDeDocuemento = parseInt(req.query.idTipoDeDocuemento);
    };
  
    const responseClienteExiste = await clienteExiste(NroDocumento, idTipoDeDocuemento);
    if ( responseClienteExiste ==='Cliente_NoExiste'){
      res.status(400);
      res.send(responseClienteExiste);
    }else{
      res.status(200);
      res.send(responseClienteExiste);
    }
  }
  
  export { clienteExisteCtrl };