import React from 'react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationSearching';
import ListView from '../ListView';

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  formView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  formGroup: {
    display: 'flex',
    padding: '0',
    margin: '0',
    justifyContent: 'center',
  },
  titleP: {
    marginTop: 0,
  },
  p: {
    fontSize: 12,
    color: 'grey',
  },
  formInput: {
    flexGrow: 1,
  },
};

class FormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      latitude: '',
      longitude: '',
      food: '',
      isFetching: false,
    };

    this.changeLocation = this.changeLocation.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this);
    this.updateCurrentLocation = this.updateCurrentLocation.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  changeLocation(event) {
    this.setState({ location: event.target.value });
  }

  updateCurrentLocation(location) {
    const { coords } = location;
    const { latitude, longitude } = coords;
    this.setState({
      location: 'Current Location',
      latitude,
      longitude,
      isFetching: false,
    });
  }

  useCurrentLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    this.setState(
      () => ({ isFetching: true }),
      () => {
        navigator.geolocation.getCurrentPosition(this.updateCurrentLocation, (err) => {
          console.error(err, ' Error Getting Position');
        }, options);
      },
    );
  }

  changeCategory(event) {
    this.setState({ food: event.target.value });
  }

  handleEnter(e) {
    const { toggleListView } = this.props;
    // This is the keyCode for the enter key
    if (e.keyCode === 13) {
      toggleListView();
    }
  }

  render() {
    let submitButton;
    let formOrListView;
    const { location } = this.state;
    const { toggleListView, listView } = this.props;

    if (location) {
      submitButton = (
        <Button onClick={toggleListView} variant="contained" color="primary">
          Submit
        </Button>
      );
    } else {
      submitButton = (
        <Button onClick={toggleListView} variant="contained" color="primary" disabled>
          Submit
        </Button>
      );
    }

    if (listView) {
      formOrListView = <ListView {...this.state} changeListView={toggleListView} />;
    } else {
      formOrListView = (
        <div>
          <div style={styles.formView}>
            <h2>Food Trucks Within Walking Distance</h2>
            <p style={styles.titleP}>San Francisco Edition</p>
            <form
              className="formContainer"
              noValidate
              autoComplete="off"
              style={styles.formContainer}
            >
              <div style={styles.formGroup}>
                {/* <Button onClick={this.useCurrentLocation} variant="contained" color="primary">
                  <LocationIcon />
                </Button> */}
                <TextField
                  id="filled-location"
                  label="Location"
                  className="textField"
                  value={location}
                  onChange={this.changeLocation}
                  onKeyDown={this.handleEnter}
                  variant="filled"
                  style={styles.formInput}
                />
              </div>
              <p style={styles.p}>Example: 278 Post St, San Francisco, CA 94108</p>
              <br />
              {submitButton}
            </form>
          </div>
        </div>
      );
    }

    return formOrListView;
  }
}

export default FormView;