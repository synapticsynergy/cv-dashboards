import React from 'react';
import {
  AppBar,
  Typography,
} from '@material-ui/core';
import './App.css';
// import FormView from './containers/FormView';
import ObjectDetectionView from './containers/ObjectDetectionView';
import Simple from './containers/Annotation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: false,
    };
    this.toggleListView = this.toggleListView.bind(this);
    // this.backToFormView = this.backToFormView.bind(this);
  }

  toggleListView() {
    const { listView } = this.state;
    this.setState({ listView: !listView });
  }

  backToFormView() {
    this.setState({ listView: false });
  }

  render() {
    return (
      <div className="App">
        <AppBar
          position="static"
        >
          <Typography
            style={{ margin: '10px 0' }}
            variant="h6"
            color="inherit"
            onClick={this.backToFormView}
          >
          Computer Vision Dashboards
          </Typography>
        </AppBar>
        <ObjectDetectionView/>
        {/* <FormView toggleListView={this.toggleListView} {...this.state} /> */}
        {/* <Simple/> */}
      </div>
    );
  }
}

export default App;