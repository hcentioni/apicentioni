import { verifyToken } from '../utils/jwt.handle'
const checkJwt = (req, res, next) => {
    try {
        const jwtByUser = req.headers.authorization;
        const jwt = jwtByUser.split(" ")[1];
        const isUser = verifyToken(`${jwt}`)
        if (!isUser) {
            res.status(401);
            res.send('NO_TIENES _SESION_VALIDA')
        } else {
            req.user = isUser
            next();
        }

    } catch (error) {
        res.status(400)
        res.json('SESSION_INVALID')
    }
};

export { checkJwt }