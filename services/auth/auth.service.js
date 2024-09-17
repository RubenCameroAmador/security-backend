import { response } from "../utils/response.js"
import User from '../../models/user.js'
import { login_regex, user_regex } from "../validations/auth.validation.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const register = async user_request => {

    const { error } = user_regex.validate(user_request)
    if (error) return response(false, error.details[0].message)

    const is_nickname = await User.findOne({ nickname: user_request.nickname })
    if (is_nickname) return response(false, 'Nickname already exist')

    delete user_request.confirm_password

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user_request.password, salt)

    user_request = {
        ...user_request,
        password: hash
    }

    const new_user = new User(user_request)

    await new_user.save()

    const user = { ...new_user.toObject() }

    delete user.password

    return response(true, 'User created', { user })
}

const login = async (login_request) => {

    const { error } = login_regex.validate(login_request)
    if (error) return response(false, error.details[0].message)

    const user_db = await User.findOne({ nickname: login_request.nickname })
    if (!user_db) return response(false, 'User don\'t exist')

    const validPassword = await bcrypt.compare(login_request.password, user_db.password)
    if (!validPassword) return response(false, 'Incorrect password')

    const user = { ...user_db.toObject() }

    delete user.password

    const payload = { user }

    const sign_options = { expiresIn: '3600s' }

    const token = jwt.sign(payload, process.env.TOKEN, sign_options)

    return response(true, 'Login success', token)
}

export {
    register,
    login
}
