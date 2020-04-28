import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {
      income: this.transactions.reduce(
        (acc, trans) => (trans.type === 'income' ? acc + trans.value : acc),
        0,
      ),
      outcome: this.transactions.reduce(
        (acc, trans) => (trans.type === 'outcome' ? acc + trans.value : acc),
        0,
      ),
      total: 0,
    };
    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
