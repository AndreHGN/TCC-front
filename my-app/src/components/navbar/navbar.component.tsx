import React from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';

export const NavigationBar = (): React.ReactElement => {
  return (
    <Navbar expand='lg'>
      <Navbar.Collapse>
        <Nav className='me-auto'>
          <NavDropdown title="Arquivo">
            <NavDropdown.Item>Novo</NavDropdown.Item>
            <NavDropdown.Item>Carregar diagrama</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Exportar'>
            <NavDropdown.Item>Como diagrama JSON</NavDropdown.Item>
            <NavDropdown.Item>Como imagem PNG</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
