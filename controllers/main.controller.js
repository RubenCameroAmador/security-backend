import { constants } from "../services/utils/constants.js"
import { response } from "../services/utils/response.js"

const { status, message} = constants.response

const ping = (req, res) => {
    res
        .status(status.OK)
        .json(response(true, 'pong'))
}

const not_found = (req, res) => {
    res
        .status(status.not_found)
        .json(response(false, message.not_found))
}

export {
    ping,
    not_found
}