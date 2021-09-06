import operations from "../../db/operations.js"

let obj = {
  id:"",
  nombre:"actividad",
  descripcion:"jfkdlsñajfkdlñsa",
  responsables:"fdafdsafasfdsafds"
}

describe(
  "operations",
  ()=>{
    it(
      "Lista de actividades",
      async ()=>{
        let result = await operations.fetch1()
        cy.log(result)
        expect(result.data).to.not.equal(null)
        expect(result.data).to.not.equal(undefined)
        cy.wait(20000)
      }
    )

    it(
      "lista de actividades terminadas",
      async ()=>{
        let result = await operations.fetch2()
        cy.log(result)
        expect(result.data).to.not.equal(null)
        expect(result.data).to.not.equal(undefined)
        cy.wait(20000)
      }
    )

    it(
      "Crear tarea",
      async ()=>{
        let result = await operations.create(obj.nombre,obj.descripcion,obj.responsable)
        cy.log(result)
        obj.id = result.data.taskCreate.id
        expect(result.data).to.not.equal(null)
        expect(result.data).to.not.equal(undefined)
        cy.wait(20000)
      }
    )

    it(
      "Editar tarea",
      async ()=>{
        let result = await operations.edit(obj.id,obj.nombre,obj.descripcion,obj.responsables)
        cy.log(result)
        expect(result.data).to.not.equal(null)
        expect(result.data).to.not.equal(undefined)
        cy.wait(20000)
      }
    )

    it(
      "Eliminar tarea",
      async ()=>{
        let result = await operations.delete(obj.id)
        cy.log(result)
        expect(result.data).to.not.equal(null)
        expect(result.data).to.not.equal(undefined)
        cy.wait(20000)
      }
    )
    it(
      "Crear tarea para culminar",
      async ()=>{
        let result = await operations.create(obj.nombre,obj.descripcion,obj.responsables)
        cy.log(result)
        obj.id = result.data.taskCreate.id
        expect(result.data).to.not.equal(null)
        expect(result.data).to.not.equal(undefined)
        cy.wait(20000)
      }
    )
    it(
      "Completar tarea",
      async ()=>{
        let result = await operations.complete(obj.id)
        cy.log(obj.id)
        result = await result.json()
      cy.log(result)
        expect(result.message).to.not.equal(null)
        expect(result.message).to.not.equal(undefined)
        cy.wait(20000)
      }
    )
  }
)
