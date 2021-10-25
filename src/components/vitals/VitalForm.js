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

export default function VitalForm() {
  const [open, setOpen] = React.useState(false);
  const [vitals, setVitals] = React.useState({
    systolic: '',
    mood: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log({ vitals });
    console.log(fhirdata[0]);
  };

  const inputChangeHandler = (event) => {
    setVitals({
      ...vitals,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Vitals
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
              value={vitals.systolic}
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
