import mongoose from "mongoose"

const userdb = process.env.USERDB
const passdb = process.env.PASSDB
const hostdb = process.env.HOSTDB
const namedb = process.env.NAMEDB

const url = `mongodb+srv://${userdb}:${passdb}@${hostdb}/${namedb}?retryWrites=true&w=majority`

const connection = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.log('Error connecting to the database:', error);
        process.exit(1)
    }
}

export default connection
