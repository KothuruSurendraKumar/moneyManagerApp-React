// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, expensesAmount, incomeAmount} = props
  return (
    <div className="amount-container">
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="amount-img"
        />
        <div className="text-container">
          <p className="balance-text">Your Balance</p>
          <p className="amount-text" testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="amount-img"
        />
        <div className="text-container">
          <p className="balance-text">Your Income</p>
          <p className="amount-text" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="amount-img"
        />
        <div className="text-container">
          <p className="balance-text">Your Expenses</p>
          <p className="amount-text" testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
