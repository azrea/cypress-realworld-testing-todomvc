Cypress.Commands.add("createDefaultTodos", () => {
  const TODO_ITEM_ONE = "Buy Milk"
  const TODO_ITEM_TWO = "Pay Rent"
  const TODO_ITEM_THREE = "Pickup Dry Cleaning"

  // Handy way of providing additional information and context for what our custom command is doing
  let cmd = Cypress.log({
    name: "create default todos",
    consoleProps() {
      return {
        "Inserted Todos": [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE],
      }
    },
  })

  cy.get(".new-todo", { log: false })
    .type(`${TODO_ITEM_ONE}{enter}`, { log: false })
    .type(`${TODO_ITEM_TWO}{enter}`, { log: false })
    .type(`${TODO_ITEM_THREE}{enter}`, { log: false })

  cy.get(".todo-list li", { log: false }).then((listItems) => {
    cmd.set({ el: listItems }).snapshot().end()
  })
})
