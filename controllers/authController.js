import User from '../models/User.js'
import { sendEmailVerification, sendEmailPasswordReset } from '../emails/authEmailService.js'
import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {
    
    // Valida todos los campos
    if(Object.values(req.body).includes('')) {
        const error = new Error('All fields are mandatory')
        return res.status(400).json({ msg: error.message })
    }

    const { email, password, name } = req.body

    // Evitar registros duplicados
    const userExists = await User.findOne({ email })
    if(userExists) {
        const error = new Error('User already exist')
        return res.status(400).json({ msg: error.message })
    }

    // Validar la extensión del password
    const MIN_PASSWORD_LENGTH = 6
    if(password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`The password must contain ${MIN_PASSWORD_LENGTH} characters`)
        return res.status(400).json({ msg: error.message })
    }

    try {
        const user = new User(req.body)
        const result = await user.save()

        const { name, email, token} = result
        
        sendEmailVerification({name, email, token })

        res.json({
            msg: 'The user was created correctly, check your email'
        })
    } catch (error) {
        console.log(error)   
    }
}

const verifyAccount = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('There was an error, invalid token')
        return res.status(401).json({msg: error.message})
    }

    // Si el token es valido, confirmar la cuenta
    try {
        user.verified = true
        user.token = ''
        await user.save();
        res.json({msg: 'Successfully Confirmed User'})
    } catch (error) {
        console.log(error)   
    }
} 

const login = async (req, res) => {
    const { email, password } = req.body

    // Revisar que el usuario exista
    const user = await User.findOne({email})
    if(!user) {
        const error = new Error('Username does not exist')
        return res.status(401).json({msg: error.message})
    }

    // Revisar si el usuario confirmo su cuenta
    if(!user.verified) {
        const error = new Error('Your account has not been confirmed yet')
        return res.status(401).json({msg: error.message})
    }

    // Comprobar el password
    if(await user.checkPassword(password)) {
        const token = generateJWT(user._id)
        res.json({
            token
        })
    } else {
        const error = new Error('The password is incorrect')
        return res.status(401).json({msg: error.message})
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    // Comprobar si existe el usuario
    const user = await User.findOne({email})
    if(!user) {
        const error = new Error('User do not exist')
        return res.status(404).json({msg: error.message})
    }

    try {
        user.token = uniqueId()
        const result = await user.save()
        
        await sendEmailPasswordReset({
            name: result.name,
            email: result.email,
            token: result.token
        })
    
        res.json({
            msg: 'We have sent an email with instructions'
        })
    } catch (error) {
        console.log(error)
    }
}

const verifyPasswordResetToken = async (req, res) => {
    const { token } = req.params

    const isValidToken = await User.findOne({token})
    
    if(!isValidToken) {
        const error = new Error('There was an error, Invalid Token')
        return res.status(400).json({msg: error.message})
    }

    res.json({msg: 'Invalid Token'})
}

const updatePassword = async (req, res) => {

    const { token } = req.params
    const user = await User.findOne({token})
    if(!user) {
        const error = new Error('There was an error, Invalid Token')
        return res.status(400).json({msg: error.message})
    }

    const { password } = req.body
    
    try {
        user.token = ''
        user.password = password
        await user.save()
        res.json({
            msg: 'Password successfully modified'
        })
    } catch (error) {
        console.log(error)
    }
}

const user = async (req, res) => {
    const { user } = req
    res.json(
        user
    )
}

const admin = async (req, res) => {
    const { user } = req
    
    if(!user.admin) {
        const error = new Error('Invalid Acction')
        return res.status(403).json({msg: error.message})
    }

    res.json(
        user
    )
}



export {
    register,
    verifyAccount,
    login,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    user,
    admin
}