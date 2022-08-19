import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { confirmable, createConfirmation } from 'react-confirm';
import { Player } from "@lottiefiles/react-lottie-player";

const Confirmation = ({
  okLabel = '是',
  cancelLabel = '否',
  title = 'Street Born Message',
  confirmation,
  show,
  proceed,
  enableEscape = false,
}) => {
  return (
    <div className="static-modal">
      <Modal
        className="public-confirm-modal"
        animation={true}
        show={show}
        onHide={() => proceed(false)}
        backdrop={enableEscape ? true : 'static'}
        keyboard={enableEscape}
      >
        <Modal.Header>
          <Modal.Title>
            {/* 標題會在這 */}
            <div className=" w-100 h-100">{title}</div>
          </Modal.Title>
        </Modal.Header>
        {/* 內文會在這 也是 confirm('這裡的內容') */}
        <Modal.Body className="mx-2">
        <Player
          autoplay
          loop={false}
          src="https://lottie.host/9b050cdd-0383-4576-b06a-c21d57152f05/lokmRRhk6J.json"
          style={{ height: "100px", width: "100px" }}
        />
        {confirmation}</Modal.Body>
        <Modal.Footer className=" justify-content-center">
          {/* btn在這 */}
          <Button
            className="public-confirm-btn mx-2 px-2"
            onClick={() => proceed(true)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Confirmation.propTypes = {
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool,
};

export function AddToCartalert(
  confirmation,
  proceedLabel = 'OK',
  cancelLabel = 'cancel',
  options = {}
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}
