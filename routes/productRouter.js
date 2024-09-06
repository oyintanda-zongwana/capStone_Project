import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct, addToCart} from '../controller/productController.js'
import { verifyAToken } from '../middleware/authenticate.js'

const productRouter = express.Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)

productRouter.post('/insert', insertProduct)
productRouter.post('/cart', verifyAToken, addToCart)

productRouter.patch('/update/:id', updateProduct)
productRouter.delete('/delete/:id', deleteProduct)

export default productRouter