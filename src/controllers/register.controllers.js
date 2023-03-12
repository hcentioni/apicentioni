import { addUser, existUser } from '../services/register.service'
import { jConfig } from '../config/mails';
import * as nodemailer from 'nodemailer';

//AGREGAR UNO USUARIO
const addUserCtrl = async (req, res) => {

  //CARGO LAS VARIABLES DEL BODY
  const { Apellido, Nombre, Area, Puesto, Pass, Login, IdCliente, Dni } = req.body;

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
  if (responseUsers === 'USER_NOT_ADD') {
    res.status(400);
    res.send(responseUsers);
  } else {

    //Envio la notificacion
    enviarMailNotificacion(user);

    //respondo la peticion
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

  if (responseUsers === 'USER_IS_EXIST') {
    res.status(200);
    res.send('1');
  } else {
    res.status(200);
    res.send('0');
  }
}

function enviarMailNotificacion(user){
 try {
  //YA SE INSERTO ENVIO MAIL AL NUEVO USUSARIO
    //ENVIO DE MAILS
    let email = {
      from: "no-reply@centioni.com.ar",  //remitente
      to: user.Login,  //destinatario
      subject: "Nuevo mensaje de usuario",  //asunto del correo
      html: 
      ` 
      <h1 style="text-align:center"><span style="font-size:22px"><strong>Bienvendio a la mesa de ayuda de Centioni Servicios Inform&aacute;ticos S.R.L</strong></span></h1>

      <p>Estimado/a: ${user.Apellido} ${user.Nombre} </p>
      
      <p>Su registro se realizo perfectamente, ya puede utilizar nuestro sistema de ticket.</p>
      
      <p>Su nombre usuario es: ${user.Login}</p>

      <p>Ya puedes ingresar desde:  https://soporte.centioni.com.ar/#/login</p>
      
  `
    };
    //


    let createTransport = nodemailer.createTransport(jConfig);

    //
    
    createTransport.sendMail(email, function (error, info) {
      if (error) {
        console.log("Error al enviar email",error);
      } else {
        console.log("Correo enviado correctamente");
      }
      createTransport.close();
    });
  
 } catch (error) {
  console.log(error);
 }
}

export { addUserCtrl, existUserCtrl };