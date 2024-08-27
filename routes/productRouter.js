import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct} from '../controller/productController.js'

const productRouter = express.Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)

productRouter.post('/insert', insertProduct)

productRouter.patch('/update/:id', updateProduct)
productRouter.delete('/delete/:id', deleteProduct)

export default productRouter