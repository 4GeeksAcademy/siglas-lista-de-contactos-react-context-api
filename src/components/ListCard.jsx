import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";


const ListCard = () => {
    let navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()
    const [showModal, setShowModal] = useState(false);
    const [contactoAEliminar, setContactoAEliminar] = useState(null);
    //const [listContacts, setListContacs] = useState([])
    useEffect(() => {

        //dispatch({type : "TOGGLE_ADD_NEW_CONTACT", payload: !store.ctrlButton || ""})
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
    }, [store.actualizarLista])




    const handleredit = (id) => {
       // console.log("ID", id)
        navigate("/contactform/"+id)
    }

    const abrirModal = (contacto) => {
        //console.log("contacto", contacto)
        setContactoAEliminar(contacto);
        setShowModal(true);
    };

    const cerrarModal = () => {
        setShowModal(false);
        setContactoAEliminar(null);
    };

    const eliminarContacto = async () => {
        try {
            await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.userName}/contacts/${contactoAEliminar.id}`,
                { method: "DELETE" }
            );

            dispatch({
                type: "TOGGLE_ACTUALIZAR_LISTA",
                payload: !store.actualizarLista
            });

            cerrarModal();
        } catch (error) {
            console.log("Error al eliminar", error);
        }
    };
    /// otra manera de eliminar el contacto con ventana tipo alert
/*     const eliminarContacto = async (contacto) => { // otra forma de eliminar
        const confirmar = window.confirm(`¿Eliminar a ${contacto.name}?`);

        if (confirmar) {
            await fetch(`.../contacts/${contacto.id}`, { method: "DELETE" });
            dispatch({ type: "TOGGLE_ACTUALIZAR_LISTA", payload: !state.actualizarLista });
        }
    }; */

    return (
        <div className="card mb-3 pt-2 border-0 mt-2" >
            {store.contactos.length === 0 ? (
                <p className="text-center ">No hay contactos a la Vista ...</p>
            ) : (
                store.contactos?.map((ele) => (
                    <div key={ele.id}>
                        <div className="row px-5 py-1 border ">
                            <div className="col-md-2 " >
                                <img src="https://randomuser.me/api/portraits/men/15.jpg" className="img-fluid img-fluid rounded-circle" alt="..." />
                            </div>
                            <div className="col-md-10">
                                <div className="card-body0">
                                    <div className="d-flex d-flex justify-content-between mb-2">
                                        <h6 className="card-title ">{ele.name}</h6>
                                        <div className="">
                                            <i className="fa-solid fa-pencil me-4 text-muted" onClick={() => handleredit(ele.id)}></i>
                                            <i className="fas fa-trash ms-3 " onClick={() => abrirModal(ele)}></i>
                                        </div>
                                    </div>

                                    <i className="fa-solid fa-location-dot"></i>
                                    <span className="ms-3 "><small>{ele.address}</small></span>
                                    <p className="mb-0 "> <i className="fa-solid fa-phone-flip "></i>
                                        <span className="ms-3 " ><small>{ele.phone}</small></span>
                                    </p>
                                    <p className="">
                                        <i className="fa-solid fa-envelope"></i>
                                        <span className="ms-3 "><small>{ele.email}</small></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {showModal && (
                <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="bg-white p-4 rounded shadow" style={{ width: '300px' }}>
                        <h5>¿Eliminar contacto?</h5>
                        <p><strong>{contactoAEliminar?.name + " con ID: " + contactoAEliminar?.id}<div className="id"></div> </strong></p>
                        <div className="d-flex gap-2">
                            <button className="btn btn-secondary flex-fill" onClick={cerrarModal}>Cancelar</button>
                            <button className="btn btn-danger flex-fill" onClick={eliminarContacto}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
export default ListCard