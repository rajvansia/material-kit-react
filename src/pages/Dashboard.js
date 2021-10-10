import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import VitalsTable from 'src/components/dashboard/VitalsTable';
import Sales from 'src/components/dashboard//Sales';
import Covid from 'src/components/dashboard/Covid';
import Spo from 'src/components/vitals/Spo';
import BP from 'src/components/vitals/BP';
import Rr from 'src/components/vitals/Rr';
import Temprature from 'src/components/vitals/Temprature';
import { FhirClientContext } from 'src/FhirClientContext';

const DashboardView = () => (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            sm={24}
            xl={12}
            xs={48}
          >
            <Covid />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <BP />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Rr />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Spo />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Temprature />
          </Grid>
          <Grid
            item
            lg={12}
            md={16}
            xl={12}
            xs={16}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={12}
            md={16}
            xl={12}
            xs={16}
          >
            <VitalsTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default class Dashboard extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      console.log(props.name);
      console.log('test');
      this.state = {
        loading: true,
        patient: null,
        error: null
      };
    }
    // this loader is used for

    componentDidMount() {
      const query = new URLSearchParams();
      const client = this.context.client;
      query.set('patient', client.patient.id);
      query.set('_count', 100);
      query.set('_sort', '-date'); // Try this to fetch fewer pages
      query.set('code', [
        'http://loinc.org|29463-7', // weight
        'http://loinc.org|8302-2', // Body height
        'http://loinc.org|8462-4',
        'http://loinc.org|8480-6',
        'http://loinc.org|2085-9',
        'http://loinc.org|2089-1',
        'http://loinc.org|55284-4',
        'http://loinc.org|3141-9',
      ].join(','));
      this._loader = client.request('Observation?' + query, {
        pageLimit: 0, // get all pages
        flat: true // return flat array of Observation resources
      })
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
      console.log(patient);
      const entry = 'test';
      return <DashboardView {...entry} />;
    }
}
