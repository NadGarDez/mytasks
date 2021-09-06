import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.8base.com/ckt511cxx00lo08la39yf2x0v',
});

const authLink = setContext((_, { headers }) => {

  const token = "84bd9b34-dfef-4956-bd65-836828a9f522"

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const defaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }


const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client


/*

curl -X POST {https://api.8base.com/ckt511cxx00lo08la39yf2x0v}\
     -H "Content-Type: application/json" \
     -H 'Authorization: Bearer 84bd9b34-dfef-4956-bd65-836828a9f522' \
     -d '''{
         mutation  {
           tasksCreate (
             data : {
               nombre:"segunda tarea"
               descripcion:"mira aqui es la segunda tarea"
               responsable: "hola mundo"
             }
           ){
             id
           }
         }
          }"
        }'''










curl -X POST  https://api.8base.com/ckt511cxx00lo08la39yf2x0v \
    -H "Content-Type: application/json" \
    -d '''{
      "query": "query {
        task {
          name
          id
      }
      }"
    }'''

*/
