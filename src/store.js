export const initialStore = () => {
  return {
    theContact:{
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    actualizarLista: false,
    message: null,
    userName: "FranciscoS",
    contactos: [],
    ctrlButton: true
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...store,
        contactos: action.payload
      };
    case "ADD_AGENDA":
      return {
        ...store.contactos,
        contactos: [...store.contactos, action.payload]
      }
    case "TOGGLE_ACTUALIZAR_LISTA":
      return {
        ...store,
        actualizarLista : action.payload
      }  
    case "TOGGLE_ADD_NEW_CONTACT":
      return {
        ...store,
        ctrlButton : action.payload
      }
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
