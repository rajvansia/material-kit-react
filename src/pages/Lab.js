import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import LabList from 'src/components/dashboard//LabList';
import { FhirClientContext } from '../FhirClientContext';

const LabView = (labs) => (
  <>
    <Helmet>
      <title>Labs | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <LabList labs={labs} />
      </Container>
    </Box>
  </>
);

export default class Lab extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        labs: null,
        error: null
      };
    }
    // this loader is used for

    componentDidMount() {
      const client = this.context.client;
      const queryLab = new URLSearchParams();
      queryLab.set('patient', client.patient.id);
      queryLab.set('category', 'laboratory');
      console.log(client);
      this._loader = client.request('Observation?' + queryLab, {
        pageLimit: 0, // get all pages
        flat: true // return flat array of Observation resources
      }).then(labs => {
        this.setState({ labs, loading: false, error: null });
      })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }

    render() {
      const { error, loading, labs } = this.state;
      console.log(labs);

      if (loading) {
        return null;
      }
      if (error) {
        console.log(error.message);
        return error.message;
      }

      return <LabView {...labs} />;
    }
}
