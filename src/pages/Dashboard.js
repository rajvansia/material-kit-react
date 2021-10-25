import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Sales from 'src/components/dashboard//Sales';
import Covid from 'src/components/dashboard/Covid';
import Vitalinfo from 'src/components/dashboard/Vitalinfo';
import VitalForm from 'src/components/vitals/VitalForm';
import { FhirClientContext } from 'src/FhirClientContext';
import fhirdata from 'src/__mocks__/fhirdata';

const DashboardView = (props) => (
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
            <Vitalinfo name="BP" vital={props.currentSpo[0]} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Vitalinfo name="HR" vital={props.currentHeartrate[0]} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Vitalinfo name="SPO2" vital={props.currentSpo[0]} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Vitalinfo name="Temprature" vital={props.currentSpo[0]} />
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
            <VitalForm />
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
        vitals: null,
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
        'http://loinc.org|8462-4', // diastolic blood pressure
        'http://loinc.org|8480-6', // systolic blood pressure
        'http://loinc.org|55284-4', // blood pressure systolic and diasoltic
        'http://loinc.org|8331-1', // oraltemprature
        'http://loinc.org|59408-5', // SPo2
        'http://loinc.org|8867-4', // heart rate
      ].join(','));
      this._loader = client.request('Observation?' + query, {
        pageLimit: 0, // get all pages
        flat: true // return flat array of Observation resources
      })
        .then(vitals => {
          const byCodes = client.byCodes(vitals, 'code');
          const currentSpo = byCodes('59408-5');
          const currentHeartrate = byCodes('8867-4');
          const currentTemprature = byCodes('8331-1');
          const currentBloodpressure = byCodes('55284-4');

          this.setState({
            vitals, currentSpo, currentHeartrate, currentTemprature, currentBloodpressure, loading: false, error: null
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });

      client.create(fhirdata[0]);
    }

    render() {
      const {
        error, loading, vitals
      } = this.state;
      if (loading) {
        return null;
      }
      if (error) {
        console.log(error.message);
        return error.message;
      }
      console.log(vitals);
      return <DashboardView {...this.state} />;
    }
}
