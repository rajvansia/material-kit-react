import React from 'react';
import CovidInfo from 'src/components/dashboard/CovidInfo';
import { FhirClientContext } from 'src/FhirClientContext';

function PatientBanner() {
  return (
    <div>
      <CovidInfo name="Blood Pressure" value="150/94" date="10-3-2021" units="mmhg" />
    </div>
  );
}

export default class Covid extends React.Component {
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
