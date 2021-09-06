
import { gql } from '@apollo/client';
const connection = require("../db/connection")
const client = connection.default == undefined  ? connection : connection.default


const operations = {
  create: async(nombre,descripcion,responsables)=>{
    let result =""
    try {
      result = await client.mutate({
        mutation: gql`
        mutation  {
          taskCreate (
            data : {
              nombre:"${nombre}"
              descripcion:"${descripcion}"
              responsables: "${responsables}"
            }
          ){
            id
          }
        }
        `
      })
    } catch (e) {
      console.log(e)

    }
    return result
  },
  edit: async(id,nombre,descripcion,responsables)=>{
    let result =""
    try {
      result = await client.mutate({
        mutation: gql`
        mutation  {
          wyatt:taskUpdate(data:{
            id:"${id}"
            nombre:"${nombre}"
            descripcion:"${descripcion}"
            responsables: "${responsables}"
          }){
            id
          }

        }
        `
      })
    } catch (e) {
      console.log(e)

    }
    return result
  },

  delete: async(id)=>{
    let result =""
    try {
      result = await client.mutate({
        mutation: gql`
        mutation  {
          wyatt:taskDelete(data:{
            id:"${id}"
          }){
            success
          }

        }
        `
      })
    } catch (e) {
      console.log(e)

    }

    return result

  },
  fetch1: async()=>{
    let result =""
    try {
      result = await client.query({
        query: gql`
          query  {
            tasksList (
              filter:{
                culminacion:{
                  is_empty:true
                }
              },
              sort: {
                createdAt: DESC
              }
            ){
              items {

                id
                nombre
                descripcion
                createdAt
                responsables
                culminacion

              }
            }
          }
        `
      })
    } catch (e) {
      console.log(e)


    }
    console.log(result)
    return result
  },

  fetch2:async()=>{
    let result =""
    try {
      result = await client.query({
        query: gql`
          query  {
            tasksList (
              filter:{
                culminacion:{
                  is_empty:false
                }
              },
              sort: {
                createdAt: DESC
              }
            ){
              items {

                id
                nombre
                descripcion
                createdAt
                responsables
                culminacion

              }
            }
          }
        `
      })
    } catch (e) {
      console.log(e)

    }
    return result

  },
  complete: async(id)=>{
    console.log(JSON.stringify({
      id:id,
      culminacion:new Date().toISOString()
    }))
    let result = ""
    try {

       result = await fetch("https://api.8base.com/ckt511cxx00lo08la39yf2x0v/webhook/webhooks/closeTask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 84bd9b34-dfef-4956-bd65-836828a9f522`,
        },

        body: JSON.stringify({
          id:id,
          culminacion:new Date().toISOString()
        })})

    } catch (e) {
      console.log(e)
    }

    return result

  }

}

export default operations
