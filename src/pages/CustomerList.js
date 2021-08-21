import { Helmet } from 'react-helmet';
import React from 'react';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import Budgets from 'src/components/dashboard//Budgets';
import customers from 'src/__mocks__/customers';
import { FhirClientContext } from '../FhirClientContext';

const CustomerList = (patient) => (
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
          <Budgets name={patient} />
        </Box>
      </Container>
    </Box>
  </>
);

export default class CustomerLists extends React.Component {
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

      return <CustomerList {...entry} />;
    }
}
