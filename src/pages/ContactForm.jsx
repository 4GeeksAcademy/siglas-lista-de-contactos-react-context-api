import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate} from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer";

const objAgenda = {
    name: "",
    email: "",
    phone: "",
    address: ""
}
const ContactForm = () => {
    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()
    const { theContact } = useParams()
    console.log(theContact)
    const [newAgenda, setNewAgenda] = useState(objAgenda)
    const [textoTitulo, setTextotitulo] = useState("Add a new contact")
    const [textobutton, setTextobutton] = useState("Save")

    /*  setNewAgenda(prev => ({
       ...prev,
       fullName: "jorge sarabia"
     })) */
    //console.log("NEWAGENDA", newAgenda)

    useEffect(() => {
        dispatch({type: "TOGGLE_ADD_NEW_CONTACT", payload: !store.ctrlButton || ""})
 
        if (theContact !== "add") {
            setTextotitulo("Edit this contact")
            setTextobutton("Update")
            //console.log("STORE.CONTACTOS",store.contactos)
            let contactToEdit = store.contactos.find((ele) => ele.id === parseInt(theContact))
            console.log("contactToEdit", contactToEdit)
            //console.log("contactToEdit:", JSON.stringify(contactToEdit, null, 2))
            //contactToEdit = JSON.stringify(contactToEdit, null, 2)
            //  console.log(contactToEdit.name)

            setNewAgenda({
                name: contactToEdit.name,
                email: contactToEdit.email,
                phone: contactToEdit.phone,
                address: contactToEdit.address
            })
            console.log(newAgenda)
        }else{
           //setTextotitulo("Add a new contact")
        }
    }, [])

    const handlerObjAgenda = (e) => {
        const { name, value } = e.target
        setNewAgenda(prev => ({
            ...prev,
            [name]: value
        }))
        //console.log("NEWAGENDA", newAgenda)
        //console.log("NEWAGENDA", { ...newAgenda, [name]: value })
    }

    const handlerReturn =() =>{
        dispatch({type: "TOGGLE_ADD_NEW_CONTACT", payload: !store.ctrlButton || ""})
        navigate('/listcard')
    }
    const createAgenda = async (e) => {
        e.preventDefault()
        if (newAgenda.name === "" || newAgenda.email === "" || newAgenda.phone === "" || newAgenda.address === "") {
            alert("Datos Incompletos/Erroneos")
            return
        }
        let encontrado = store.contactos.filter((ele)=> ele.name===newAgenda.name)
        if(encontrado.length>0 && theContact ==='add'){
            alert("contacto ya Existe")
            return
        }

        //alert(JSON.stringify(newAgenda, null, 2));
        //console.log("Estado:", { ...newAgenda })
        console.log("NEWAGENDA", newAgenda)
        try {
            let response = ""
            if (theContact === "add") {

                response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.userName}/contacts`, {
                    method: "POST",
                    body: JSON.stringify(newAgenda),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                )
            } else {
                response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.userName}/contacts/${theContact}`, {
                    method: "PUT",
                    body: JSON.stringify(newAgenda),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                )

            }
            if (!response.ok) {
                throw new Error("Ocurrio un error: al crear contacto")
            }
            let data = await response.json()
            console.log("AGENDA CREADA", data)
            setNewAgenda(objAgenda)
            /*            dispatch({
                          type: "ADD_AGENDA",
                          payload: data || {}
                      }); */
            dispatch({
                type: "TOGGLE_ACTUALIZAR_LISTA",
                payload: !store.actualizarLista || ""
            })
            if(theContact!="add") handlerReturn()
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div className="card">
            <div className="card-header text-center mt-4">
                <h3>{textoTitulo}</h3>
            </div>
            <form className="crud-form" action="">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control p-2" name="name" id="name"
                                    placeholder="Enter name" required autoFocus tabIndex={1} maxLength={80}
                                    value={newAgenda.name} onChange={(e) => handlerObjAgenda(e)}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control p-2" name="email" id="email"
                                    placeholder="Enter Email" required tabIndex={2} maxLength={80}
                                    value={newAgenda.email} onChange={handlerObjAgenda}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control p-2" name="phone" id="phone"
                                    placeholder="Enter Phone" required tabIndex={3} maxLength={80}
                                    value={newAgenda.phone} onChange={handlerObjAgenda}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control p-2" name="address" id="address"
                                    placeholder="Enter full name" required tabIndex={4} maxLength={80}
                                    value={newAgenda.address} onChange={handlerObjAgenda}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <button className="btn btn-primary form-control" onClick={createAgenda}>{textobutton}</button>
                            </div>
                        </div>
                        <a onClick={handlerReturn}>or get back to contacts</a>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default ContactForm