import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';

const CovidInfo = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h3"
          >
            Covid Hospital Recommendation
          </Typography>
          <Typography
            sx={{
              mr: 1
            }}
            variant="h2"
          >
            <span>You should self quarantine at home</span>
            <span> </span>
            <span>If feeling shortness of breath or feel that you need to go to the emergency room pleaes call 911 imedieatly</span>
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          Covid Lab test Date Recorded:
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Negative on 9-12-21
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default CovidInfo;
