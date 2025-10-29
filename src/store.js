export const initialStore=()=>{
  return{
    message: null,
    userName: "FranciscoS",
    contactos: [],
 todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]    
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
         case "SET_CONTACTS":
      return {
        ...store,
        contactos: action.payload
      };

    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}


/* export const initialStore={
    message: null,
    contactos: []
  }


export default function storeReducer(store, action = {}) {
  switch(action.type){
     case "SET_CONTACTS":
      return {
        ...store,
        contactos: action.payload
      };
    default:
      return store; // ← NO LANZAR ERROR, solo devolver store
      //throw Error('Unknown action.');
  }    
}

 */
