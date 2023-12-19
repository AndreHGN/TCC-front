import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button, Spinner } from "react-bootstrap"
import { baseUrl } from '../../constants/base-url';
import { DiagramContext } from '../contexts/diagram-context';
import { downloadLink } from '../../utils/download-link';
import { UMLModel } from '@ls1intum/apollon';
import { ErrorsModal } from '../errors-modal/errors-modal.component';

const genericClassAttributeRegex = /^[#\-+]\s\w+\s?(:\s?\w+(<\w+>)?)?(\s?=\s?(('\w+'|"\w+"|\[.*\])|([[\]\w().])+))?$/;
const enumAttributeRegex = /^([#\-+]\s)?\w+\s?(:\s?\w+(<\w+>)?)?(\s?=\s?(('\w+'|"\w+"|\[.*\])|([[\]\w().])+))?$/;
const methodRegex = /^[#\-+]\s((get|set)\s)?\w+\(.*?\)\s?(:\s?\w+(<\w+>)?)?$/

type ErrorElement = {
  name: string,
  attributes: string[],
  methods: string[],
}

export type Errors = {
  [id: string]: ErrorElement,
}

export const GenerateCodeButton = (): React.ReactElement => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errors, setErrors ] = useState<Errors>({});
  const [ showErrorsModal, setShowErrorsModal ] = useState(false);

  const { diagram } = useContext(DiagramContext);

  const handleGenerateCode = () => {
    if (diagram?.model) {
      setIsLoading(true);
      const validatedErrors = validateAttributesAndMethods(diagram?.model);
      setErrors(validatedErrors);

      if(Object.keys(validatedErrors).length > 0) {
        setShowErrorsModal(true);
        setIsLoading(false);
      } else {
        axios.post(`${baseUrl}/generate_project`,
        diagram?.model,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer',
          }
        ).then(response => {
          const blob = new Blob([response.data]);
          downloadLink(blob, `${diagram?.name}.zip`);
        }).finally(() => {
          setIsLoading(false);
        })
      }
    }

  }

  return (
    <>
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
      {Object.keys(errors).length > 0 &&
        <ErrorsModal show={showErrorsModal} onClose={() => setShowErrorsModal(false)} errors={errors} />
      }
    </>
  )
}

const validateAttributesAndMethods = (model: UMLModel): Errors => {
  const elements = model.elements;
  const errors: Errors = {};

  const attributes = Object.keys(elements).filter(key => elements[key].type === 'ClassAttribute');
  const methods = Object.keys(elements).filter(key => elements[key].type === 'ClassMethod');

  attributes.forEach(key => {
    const ownerKey = elements[key].owner as string;
    
    const regex = elements[ownerKey].type === 'Enumeration'
      ? enumAttributeRegex
      : genericClassAttributeRegex;

    if(!regex.test(elements[key].name)) {
      if (ownerKey in errors) {
        errors[ownerKey] = {
          ...errors[ownerKey],
          attributes: errors[ownerKey].attributes.concat(elements[key].name)
        }
      } else {
        errors[ownerKey] = {
          name: elements[ownerKey].name,
          attributes: [elements[key].name],
          methods: [],
        }
      }
    }
  })

  methods.forEach(key => {
    const ownerKey = elements[key].owner as string;

    if(!methodRegex.test(elements[key].name)) {
      if (ownerKey in errors) {
        errors[ownerKey] = {
          ...errors[ownerKey],
          methods: errors[ownerKey].methods.concat(elements[key].name)
        }
      } else {
        errors[ownerKey] = {
          name: elements[ownerKey].name,
          methods: [elements[key].name],
          attributes: [],
        }
      }
    }
  })

  return errors;
}