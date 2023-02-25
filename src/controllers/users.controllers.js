import {addUser, getUsers, editUser,deleteUser, existUser } from '../services/users.service'

//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
const getUsersCtrl = async (req, res) => {
  
  let IdCliente = null;
  if (req.query.IdCliente) {
    IdCliente = parseInt(req.query.IdCliente);
  };
 
 

  let IdClienteContacto = null;
  if (req.query.IdClienteContacto) {
    IdClienteContacto = parseInt(req.query.IdClienteContacto);
  };

  const responseUsers = await getUsers(IdClienteContacto, IdCliente);
  if (responseUsers==='!USER_INCORRECT'){
    res.status(400);
    res.send(responseUsers);
  }else{
    res.status(200);
    res.send(responseUsers);
  }
}

//EDITAR UNO USUARIO
const editUserCtrl = async (req, res) => {
  //VERIFICO QUE MANDE EL ID PARA EDITAR
  if (!req.params.id) {
    res.status(400);
    res.send('No Shipping Parameters');
  }

  //CARGO LAS VARIABLES DEL BODY
  const { Apellido, Nombre, Area, Puesto, Dni } = req.body;
 
  //CARGO EL ID A EDITAR
  let IdClienteContacto = req.params.id;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const user = {
    IdClienteContacto,
    Apellido,
    Nombre,
    Area,
    Puesto,
    Dni
  }
 
  //LLAMO AL SERVICIO
  const responseUsers = await editUser(user);
  if (responseUsers==='USER_NOT_EDIT'){
    res.status(400);
    res.json(responseUsers);
  }else{
    res.status(200);
    res.json(responseUsers);
  }
}

//ELIMINO UNO USUARIO
const deleteUserCtrl = async (req, res) => {

  //VERIFICO QUE MANDE EL ID PARA ELIMINAR
  if (!req.params.id) {
    res.status(400);
    res.send('No Shipping Parameters');
  }

  //CARGO EL ID A ELIMINAR
  let IdClienteContacto = req.params.id;
 
  //LLAMO AL SERVICIO
  const responseUsers = await deleteUser(IdClienteContacto);
  if (responseUsers==='USER_NOT_DELETE'){
    res.status(400);
    res.json(responseUsers);
  }else{
    res.status(200);
    res.json(responseUsers);
  }
}

//AGREGAR UNO USUARIO
const addUserCtrl = async (req, res) => {
  
  //CARGO LAS VARIABLES DEL BODY
  const { Apellido, Nombre, Area, Puesto,Pass,Login,IdCliente,Dni } = req.body;
  
  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const user = {
    Apellido,
    Nombre,
    Area,
    Puesto,
    Pass,
    Login,
    IdCliente,
    Dni
  }
 
  //LLAMO AL SERVICIO
  const responseUsers = await addUser(user);
  if (responseUsers==='USER_NOT_ADD'){
    res.status(400);
    res.send(responseUsers);
  }else{
    res.status(200);
    res.json(responseUsers);
  }

}

//VERIFICO SI EXISTE EL USERNAME
const existUserCtrl = async (req, res) => {

  const userName = req.params.id;

  //CARGO LAS VARIABLES DE LA QUERY

  //LLAMO AL SERVICIO
  const responseUsers = await existUser(userName);
  if (responseUsers==='USER_IS_EXIST'){
    res.status(200);
    res.send('1');
  }else{
    res.status(200);
    res.send('0');
  }
}
export { addUserCtrl, getUsersCtrl ,editUserCtrl,deleteUserCtrl,existUserCtrl };