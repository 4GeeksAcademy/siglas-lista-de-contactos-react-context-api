import React, { useState } from "react";

const ContactForm = () => {
    const objAgenda = {
       fullName: "",
       email: "",
       phone: "",
       address: ""
    }
    const [newAgenda, setNewAgenda] = useState(objAgenda)
  /*   setNewAgenda(prev => ({
      ...prev,
      fullName: "jorge sarabia"
    }))
    console.log("NEWAGENDA", newAgenda) */
   /*  const createAgenda = async ()=>{


    }
 */

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
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control p-2" name="email" id="email"
                                    placeholder="Enter Email" required tabIndex={2} maxLength={80}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control p-2" name="phone" id="phone"
                                    placeholder="Enter Phone" required tabIndex={3} maxLength={80}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control p-2" name="address" id="address"
                                    placeholder="Enter full name" required tabIndex={4} maxLength={80}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3 p-2">
                                <button className="btn btn-primary form-control">Save</button>
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