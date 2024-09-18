import jwt from "jsonwebtoken";
import { constants } from "../utils/constants.js";
import { response } from "../utils/response.js";

const valid_token = (req, res, next) => {
    const { status, message } = constants.response;
    const { authorization } = req.headers;

    if (!authorization) return res.status(status.not_auth).json(response(false, message.not_auth));

    try {
        const token = jwt.verify(authorization, process.env.TOKEN);
        req.user = token.user;
        next();
    } catch (error) {
        res.status(status.not_auth).json(response(false, message.not_jwt));
    }
};

export { valid_token };
