import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'

let port = process.env.PORT || 6969
const app = express()

app.use(cors({
    origin: 'http://localhost:8080',
    // origin: 'https://capstone-c3781.web.app',
    credentials: true
}))
app.use(express.json())

app.use(express.static('public'))
app.use('/users', userRouter)
app.use('/products', productRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log(`Server is running on port ${port}`)
})