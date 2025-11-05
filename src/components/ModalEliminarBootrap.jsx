import React from "react";

const ModalEliminarBootstrap = ()=>{

    return(
        <>
        {/* Modal de Bootstrap */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar eliminación</h5>
              <button type="button" className="btn-close" onClick={cerrarModal}></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro de eliminar a <strong>{contactoAEliminar?.name}</strong>?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={eliminarContacto}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default ModalEliminarBootstrap