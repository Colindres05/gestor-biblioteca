describe("Gestor de Biblioteca", () => {

  beforeEach(() => {
    cy.visit("/", { onBeforeLoad(win) { win.localStorage.clear() } })
    cy.get("#usuario").type("admin")
    cy.get("#clave").type("admin123")
    cy.get("#btn-login").click()
  })

  it("Login correcto muestra el panel", () => {
    cy.get("#panel").should("be.visible")
  })

  it("Agregar un libro lo anade a la tabla", () => {
    cy.get("#titulo").type("Cien anos de soledad")
    cy.get("#autor").type("Garcia Marquez")
    cy.get("#copias").type("3")
    cy.get("#btn-agregar").click()
    cy.get(".fila").should("have.length", 1)
    cy.get(".col-titulo").should("contain", "Cien anos de soledad")
  })

  it("No permite copias en 0", () => {
    cy.get("#titulo").type("Libro invalido")
    cy.get("#autor").type("Autor X")
    cy.get("#copias").type("0")
    cy.get("#btn-agregar").click()
    cy.get("#form-msg").should("contain", "copias")
    cy.get(".fila").should("have.length", 0)
  })

  it("Eliminar un libro lo quita de la tabla", () => {
    cy.get("#titulo").type("Para borrar")
    cy.get("#autor").type("Autor Y")
    cy.get("#copias").type("2")
    cy.get("#btn-agregar").click()
    cy.get(".fila").first().find(".btn-eliminar").click()
    cy.get(".fila").should("have.length", 0)
  })

})
