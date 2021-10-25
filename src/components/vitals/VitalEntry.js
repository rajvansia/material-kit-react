import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function VitalEntry() {
  return (
    <div>
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
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="diastolic"
            name="diastolic"
            label="Diastolic mmhg"
            fullWidth
          />
        </Grid>

        <Typography variant="h6" gutterBottom>
        SPO2 Pulse Ox
        </Typography>
        <Grid item xs={12}>
          <TextField
            required
            id="spo2"
            name="spo2"
            label="SPO2 %"
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
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
}
