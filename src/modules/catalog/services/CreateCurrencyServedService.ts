import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  code: string;
}

interface ICurrency {
  [currency: string]: boolean;
}

type IResponse = ICurrency;

@injectable()
class CreateCurrencyServedService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
    //
  }

  public async execute({
    code,
  }: IRequest): Promise<IResponse> {

    const currencies = await this.cacheProvider.recover<ICurrency>(
      'currencies-list',
    );

    let newCurrencies = {}

    if (!currencies) {
      newCurrencies = { [code]: true };
      await this.cacheProvider.save('currencies-list', newCurrencies);
      return newCurrencies;
    }

    if (currencies[code]) {
      throw new AppError('Currency already exists', 409);
    }

    newCurrencies = Object.assign(currencies, { [code]: true })

    await this.cacheProvider.save('currencies-list', newCurrencies);

    return newCurrencies;
  }
}

export default CreateCurrencyServedService;
