import React from "react";
import { Modal } from "react-bootstrap"
import { Errors } from "../generate-code-button/generate-code-button.component";

interface ErrorsModalProps {
  show: boolean;
  onClose: () => void;
  errors: Errors,
}

export const ErrorsModal = ({show, onClose, errors}: ErrorsModalProps): React.ReactElement => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fix the following errors before generating the code</Modal.Title>
      </Modal.Header>
      <Modal.Body>  
        {Object.keys(errors).map(key => {
          return (
            <>
              <h5>Class {errors[key].name}:</h5>
              <p>Attributes:</p>
              <ul>
                {errors[key].attributes.map(attribute => {
                  return (
                    <li>{attribute}</li>
                  )
                })}
              </ul>
              <p>Methods:</p>
              <ul>
                {errors[key].methods.map(method => {
                  return (
                    <li>{method}</li>
                  )
                })}
              </ul>
            </>
          )
        })}
      </Modal.Body>
    </Modal>
  )
}