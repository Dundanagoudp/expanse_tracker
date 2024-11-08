import React, { useState, useEffect } from 'react';
import { ExpenseItem } from './ExpenseItem';


export const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = () => {
    if (description && amount) {
      const newTransaction = { description, amount: parseFloat(amount), type };
      setTransactions([...transactions, newTransaction]);
      setAmount('');
      setDescription('');
    }
  };

  const handleRemoveTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const calculateTotal = (type) => {
    return transactions
      .filter(transaction => transaction.type === type)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const income = calculateTotal('income');
  const expenses = calculateTotal('expense');
  const balance = income - expenses;

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <h2>Balance ₹{balance.toFixed(2)}</h2>

      <div className="summary">
        <div className="summary-item">
          <h3>Expense</h3>
          <p className="expense">₹{expenses.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Budget</h3>
          <p className="income">₹{income.toFixed(2)}</p>
        </div>
      </div>

      <div className="transaction-form">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Transaction description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={handleAddTransaction} className="add-btn">ADD</button>
      </div>

      <h2>Transactions</h2>
      <input type="text" placeholder="Search here" className="search-bar" />
      
      <div className="transactions">
        {transactions.map((transaction, index) => (
          <ExpenseItem
            key={index}
            transaction={transaction}
            onRemove={() => handleRemoveTransaction(index)}
          />
        ))}
      </div>
    </div>
  );
};
