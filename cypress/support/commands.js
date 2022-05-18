Cypress.Commands.add("createDefaultTodos", () => {
  const TASK_ONE = "Gaze out upon a hill and debate the wonder that is life"
  const TASK_TWO =
    "Stand upon the bones of men as they lay defeated and I victorious"
  const TASK_THREE = "Name my daughter 'Jenny'"

  let cmd = Cypress.log({
    name: "createDefaultTodos",
    consoleProps() {
      return {
        "Inserted Todos": [TASK_ONE, TASK_TWO, TASK_THREE],
      }
    },
  })

  cy.get(".new-todo", { log: false })
    .type(`${TASK_ONE}{enter}`, { log: false })
    .type(`${TASK_TWO}{enter}`, { log: false })
    .type(`${TASK_THREE}{enter}`, { log: false })

  cy.get("label").then((listItems) => {
    cmd.set({ el: listItems }).snapshot().end()
  })
})

Cypress.Commands.add("removeAllTodos", () => {
  if (cy.get(".new-todo")) {
    cy.get(".destroy").click({ force: true, multiple: true })
  }

  cy.get(".footer").should("not.exist")
  cy.get(".todo-list").should("not.exist")
})
