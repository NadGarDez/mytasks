
describe(
  "Test de funciones crud",
  ()=>{
    it('Crear tarea', () => {
      cy.visit("http://localhost:3000/panel")
      cy.get('#anadirTarea').click()
      cy.get('#CTnombre').type("Tarea de testing")
      cy.get("#CTdescripcion").type("Esta es una tarea autogenerada por cypress")
      cy.get("#CTresponsables").type("Tu yo el ella")
      cy.contains("Enviar").click()
      cy.get("#warningTitle",{timeout:10000}).should("contain","Actividad creaada correctamente")
      cy.wait(60000)
    })

    it('Editar tarea', () => {
      cy.visit("http://localhost:3000/panel")
      cy.get('button[name="edit"]').first().click()
      cy.get('#ETnombre').type("Tarea de testing")
      cy.get("#ETdescripcion").type("Esta es una tarea autogenerada por cypress")
      cy.get("#ETresponsables").type("Tu yo el ella")
      cy.contains("Enviar").click()
      cy.get("#warningTitle",{timeout:10000}).should("contain","Actividad editada correctamente")
      cy.wait(60000)

    })

    it(
      "Eliminar Tarea",
      ()=>{
        cy.visit("http://localhost:3000/panel")
        cy.get('button[name="eliminar"]').first().click()
        cy.get("#warningTitle",{timeout:10000}).should("contain","Actividad eliminada correctamente")
          cy.wait(60)
      }
    )

  }
)
