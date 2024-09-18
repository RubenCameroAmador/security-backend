import { Schema, model } from "mongoose";

const user_schema = Schema({
    name: {
        type: String,
        require: true,
        min: 4,
        max: 16,
    },
    lastname: {
        type: String,
        require: true,
        min: 4,
        max: 16,
    },
    nickname: {
        type: String,
        require: true,
        min: 4,
        max: 16,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 256,
    },
});

export default model("user", user_schema);
