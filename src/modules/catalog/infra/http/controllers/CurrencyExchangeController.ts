import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCurrencyExchange from '@modules/catalog/services/ListCurrencyExchangeService';

export default class CurrencyExchangeController {
  public async index(request: Request, response: Response): Promise<Response> {

    const { amount } = request.query;

    const listCurrencyExchange = container.resolve(ListCurrencyExchange);

    const currenciesExchange = await listCurrencyExchange.execute({
      amount: Number(amount),
    });

    return response.json(currenciesExchange);
  }
}
