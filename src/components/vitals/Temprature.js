import React from 'react';
import Vitalinfo from 'src/components/dashboard/Vitalinfo';
import { FhirClientContext } from 'src/FhirClientContext';

function PatientBanner() {
  return (
    <div>
      <Vitalinfo name="Temprature" value="94" date="10-3-2021" units="F" />
    </div>
  );
}

export default class Temprature extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      console.log(props.name);
      this.state = {
        loading: true,
        patient: null,
        error: null
      };
    }
    // this loader is used for

    componentDidMount() {
      const client = this.context.client;
      console.log(client);
      this._loader = client.patient
        .read()
        .then(patient => {
          this.setState({ patient, loading: false, error: null });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }

    render() {
      const { error, loading, patient } = this.state;

      if (loading) {
        return null;
      }
      if (error) {
        console.log(error.message);
        return error.message;
      }
      const entry = patient.name.find(nameRecord => nameRecord.use === 'official') || [0];
      return <PatientBanner {...entry} />;
    }
}
