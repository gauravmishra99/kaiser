
//Typescript
import Router from 'koa-router';
import { getAllClient,getClientById,createClient ,updateClient,deleteClient} from '../controllers/clientController';

const router = new Router({ prefix: '/api/clients' });

router.get('/', getAllClient);
router.post('/createClient', createClient);
router.post('/updateClient', updateClient);
router.post('/deleteClient', deleteClient);
router.get('/:id', getClientById);

export default router;
