import Router from 'koa-router';
import { getAllClient } from '../controllers/clientController.js';

const router = new Router();

router.get('/api/clients', getAllClient);

export default router;
