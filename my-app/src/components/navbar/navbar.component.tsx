import React, { Fragment, useContext, useState } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NewFileModal } from '../new-file-modal/new-file-modal.component';
import { LoadFileModal } from '../load-file-modal/load-file-modal.component';
import { DiagramContext } from '../contexts/diagram-context';
import { downloadLink } from '../../utils/download-link';
import { ApollonContext } from '../contexts/editor-context';
import { convertRenderedSVGToPNG } from '../../utils/convert-rendered-svg-to-png';

export const NavigationBar = (): React.ReactElement => {
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showLoadFileModal, setShowLoadFileModal] = useState(false);

  const { diagram } = useContext(DiagramContext);
  const { editor } = useContext(ApollonContext);

  const handleExportAsJSON = () => {
    const data = JSON.stringify(diagram?.model);
    const blob = new Blob([data], {type: "application/json"});
    downloadLink(blob, diagram?.name ?? 'untitled');
  }

  const handleExportToPNG = () => {
    editor?.exportAsSVG().then((renderedSvg) => {
      return convertRenderedSVGToPNG(renderedSvg, true);
    }).then((blob: Blob) => downloadLink(blob, diagram?.name ?? 'untitled'));
  }

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
              <NavDropdown.Item onClick={handleExportAsJSON}>as JSON diagram</NavDropdown.Item>
              <NavDropdown.Item onClick={handleExportToPNG}>as PNG image</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <NewFileModal show={showNewFileModal} onClose={() => setShowNewFileModal(false)}/>
      <LoadFileModal show={showLoadFileModal} onClose={() => setShowLoadFileModal(false)} />
    </Fragment>
  )
}
