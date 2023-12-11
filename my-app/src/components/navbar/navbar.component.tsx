import React, { Fragment, useContext, useState } from 'react';
import { Nav, NavDropdown, Navbar, NavbarText } from 'react-bootstrap';
import { NewFileModal } from '../new-file-modal/new-file-modal.component';
import { DiagramContext } from '../contexts/diagram-context';
import { ApollonContext } from '../contexts/editor-context';
import { convertRenderedSVGToPNG } from '../../utils/convert-rendered-svg-to-png';
import { NavbarTitle } from './title.component';
import { DesignPatternBadge } from './design-pattern-badge.component';
import styled from 'styled-components';
import { AssignDesignPatternModal } from '../assign-pattern-modal/assign-pattern-modal.component';
import { GenerateCodeButton } from '../generate-code-button/generate-code-button.component';
import { FileHandleContext } from '../contexts/file-handle-context';
import { LoadDiagramDropdownItem } from './load-diagram-dropdown-item.component';
import { SaveDiagramDropdownItem } from './save-diagram-dropdown-item.component';
import { writeFile } from '../../utils/file-handle';

const HorizontalLine = styled.hr`
  margin-top: 4px;
  margin-bottom: 0px;
  border-top: 1px solid gray;
`

export const NavigationBar = (): React.ReactElement => {
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showAssignPatternModal, setShowAssignPatternModal] = useState(false);

  const { diagram } = useContext(DiagramContext);
  const { editor } = useContext(ApollonContext);
  const { fileHandle } = useContext(FileHandleContext);

  const handleExportToPNG = () => {
    editor?.exportAsSVG().then((renderedSvg) => {
      return convertRenderedSVGToPNG(renderedSvg, true);
    }).then((blob: Blob) => {
      const options: SaveFilePickerOptions = {
        types: [
          {
            description: 'PNG Image',
            accept: {
              'image/png': ['.png'],
            },
          },
        ],
      }; 
      window.showSaveFilePicker(options).then(pngFileHandle => {
        writeFile(pngFileHandle, blob);
      }).catch(err => console.log(err));
    });
  }

  const handleExportToSVG = () => {
    editor?.exportAsSVG().then(renderedSVG => {
      const options: SaveFilePickerOptions = {
        types: [
          {
            description: 'SVG Image',
            accept: {
              'image/svg+xml': ['.svg'],
            },
          },
        ],
      }; 
      window.showSaveFilePicker(options).then(svgFileHandle => {
        writeFile(svgFileHandle, renderedSVG.svg);
      }).catch(err => console.log(err));
    })
  }

  return (
    <Fragment>
      <Navbar expand='lg' sticky='top' bg='light' className='border-bottom border-dark'>
        <Navbar.Collapse className='d-flex justify-content-between mx-3 mt-2'>
          <div className='flex-column' style={{minWidth: '25%'}}>
            <div className='d-flex align-items-center justify-content-between'>
              <NavbarTitle />
              <DesignPatternBadge className='mx-3' designPattern={diagram?.designPattern} onClick={() => setShowAssignPatternModal(true)}/>
            </div>
            <HorizontalLine />
            <div className='d-flex align-items-center gap-4'>
              <Nav variant='underline' className='gap-3'>
                <NavDropdown className='fs-5' title="File">
                  <NavDropdown.Item onClick={() => setShowNewFileModal(true)}>New</NavDropdown.Item>
                  <LoadDiagramDropdownItem />
                  <SaveDiagramDropdownItem />
                </NavDropdown>
                <NavDropdown className='fs-5' title='Export'>
                  <NavDropdown.Item onClick={handleExportToPNG}>as PNG image</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleExportToSVG}>as SVG image</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {!!fileHandle && <NavbarText>{fileHandle.name} loaded</NavbarText>}
            </div>
          </div>
          <div>
            <GenerateCodeButton />
          </div>
        </Navbar.Collapse>
      </Navbar>
      <NewFileModal show={showNewFileModal} onClose={() => setShowNewFileModal(false)}/>
      <AssignDesignPatternModal show={showAssignPatternModal} onClose={() => setShowAssignPatternModal(false)} />
    </Fragment>
  )
}
