import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCurrencyServed from '@modules/catalog/services/CreateCurrencyServedService';
import DeleteCurrencyServed from '@modules/catalog/services/DeleteCurrencyServedService';

export default class CreateCurrencyServedController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const createCurrencyServed = container.resolve(CreateCurrencyServed);

    const currenciesExchange = await createCurrencyServed.execute({
      code,
    });

    return response.json(currenciesExchange);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const deleteCurrencyServed = container.resolve(DeleteCurrencyServed);

    const currenciesExchange = await deleteCurrencyServed.execute({
      code,
    });

    return response.json(currenciesExchange);
  }
}
