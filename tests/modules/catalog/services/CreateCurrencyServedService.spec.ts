import "reflect-metadata";
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';
import CreateCurrencyServedService from '@modules/catalog/services/CreateCurrencyServedService';

let fakeCacheProvider: FakeCacheProvider;

let createCurrencyServed: CreateCurrencyServedService;

describe('CreateCurrencyServed', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();

    createCurrencyServed = new CreateCurrencyServedService(
      fakeCacheProvider,
    );
  });

  it('should be able to create a new currency to served', async () => {

    const currency = await createCurrencyServed.execute({
      code: 'USD'
    });

    expect(currency).toHaveProperty('USD');
  });

  it('should be able to create two on different code in the sequence', async () => {

    await createCurrencyServed.execute({
      code: 'USD'
    });

    const currency = await createCurrencyServed.execute({
      code: 'EUR'
    });

    expect(currency).toHaveProperty('USD');
    expect(currency).toHaveProperty('EUR');
  });

  it('should not be able to create two on the same code', async () => {

    await createCurrencyServed.execute({
      code: 'USD'
    });

    await expect(
      createCurrencyServed.execute({
        code: 'USD'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
