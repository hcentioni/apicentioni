import { hash, compare } from "bcrypt";
const encrypt = async (pass) => {
    const passwordHash = await hash(pass, 8)
    return passwordHash
}
const verified = async (pass, passHash) => {
    const isCorrect = await compare(pass, passHash);
    return isCorrect
}

export { encrypt, verified }