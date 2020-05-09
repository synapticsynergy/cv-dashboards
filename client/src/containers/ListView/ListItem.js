import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import red from '@material-ui/core/colors/red';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.mapClick = this.mapClick.bind(this);
    this.uberPressed = this.uberPressed.bind(this);
  }

  mapClick() {
    const { address, latitude, longitude } = this.props.truck;
    let baseURL;
    let address1;
    let address2;
    if (address.length > 0) {
      baseURL = 'http://maps.google.com/maps?q=';
      address1 = address;
      address2 = 'San Francisco';
    } else {
      baseURL = 'http://maps.google.com/maps?q=';
      address1 = latitude;
      address2 = longitude;
    }
    const url = `${baseURL}${address1},${address2}`;
    try {
      window.open(encodeURI(url));
    } catch (err) {
      console.error(err, `Could not open ${url}`);
    }
  }

  uberPressed() {
    const { applicant, address, latitude, longitude } = this.props.truck;
    const baseURL = 'https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff';
    const url = `${baseURL}[latitude]=${latitude}&dropoff[longitude]=${longitude}&dropoff[nickname]=${applicant}`;
    try {
      window.open(encodeURI(url));
    } catch (err) {
      console.error(err, ' Failed to open url to Uber');
    }
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { applicant, fooditems, dayshours, distance } = this.props.truck;

    return (
      <Card>
        <CardHeader
          title={applicant}
          subheader={dayshours}
        />
        <CardContent>
          <Typography component="p">
            {fooditems}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography component="p">
            {`${distance} Miles`}
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '15px' }}>
            <Fab onClick={this.mapClick} variant="extended" aria-label="Delete">
              <NavigationIcon />
              Maps
            </Fab>
            <Fab onClick={this.uberPressed} variant="extended" aria-label="Delete">
              <NavigationIcon />
              Uber
            </Fab>
          </div>
        </CardActions>
      </Card>
    );
  }
}

// RecipeReviewCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ListItem);