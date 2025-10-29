import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";


const ListCard = () => {
    const { store, dispatch } = useGlobalReducer()
    //const [listContacts, setListContacs] = useState([])
    useEffect(() => {
        const getContacts = async () => {
            try {
                let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.userName}/contacts`)
                let data = await response.json()
                //console.log("data", data)
                //data = data.contacts
                //setListContacs(data)
                //console.log("listContacts", listContacts)
      // GUARDAR EN EL STORE GLOBAL
//      console.log("comienza el store")
        dispatch({
          type: "SET_CONTACTS",
          payload: data.contacts || []
        });
  //    console.log("termina el store")

//                console.log("Contactos cargados en el store:", data);
            } catch (error) {
                console.log(error)
            }
        }
        getContacts()
    }, [])


 

    const handleredit = (props) => {
        console.log("props", props)
        alert(`a modigicar se ha dicho ${props}`)
    }

    return (
        <div className="card mb-3 pt-2" >
            {store.contactos.length === 0 ? (
                <p className="text-center text-muted">Cargando contactos...</p>
            ) : (
                store.contactos?.map((ele) => (
                    <div key={ele.id}>
                        <div className="row px-5 py-1">
                            <div className="col-md-2 " >
                                <img src="https://randomuser.me/api/portraits/men/15.jpg" className="img-fluid img-fluid rounded-circle" alt="..." />
                            </div>
                            <div className="col-md-10">
                                <div className="card-bodyz">
                                    <div className="d-flex d-flex justify-content-between">
                                        <h5 className="card-title">{ele.name}</h5>
                                        <div className="">
                                            <i className="fa-solid fa-pencil me-4" onClick={() => handleredit(ele.id)}></i>
                                            <i className="fas fa-trash ms-3"></i>
                                        </div>
                                    </div>

                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>{ele.address}</span>
                                    <p> <i className="fa-solid fa-phone-flip"></i>
                                        <span>{ele.phone}</span>
                                    </p>
                                    <p className="card-text1">
                                        <i className="fa-solid fa-envelope"></i>
                                        <span>{ele.email}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

        </div>
    )
}
export default ListCard