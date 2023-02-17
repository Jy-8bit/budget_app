import React, { useContext, useState } from "react"
import { ButtonGroup } from "react-bootstrap"
import { Prev } from "react-bootstrap/esm/PageItem"
import { v4 as uuidv4 } from 'uuid'


const BudgetsContext = React.createContext()


export function useBudgets() {
  return useContext(BudgetsContext)
}




export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpense] = useState([])


  function getBudgetsExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)

  }
  function addExpense({ description, amount, budgetId }) {
    setExpense(prevExpense => {
      return [...prevExpense, { id: uuidv4(), description, amount, budgetId }]
    })
  }
  function addBudget(name, max) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budgets => budgets.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidv4(), name, max }]
    })

  }
  function deleteBudget({ id }) {
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budgets => budgets.id !== id)
    })
  }
  function deleteExpense({ id }) {
    setExpense(prevExpense => {
      return prevExpense.filter(expenses => expenses.id !== id)
    })
  }




  return (
    <BudgetsContext.Provider value={{
      budgets,
      expenses,
      getBudgetsExpenses,
      addExpense,
      addBudget,
      deleteBudget,
      deleteExpense
    }}>{children}</BudgetsContext.Provider>
  )
}