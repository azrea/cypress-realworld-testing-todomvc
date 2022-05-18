describe("Testing task list", () => {
  const TASK_ONE =
    "Feel alone as I gaze across my life mission aka the island I bought yesterday"
  const TASK_TWO = "Grasp the unseen and see life in all its tragedy"

  beforeEach(() => {
    cy.visit("http://127.0.0.1:8888")
  })

  it("should focus on the todo input field when first opened", () => {
    cy.focused().should("have.attr", "class", "new-todo")
  })

  it("should clear todo input field when an item is added", () => {
    addTask(TASK_ONE)
    cy.get("@inputTodo").should("be.empty")
  })

  it("can mark a todo as completed", () => {
    addTask(TASK_ONE)
    addTask(TASK_TWO)
    cy.get(".toggle").eq(0).click().should("be.checked")
    cy.get('[data-reactid=".0.2.1.4"] > a').click()
    cy.get("label").eq(0).should("be.visible")
    cy.get("label").its("length").should("eq", 1)
    cy.get('[data-reactid=".0.2.1.2"] > a').click()
    cy.contains(TASK_TWO).should("be.visible")
    cy.get("label").its("length").should("eq", 1)
  })

  it("can use the clear completed button to clear all completed todo", () => {
    addTask(TASK_ONE)
    addTask(TASK_TWO)
    cy.get(".toggle").click({ multiple: true })
    cy.get('[data-reactid=".0.2.1.4"] > a').click()
    cy.get("label").its("length").should("above", 1)
  })

  it("allows you to edit a todo", () => {
    addTask(TASK_ONE)
    cy.get(".todo-list li")
      .dblclick()
      .find(".edit")
      .clear()
      .type(` ${TASK_TWO} {enter}`)

    cy.contains(TASK_TWO).should("exist")
  })

  it("should save edits on blur", () => {
    addTask(TASK_ONE)
    cy.get(".todo-list li")
      .dblclick()
      .find(".edit")
      .clear()
      .type(` ${TASK_TWO}`)
      .blur()

    cy.contains(TASK_TWO).should("exist")
  })

  it("should display the current number of todo items", () => {
    addTask(TASK_ONE)
    cy.get(".todo-count").should("contain", 1)
    addTask(TASK_TWO)
    cy.get(".todo-count").should("contain", 2)
  })

  it("should persist its data after page refresh", () => {
    addTask(TASK_ONE)
    addTask(TASK_TWO)
    cy.reload()
    cy.get(".todo-list li").should("have.length", 2)

    cy.get("label").eq(0).should("contain", TASK_ONE)
  })
})

function addTask(text) {
  cy.get(".new-todo").as("inputTodo").type(`${text}{enter}`)
}
