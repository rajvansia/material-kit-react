import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import fhirdata from 'src/__mocks__/fhirdata';
import { FhirClientContext } from 'src/FhirClientContext';

export default class VitalForm extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        patient: null,
        error: null,
        client: null,
        open: false,
        systolic: '',
        diastolic: '',
        rr: '',
        mood: '',
        spo: '',
        temp: '',
        hr: ''

      };
    }

    componentDidMount() {
      this.setState({ client: this.context.client });
      console.log(this.context.client);
    }

    render() {
      const handleClose = () => {
        const vitaltypes = ['systolic', 'diastolic', 'spo', 'rr', 'hr', 'temp'];
        this.setState({ open: false });
        const date = new Date();
        const isodate = date.toISOString();
        const pid = this.context.client.patient.id;

        Object.values(vitaltypes).forEach((type) => {
          if (this.state[type]) {
            console.log(type);
            console.log(this.state[type]);
            const data = fhirdata[type];
            data.valueQuantity.value = this.state[type];
            data.effectiveDateTime = isodate;
            data.issued = isodate;
            data.subject.reference = 'Patient/' + pid;
            this.context.client.create(data);
          }
        });

        this.setState({
          systolic: '',
          diastolic: '',
          mood: '',
          spo: '',
          rr: '',
          hr: '',
          temp: ''
        });
        this.props.getVitals();
      };

      const inputChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

      return (
        <div>
          <Button variant="outlined" color="primary" onClick={() => this.setState({ open: true })}>
            Add New Vitals
          </Button>
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Vitals</DialogTitle>
            <DialogContent>
            <Typography variant="h6" gutterBottom>
            Blood Pressure
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="systolic"
                  name="systolic"
                  label="Systolic mmhg"
                  value={this.state.systolic}
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="diastolic"
                  name="diastolic"
                  label="Diastolic mmhg"
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Grid>

              <Typography variant="h6" gutterBottom>
              SPO2 Pulse Ox
              </Typography>
              <Grid item xs={12}>
                <TextField
                  required
                  id="spo"
                  name="spo"
                  label="SPO2 %"
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Grid>

              <Typography variant="h6" gutterBottom>
              Heart rate
              </Typography>
              <Grid item xs={12}>
                <TextField
                  required
                  id="hr"
                  name="hr"
                  label="Heart Rate bpm"
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Grid>

              <Typography variant="h6" gutterBottom>
              Respiratory Rate
              </Typography>
              <Grid item xs={12}>
                <TextField
                  id="rr"
                  name="rr"
                  label="Respiratory Rate breaths/min"
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Grid>
              <Typography variant="h6" gutterBottom>
              Temprature
              </Typography>
              <Grid item xs={12}>
                <TextField
                  required
                  id="temp"
                  name="temp"
                  label="Temprature C"
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Grid>

              <Typography variant="h6" gutterBottom>
              Mood
              </Typography>
              <Grid item xs={12}>
                <TextField
                  required
                  id="mood"
                  name="mood"
                  label="How are you feeling?"
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Sumbit Vitals
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
