import { Helmet } from 'react-helmet';
import React from 'react';
import { Box, Container } from '@material-ui/core';
import MedicationList from 'src/components/medication/MedicationList';
import MedicationToolbar from 'src/components/medication/MedicationToolbar';
import { FhirClientContext } from '../FhirClientContext';

const Medications = (meds) => (
  <>
    <Helmet>
      <title>Medications | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <MedicationToolbar />
        <Box sx={{ pt: 3 }}>
          <MedicationList meds={meds} />
        </Box>
      </Container>
    </Box>
  </>
);

export default class Medication extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        patient: null,
        error: null
      };
    }
    // this loader is used for

    componentDidMount() {
      const client = this.context.client;
      const queryMed = new URLSearchParams();
      queryMed.set('patient', client.patient.id);
      console.log(client);
      this._loader = client.request('MedicationRequest?' + queryMed, {
        pageLimit: 0, // get all pages
        flat: true // return flat array of Observation resources
      }).then(meds => {
        this.setState({ meds, loading: false, error: null });
      })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }

    render() {
      const { error, loading, meds } = this.state;
      // console.log(customers);

      if (loading) {
        return null;
      }
      if (error) {
        console.log(error.message);
        return error.message;
      }
      return <Medications {...meds} />;
    }
}
