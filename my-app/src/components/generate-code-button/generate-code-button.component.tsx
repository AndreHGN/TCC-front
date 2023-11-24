import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button, Spinner } from "react-bootstrap"
import { baseUrl } from '../../constants/base-url';
import { DiagramContext } from '../contexts/diagram-context';
import { downloadLink } from '../../utils/download-link';

export const GenerateCodeButton = (): React.ReactElement => {
  const [ isLoading, setIsLoading ] = useState(false);

  const { diagram } = useContext(DiagramContext);

  const handleGenerateCode = () => {
    setIsLoading(true);

    axios.post(`${baseUrl}/generate_project`,
    diagram?.model,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer',
      }
    ).then(response => {
      console.log(response.data);
      const blob = new Blob([response.data]);
      downloadLink(blob, `${diagram?.name}.zip`);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <Button
      className='btn-lg d-flex align-items-center'
      disabled={isLoading}
      onClick={handleGenerateCode}
    >
      {isLoading
        ? <Spinner as='span' animation='border'/>
        : <span>Generate Code Template</span>
      }
    </Button>
  )
}