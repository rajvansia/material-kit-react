import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PhoneIcon from '@material-ui/icons/Phone';

const TeamCard = ({ person }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
  >
    <CardContent>
      <Typography
        align="left"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        Name:
        {' '}
        {person.participant[1].member.display}
      </Typography>
      <Typography
        align="left"
        color="textPrimary"
        variant="body1"
      >
        Position:
        {' '}
        {person.participant[1].role[0].text}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <PersonPinCircleIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {person.managingOrganization[0].display}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <PhoneIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {person.id}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default TeamCard;
