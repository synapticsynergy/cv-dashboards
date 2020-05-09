import React from 'react';
import axios from 'axios';
import {
  CircularProgress, Button,
} from '@material-ui/core';
import ListItem from './ListItem';

const styles = {
  progress: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    height: '80hv',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tryAgain: {
    margin: '20px 0',
  },
};

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      truckList: [],
      isFetching: true,
    };
  }

  componentWillMount() {
    const { latitude, longitude, location } = this.props;
    const data = {
      latitude,
      longitude,
      location,
    };
    axios.post('https://v0nnu8eif4.execute-api.us-west-2.amazonaws.com/dev/sfFoodTrucks', data).then((resp) => {
      this.setState({ truckList: resp.data.message, isFetching: false });
    }).catch((err) => {
      console.error(err, ' Failed to fetch resource');
      this.setState({ isFetching: false });
    });
  }

  render() {
    const { isFetching, truckList } = this.state;
    const { changeListView } = this.props;

    if (isFetching) {
      return (
        <div style={styles.progress}>
          <CircularProgress />
        </div>
      );
    }
    if (!isFetching && truckList.length === 0) {
      return (
        <div style={styles.noResults}>
          <h1>No Results Within Walking Distance.</h1>
          <div>
            <Button onClick={changeListView} style={styles.tryAgain} variant="contained" color="primary">Try Again</Button>
          </div>
        </div>
      );
    }
    const truckListComponent = truckList.length > 0 ? truckList.map((truck) => {
      return (
        <ListItem key={`${truck.address},${truck.applicant}`} truck={truck} />
      );
    }) : null;

    return (
      <div>
        {truckListComponent}
      </div>
    );
  }
}

export default ListView;