import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionsList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  deleteOperation = id => {
    const {transactionsList} = this.state
    const updatedList = transactionsList.filter(eachItem => id !== eachItem.id)

    this.setState({transactionsList: updatedList})
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const expensesAmount = this.getExpenses()
    const incomeAmount = this.getIncome()
    const balanceAmount = this.getBalance()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="name">Hi,Richard</h1>
            <p className="text-content">
              Welcome back to your
              <span className="span-element">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            expensesAmount={expensesAmount}
            incomeAmount={incomeAmount}
            balanceAmount={balanceAmount}
          />
          <div className="form-container">
            <form className="form" onSubmit={this.onClickAddButton}>
              <h1 className="transaction-header">Add Transaction</h1>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                className="input"
                type="text"
                value={titleInput}
                id="title"
                placeholder="TITLE"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="amount" className="title">
                AMOUNT
              </label>
              <input
                className="input"
                type="text"
                value={amountInput}
                id="amount"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
              />
              <label htmlFor="select" className="title">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.onChangeOption}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <div className="transaction-history">
              <h1 className="transaction-header">History</h1>
              <div className="transaction-table">
                <ul className="transaction-list">
                  <li className="table-header">
                    <p className="shell">Title</p>
                    <p className="shell">Amount</p>
                    <p className="shell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteOperation={this.deleteOperation}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
