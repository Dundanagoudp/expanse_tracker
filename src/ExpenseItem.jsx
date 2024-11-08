export const ExpenseItem=({transaction, onRemove})=>{
      return(
            <div className="transaction-item">
            <span>{transaction.description}</span>
            <span>₹{transaction.amount.toFixed(2)}</span>
            <button onClick={onRemove} className="remove-btn">Remove</button>
          </div>
      );
};