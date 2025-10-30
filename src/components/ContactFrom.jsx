import React, { useState } from "react";

const ContactForm = () => {
    const objAgenda = {
        fullName: "",
        email: "",
        phone: "",
        address: ""
    }
    const [newAgenda, setNewAgenda] = useState(objAgenda)
    /*  setNewAgenda(prev => ({
       ...prev,
       fullName: "jorge sarabia"
     })) */
    //console.log("NEWAGENDA", newAgenda)

    const handlerObjAgenda = (e) => {
        const { name, value} = e.target
        setNewAgenda(prev => ({
            ...prev,
            [name]: value
        }))
        //console.log("NEWAGENDA", newAgenda)
        //console.log("NEWAGENDA", { ...newAgenda, [name]: value })
    }

    const createAgenda = async () => {
        //alert(JSON.stringify(newAgenda, null, 2));
       //console.log("Estado:", { ...newAgenda })
       try {
       
        let response = await fetch(`https://playground.4geeks.com/contact/agendas/${Store.userName}/contacts`,{
            method: "POST",
        }

        )
       } catch (error) {
        
       }



    }


    return (
        <div className="card">
            <div className="card-header">
                <h3>Add a new contact</h3>
            </div>
            <form className="crud-form" action="">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="fullname" className="form-label">Full Name</label>
                                <input type="text" className="form-control p-2" name="fullname" id="fullname"
                                    placeholder="Enter full name" required autoFocus tabIndex={1} maxLength={80}
                                    onChange={(e)=> handlerObjAgenda(e)}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control p-2" name="email" id="email"
                                    placeholder="Enter Email" required tabIndex={2} maxLength={80}
                                    onChange={handlerObjAgenda}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control p-2" name="phone" id="phone"
                                    placeholder="Enter Phone" required tabIndex={3} maxLength={80}
                                    onChange={handlerObjAgenda}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control p-2" name="address" id="address"
                                    placeholder="Enter full name" required tabIndex={4} maxLength={80}
                                    onChange={handlerObjAgenda}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <button className="btn btn-primary form-control" onClick={createAgenda}>Save</button>
                            </div>
                        </div>
                        <span>or get back to contacts</span>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ContactForm