import express from 'express'
import router from './routes/main.route.js'
import cors from 'cors'
import { not_found } from './controllers/main.controller.js'

const app = express()
const port = process.env.PORT

app.use(cors())

app.use('/api', router)
app.get('*', not_found)

app.listen(port, () => console.log(`Server running on port: ${port}`))