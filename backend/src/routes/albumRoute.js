import express from 'express';
import { addAlbum,listAlbum,removeAlbum } from '../controllers/albumController.js'; 
import upload from '../middleware/multer.js';
import albumModel from '../models/albumModel.js';

const albumRouter = express.Router();

albumRouter.post('/add',upload.single('image'),addAlbum);
albumRouter.get('/list',listAlbum);
albumRouter.post('/remove',removeAlbum);

export default albumRouter;