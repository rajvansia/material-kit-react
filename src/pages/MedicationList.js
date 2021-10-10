import { Helmet } from 'react-helmet';
import React from 'react';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { FhirClientContext } from '../FhirClientContext';

const Medications = (customers) => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default class MedicationList extends React.Component {
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
      }).then(customers => {
        this.setState({ customers, loading: false, error: null });
      })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }

    render() {
      const { error, loading, customers } = this.state;
      // console.log(customers);

      if (loading) {
        return null;
      }
      if (error) {
        console.log(error.message);
        return error.message;
      }
      return <Medications {...customers} />;
    }
}
