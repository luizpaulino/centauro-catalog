import "reflect-metadata";
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';
import CreateCurrencyServedService from '@modules/catalog/services/CreateCurrencyServedService';
import ListCurrencyExchangeService from '@modules/catalog/services/ListCurrencyExchangeService';

let fakeCacheProvider: FakeCacheProvider;

let createCurrencyServed: CreateCurrencyServedService;
let listCurrencyExchangeService: ListCurrencyExchangeService;

describe('ListCurrencyExchangeService', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();

    createCurrencyServed = new CreateCurrencyServedService(
      fakeCacheProvider,
    );

    listCurrencyExchangeService = new ListCurrencyExchangeService(
      fakeCacheProvider,
    );
  });

  it('should be able to consult a value currency served fors us', async () => {

    await createCurrencyServed.execute({
      code: 'USD'
    });

    const values = await listCurrencyExchangeService.execute({ amount: 1 });

    expect(values).toHaveProperty('USD');
  });

  it('should not be able to consult a value from code not served for us', async () => {

    await expect(
      listCurrencyExchangeService.execute({ amount: 1 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
