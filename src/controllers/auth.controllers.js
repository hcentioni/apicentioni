import { loginUser } from '../services/auth.service';


const registerCtr = async (req, res) => {

};

//const loginCtrl = async (body,res) => {
const loginCtrl = async (req, res) => {

  const { userName, userPass } = req.body;
  console.log('Nuevo Login: ',userName, userPass)
  const responseUser = await loginUser(userName, userPass);

  if (responseUser === 'USER_INCORRECT' || responseUser === 'PASSWORD_INCORRECT') {
    res.status(403);
    res.send('DATOS INCORRECTOS');
  } else {
    res.status(200);
    res.json(responseUser)
  }



}

export { registerCtr, loginCtrl };