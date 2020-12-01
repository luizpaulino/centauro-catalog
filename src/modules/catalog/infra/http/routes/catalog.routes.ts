import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CurrencyExchangeController from '@modules/catalog/infra/http/controllers/CurrencyExchangeController';
import CurrencyServedController from '@modules/catalog/infra/http/controllers/CurrencyServedController';

const catalogRouter = Router();
const currencyExchangeController = new CurrencyExchangeController();
const currencyServedController = new CurrencyServedController();

catalogRouter.get(
  '/currency/exchange',
  celebrate({
    [Segments.QUERY]: {
      amount: Joi.number().required(),
    },
  }),
  currencyExchangeController.index,
);

catalogRouter.post(
  '/currency/served',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().max(3).required(),
    },
  }),
  currencyServedController.create,
);

catalogRouter.delete(
  '/currency/served/:code',
  celebrate({
    [Segments.PARAMS]: {
      code: Joi.string().max(3).required(),
    },
  }),
  currencyServedController.delete,
);

export default catalogRouter;
