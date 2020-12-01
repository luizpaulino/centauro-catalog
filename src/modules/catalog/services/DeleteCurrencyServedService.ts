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
class DeleteCurrencyServedService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
    //
  }

  public async execute({
    code,
  }: IRequest): Promise<IResponse> {

    let currencies = await this.cacheProvider.recover<ICurrency>(
      'currencies-list',
    );

    if (!currencies) {
      throw new AppError('Currencies not exists', 404);
    }

    if (!currencies[code]) {
      throw new AppError('Currency not found', 404);
    }

    delete currencies[code];

    await this.cacheProvider.save('currencies-list', currencies);

    return currencies;
  }
}

export default DeleteCurrencyServedService;
