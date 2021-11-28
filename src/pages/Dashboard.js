import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  CircularProgress,
  Grid
} from '@material-ui/core';
import VitalsGraph from 'src/components/dashboard/VitalsGraph';
import NoData from 'src/components/dashboard/NoData';
import Covid from 'src/components/dashboard/Covid';
import Vitalinfo from 'src/components/dashboard/Vitalinfo';
import VitalForm from 'src/components/vitals/VitalForm';
import VitalsTable from 'src/components/dashboard/VitalsTable';
import { FhirClientContext } from 'src/FhirClientContext';

export default class Dashboard extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      console.log(props.name);
      this.state = {
        loading: true,
        vitals: null,
        error: null,
        name: 'SPO2',
        currentHeartrate: null,
        data: null,
        empty: {
          valueQuantity: {
            value: 'no entires',
            unit: ''
          }
        }
      };
      this.changeVital = this.changeVital.bind(this);
      this.getVitals = this.getVitals.bind(this);
    }
    // this loader is used for

    componentDidMount() {
      this.getVitals();
    }

    getVitals() {
      console.log('getting vit');
      this.setState({ loading: true });
      const query = new URLSearchParams();
      const client = this.context.client;
      console.log(client);
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
        'http://loinc.org|9279-1', // heart rate
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
          const currentRR = byCodes('9279-1');
          const data = currentHeartrate;

          this.setState({
            currentSpo, currentHeartrate, currentRR, currentTemprature, currentBloodpressure, data, loading: false, error: null
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }

    changeVital(vitaltype, data) {
      this.setState({ name: vitaltype, data });
    }

    render() {
      const {
        error, loading
      } = this.state;
      if (loading) {
        return <CircularProgress />;
      }
      if (error) {
        console.log(error.message);
        return error.message;
      }
      return (
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
                   <button type="button" value="hello!" onClick={() => this.changeVital('RR', this.state.currentRR)}>
                   {this.state.currentRR[0] ? <Vitalinfo name="Respiratory Rate" vital={this.state.currentRR[0]} /> : <Vitalinfo name="Respiratory Rate" vital={this.state.empty} /> }
                   </button>
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <button type="button" value="hello!" onClick={() => this.changeVital('Heart Rate', this.state.currentHeartrate)}>
                  {this.state.currentHeartrate[0] ? <Vitalinfo name="HR" vital={this.state.currentHeartrate[0]} /> : <Vitalinfo name="HR" vital={this.state.empty} /> }
                  </button>
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <button type="button" value="hello!" onClick={() => this.changeVital('SPO2', this.state.currentSpo)}>
                  {this.state.currentSpo[0] ? <Vitalinfo name="SPO2" vital={this.state.currentSpo[0]} /> : <Vitalinfo name="SPO2" vital={this.state.empty} /> }
                  </button>
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <button type="button" value="hello!" onClick={() => this.changeVital('Temp', this.state.currentTemprature)}>
                  {this.state.currentTemprature[0] ? <Vitalinfo name="Temprature" vital={this.state.currentTemprature[0]} /> : <Vitalinfo name="Temprature" vital={this.state.empty} /> }
                  </button>
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={16}
                  xl={12}
                  xs={16}
                >
                  <VitalForm getVitals={this.getVitals} />
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={16}
                  xl={12}
                  xs={16}
                >
                  {this.state.data[0] ? <VitalsGraph name={this.state.name} data={this.state.data} /> : <NoData />}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={16}
                  xl={12}
                  xs={16}
                >
                  {this.state.data[0] ? <VitalsTable name={this.state.name} data={this.state.data} /> : <div> </div>}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );
    }
}
