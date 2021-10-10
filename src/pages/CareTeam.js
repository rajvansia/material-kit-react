import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TeamCard from 'src/components/careteam//TeamCard';
import { FhirClientContext } from '../FhirClientContext';

const Care = (teams) => (
  <>
    <Helmet>
      <title>CareTeam | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {teams.teams.map((person) => (
              <Grid
                item
                key={person.id}
                lg={4}
                md={6}
                xs={12}
              >
                <TeamCard person={person} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  </>
);

export default class CareTeam extends React.Component {
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
      const queryTeam = new URLSearchParams();
      queryTeam.set('patient', client.patient.id);
      console.log(client);
      this._loader = client.request('CareTeam?' + queryTeam, {
        pageLimit: 0, // get all pages
        flat: true // return flat array of Observation resources
      }).then(care => {
        this.setState({ care, loading: false, error: null });
      })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }

    render() {
      const { error, loading, care } = this.state;

      if (loading) {
        return null;
      }
      if (error) {
        console.log(error.message);
        return error.message;
      }
      const teams = Object.values(care);
      console.log(teams);
      return <Care teams={teams} />;
    }
}
