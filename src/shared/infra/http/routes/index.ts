import { Router } from 'express';
import catalogRouter from '@modules/catalog/infra/http/routes/catalog.routes';

const routes = Router();

routes.use('/catalog', catalogRouter);

export default routes;
