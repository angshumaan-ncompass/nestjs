import * as bcrypt from 'bcrypt'

export const hashPassword = async (password) =>{
    const passwordHash = bcrypt.hash(password, 12)
    return passwordHash;
}