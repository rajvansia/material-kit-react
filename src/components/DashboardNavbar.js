import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './Logo';
import { FhirClientContext } from '../FhirClientContext';

const DashboardNavbars = (props) => {
  const [notifications] = [1, 1];

  return (
    <AppBar
      elevation={0}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        {props.given.join(' ') + ' ' + props.family + notifications}
        <Hidden lgUp>
          <IconButton
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default class DashboardNavbar extends React.Component {
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
      return <DashboardNavbars {...entry} />;
    }
}
