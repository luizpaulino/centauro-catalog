import "reflect-metadata";
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';
import CreateCurrencyServedService from '@modules/catalog/services/CreateCurrencyServedService';
import DeleteCurrencyServedService from '@modules/catalog/services/DeleteCurrencyServedService';

let fakeCacheProvider: FakeCacheProvider;

let createCurrencyServed: CreateCurrencyServedService;
let deleteCurrencyServed: DeleteCurrencyServedService;

describe('DeleteCurrencyServedService', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();

    createCurrencyServed = new CreateCurrencyServedService(
      fakeCacheProvider,
    );

    deleteCurrencyServed = new DeleteCurrencyServedService(
      fakeCacheProvider,
    );

  });

  it('should be able to delete a currency from served', async () => {

    await createCurrencyServed.execute({
      code: 'USD'
    });

    const currency = await deleteCurrencyServed.execute({
      code: 'USD'
    });

    expect(currency).toEqual({});
  });

  it('should not be able to delete currencies if empty', async () => {
    await expect(
      deleteCurrencyServed.execute({
        code: 'USD'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete code not exists', async () => {
    await createCurrencyServed.execute({
      code: 'USD'
    });

    await expect(
      deleteCurrencyServed.execute({
        code: 'EUR'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
