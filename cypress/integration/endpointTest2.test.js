describe(
  "Endpoint test 2",
  ()=>{
    it('Crear tarea para culimar', () => {
      cy.visit("http://localhost:3000/panel")
      cy.get('#anadirTarea').click()
      cy.get('#CTnombre').type("Tarea de testing")
      cy.get("#CTdescripcion").type("Esta es una tarea autogenerada por cypress")
      cy.get("#CTresponsables").type("Tu yo el ella")
      cy.contains("Enviar").click()
      cy.get("#warningTitle",{timeout:10000}).should("contain","Actividad creaada correctamente")
        cy.wait(60000)

    })

    it('Culimar tarea', () => {
      cy.visit("http://localhost:3000/panel")
      cy.get('button[name="culminar"]').first().click()
      cy.get("#warningTitle",{timeout:10000}).should("contain","Actividad culminada correctamente")
        cy.wait(60000)
    })

    it(
      "Eliminar Tarea culminada",
      ()=>{
        cy.visit("http://localhost:3000/panel")
        cy.get("#ctasks",{timeout:10000}).click()
        cy.get('button[name="eliminar"]').first().click()
        cy.get("#warningTitle",{timeout:10000}).should("contain","Actividad eliminada correctamente")
        cy.wait(60000)
      }
    )
  }
)
