import { loginUser,loginOperadores } from '../services/auth.service';


const registerCtr = async (req, res) => {

};

//CONTROLADOR DE LOGUINS PARA CLIENTES
const loginCtrl = async (req, res) => {

  const { userName, userPass } = req.body;
  
  const responseUser = await loginUser(userName, userPass);

  if (responseUser === 'USER_INCORRECT' || responseUser === 'PASSWORD_INCORRECT') {
    res.status(403);
    res.send('DATOS INCORRECTOS');
  } else {
    res.status(200);
    res.json(responseUser)
  }
}

//CONTROLADOR DE LOGUINS PARA OPERADORES
const loginOperadoresCtrl = async (req, res) => {

  const { userName, userPass } = req.body;
  
  const responseOperador = await loginOperadores(userName, userPass);

  if (responseOperador === 'USER_PASSWORD_INCORRECT') {
    res.status(403);
    res.send('DATOS INCORRECTOS');
  } else {
    res.status(200);
    res.json(responseOperador)
  }
}

export { registerCtr, loginCtrl ,loginOperadoresCtrl};