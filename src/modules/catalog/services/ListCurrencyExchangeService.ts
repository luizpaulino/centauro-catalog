import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import axios from 'axios';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  amount: number;
}

interface ICurrency {
  [currency: string]: number;
}

interface ICurrencyCache {
  [currency: string]: boolean;
}

type IResponse = Array<ICurrency>;

type IRequestCurrencyExchange = {
  amount: number,
  base: string,
  rates: Array<ICurrency>;
}

@injectable()
class ListCurrencyExchangeService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
    //
  }

  public async execute({
    amount,
  }: IRequest): Promise<IResponse> {

    let currencies = await this.cacheProvider.recover<ICurrencyCache>(
      'currencies-list',
    );

    if (!currencies) {
      throw new AppError('There are no currencies registered for service', 404);
    }

    const apiCurrencyExchange = axios.create({
      baseURL: 'https://api.frankfurter.app/latest'
    });

    const responseCurrencyExchange = await apiCurrencyExchange.get<IRequestCurrencyExchange>('', {
      params: {
        amount,
        from: 'BRL',
        to: Object.keys(currencies).join()
      },
    })

    return responseCurrencyExchange.data.rates;
  }
}

export default ListCurrencyExchangeService;
