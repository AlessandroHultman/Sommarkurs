import { Router } from 'express';
import { product_post, products_get } from '../controllers/productController.js';

const productRoutes = Router();

productRoutes.post('/product', product_post);

productRoutes.get('/products', products_get);

export default productRoutes;
