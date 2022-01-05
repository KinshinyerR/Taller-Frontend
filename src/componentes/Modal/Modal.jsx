import React, { useEffect, useState } from "react";

export default function Modal({ show, title, body, footer, onClose }) {
  const [showModal, setShowModal] = useState(show);

  const handleOnClose = () => {
    setShowModal(false);
    onClose();
  };

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  return (
    showModal && (
      <div
        className="modal fade show"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleOnClose}
              ></button>
            </div>
            <div className="modal-body">{body}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    )
  );
}
