import Auth from './Auth'

const Modal = (props) => {
    const showHideClassName = props.show ? "block" : "none";
    const modalClose = () => {
        props.handleClose();
    }

    return (
        <div id="exampleModalLive" className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style={{display: showHideClassName}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLiveLabel">Log in</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalClose}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <Auth closeModalHandler = {modalClose}/>
            </div>
            
          </div>
        </div>
      </div>
    );
  };

export default Modal