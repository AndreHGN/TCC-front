import React, { Fragment, useContext, useState } from 'react';
import { Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NewFileModal } from '../new-file-modal/new-file-modal.component';
import { LoadFileModal } from '../load-file-modal/load-file-modal.component';
import { DiagramContext } from '../contexts/diagram-context';
import { downloadLink } from '../../utils/download-link';
import { ApollonContext } from '../contexts/editor-context';
import { convertRenderedSVGToPNG } from '../../utils/convert-rendered-svg-to-png';
import { NavbarTitle } from './title.component';
import { DesignPatternBadge } from './design-pattern-badge.component';
import styled from 'styled-components';
import { AssignDesignPatternModal } from '../assign-pattern-modal/assign-pattern-modal.component';

const HorizontalLine = styled.hr`
  margin: 8px 0;
  border: 1px solid gray;
`

export const NavigationBar = (): React.ReactElement => {
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showLoadFileModal, setShowLoadFileModal] = useState(false);
  const [showAssignPatternModal, setShowAssignPatternModal] = useState(false);

  const { diagram } = useContext(DiagramContext);
  const { editor } = useContext(ApollonContext);

  const handleExportAsJSON = () => {
    const data = JSON.stringify({model: diagram?.model, designPattern: diagram?.designPattern});
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
      <Navbar expand='lg' sticky='top' bg='light' className='border-bottom border-dark'>
        <Navbar.Collapse className='d-flex justify-content-between mx-3 mt-2'>
          <div className='flex-column'>
            <div className='d-flex align-items-center'>
              <NavbarTitle />
              <DesignPatternBadge className='mx-3' designPattern={diagram?.designPattern} onClick={() => setShowAssignPatternModal(true)}/>
            </div>
            <HorizontalLine />
            <div>
              <Nav variant='underline' className='me-auto'>
                <NavDropdown className='fs-5' title="File">
                  <NavDropdown.Item onClick={() => setShowNewFileModal(true)}>New</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setShowLoadFileModal(true)}>Load diagram</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown className='fs-5' title='Export'>
                  <NavDropdown.Item onClick={handleExportAsJSON}>as JSON diagram</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleExportToPNG}>as PNG image</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </div>
          <div>
            <Button className='btn-lg'>Generate Code Template</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <NewFileModal show={showNewFileModal} onClose={() => setShowNewFileModal(false)}/>
      <LoadFileModal show={showLoadFileModal} onClose={() => setShowLoadFileModal(false)} />
      <AssignDesignPatternModal show={showAssignPatternModal} onClose={() => setShowAssignPatternModal(false)} />
    </Fragment>
  )
}
