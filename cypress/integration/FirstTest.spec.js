describe("add, remove and update tasks", () => {
  const TASK_ONE = "Gaze out upon a hill and debate the wonder that is life"
  const TASK_TWO =
    "Stand upon the bones of men as they lay defeated and I victorious"
  const TASK_THREE = "Name my daughter 'Jenny'"

  beforeEach(() => {
    cy.visit(" http://127.0.0.1:8888")
  })

  it("add 3 new todos", () => {
    cy.createDefaultTodos().as("todos")

    cy.get("@todos")
      .should("have.length", 3)
      .eq(0)
      .should("contain", TASK_ONE)
      .should("not.contain", TASK_TWO)
  })

  it("should append each new todo to the end of the list", () => {
    cy.createDefaultTodos().as("todos")

    cy.get("@todos").eq(0).should("contain", TASK_ONE)
    cy.get("@todos").eq(1).should("contain", TASK_TWO)
    cy.get("@todos").eq(2).should("contain", TASK_THREE)
  })

  it("should delete a task from the list", () => {
    cy.createDefaultTodos()
    cy.removeAllTodos()
  })

  it.only("should test jquery", () => {
    cy.createDefaultTodos()

    cy.get("label")
      .eq(0)
      .then((listItem) => {
        const text = listItem.text()

        cy.get("label")
          .eq(1)
          .should((listItem) => {
            const text2 = listItem.text()

            expect(text2).not.to.equal(text)
          })
      })
  })
})
