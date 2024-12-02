import express,{json} from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { adminRoute } from './Routers/adminRouter.js';
import { userRoute } from './Routers/userRouter.js';
import { ensureAdmin} from './Middle-Ware/auth.js';

import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(json());
app.use(cookieParser())
const port = 8001;
//MongoBD connection

mongoose.connect('mongodb://localhost:27017/FloraDelight_DB');

// setupAdmin();

app.use(ensureAdmin);
app.use('/',adminRoute)

app.use('/',userRoute);


app.use('/uploads', express.static(path.join(__dirname, 'Routers', 'uploads')));

app.listen(port, ()=>{
    console.log(`Server listening  to port ${port}`);
    
})