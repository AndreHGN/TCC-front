import React, { Fragment, useState } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NewFileModal } from '../new-file-modal/new-file-modal.component';
import { LoadFileModal } from '../load-file-modal/load-file-modal.component';

export const NavigationBar = (): React.ReactElement => {
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showLoadFileModal, setShowLoadFileModal] = useState(false);

  return (
    <Fragment>
      <Navbar expand='lg'>
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <NavDropdown title="File">
              <NavDropdown.Item onClick={() => setShowNewFileModal(true)}>New</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setShowLoadFileModal(true)}>Load diagram</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Export'>
              <NavDropdown.Item>as JSON diagram</NavDropdown.Item>
              <NavDropdown.Item>as PNG image</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <NewFileModal show={showNewFileModal} onClose={() => setShowNewFileModal(false)}/>
      <LoadFileModal show={showLoadFileModal} onClose={() => setShowLoadFileModal(false)} />
    </Fragment>
  )
}
