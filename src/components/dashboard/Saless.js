import React from 'react';
import { FhirClientContext } from '../../FhirClientContext';
import FhirClientProvider from '../FhirClientProvider';
import Patient from '../Patient';

function Headerbanner() {
  return (
    <FhirClientProvider>
      <div>
        <Patient />
      </div>
    </FhirClientProvider>
  );
}

export default class Saless extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        patient: null,
        error: null
      };
    }

    render() {
      const { error, loading, patient } = this.state;

      if (loading) {
        return null;
      }
      if (error) {
        return 'fuk';
      }
      return <Headerbanner {...patient} />;
    }
}
