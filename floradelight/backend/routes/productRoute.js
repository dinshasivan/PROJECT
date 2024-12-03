import { Router } from "express";
import {addProduct,getProduct,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = Router()

productRouter.post('/add-product',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},]),addProduct)
productRouter.post('/get-product',getProduct)
productRouter.post('/remove-product',adminAuth,removeProduct)
productRouter.post('/single-product',singleProduct)

export default productRouter;
