import express from 'express'
import connection from './database/db.js'
import router from './routes/main.route.js'
import cors from 'cors'
import { not_found } from './controllers/main.controller.js'
import rateLimit from 'express-rate-limit'

const app = express()
const port = process.env.PORT

await connection()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        message: "Too many requests, please try again later."
    }
})

app.use(cors())
app.use(express.json())

app.use('/api', limiter, router)
app.get('*', not_found)

app.listen(port, () => console.log(`Server running on port: ${port}`))
