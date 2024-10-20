// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = new BankAccount(1000);
    expect(account).toEqual(getBankAccount(1000));
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(1000);
    expect(() => account.withdraw(1001)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = new BankAccount(1000);
    const another = new BankAccount(1000);
    expect(() => account.transfer(1001, another)).toThrow(Error);
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(1000);
    expect(() => account.transfer(500, account)).toThrow(Error);
  });

  test('should deposit money', () => {
    const account = new BankAccount(1000);
    account.deposit(5);
    expect(account.getBalance()).toBe(1005);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(1000);
    account.withdraw(5);
    expect(account.getBalance()).toBe(995);
  });

  test('should transfer money', () => {
    const account = new BankAccount(1000);
    const anotherAcc = new BankAccount(0);
    account.transfer(5, anotherAcc);
    expect(account.getBalance()).toBe(995);
    expect(anotherAcc.getBalance()).toBe(5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockImplementationOnce(() => 10);
    (random as jest.Mock).mockImplementationOnce(() => 1);
    const account = new BankAccount(0);
    const balance = await account.fetchBalance();
    expect(balance).toBe(10);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockImplementationOnce(() => 10);
    (random as jest.Mock).mockImplementationOnce(() => 1);
    const account = new BankAccount(0);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockImplementationOnce(() => 10);
    (random as jest.Mock).mockImplementationOnce(() => 0);
    const account = new BankAccount(0);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
