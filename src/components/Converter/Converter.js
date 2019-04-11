import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 150,
    textAlign: "center"
  },
  textFieldNumber: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
    textAlign: "left",
    margin: 0
  },
  textFieldCurrency: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 80,
    textAlign: "left",
    margin: 15
  },
  paper: {
    height: 180,
    width: 700,
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  title: {
    padding: 15
  },
  button: {
    margin: 15
  },
  mess: {
    size: 5
  }
});

class Converter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      currencyKey: [],
      selectedCurrencyFrom: null,
      selectedCurrencyTo: null,
      namValue: 0
    };
  }

  getNamberValue = name => {
    this.setState({ numValue: name.target.value });
    const numberValue = name.target.value;
    console.log(numberValue);
  };

  componentDidMount() {
    axios
      .get("https://api.exchangeratesapi.io/latest?base=USD")
      .then(responce => {
        const currencies = responce.data;
        const currencyKey = Object.keys(currencies.rates);
        const currencyValues = Object.values(currencies.rates);
        console.log(currencyValues);
        console.log(currencyKey);
        console.log(currencies.rates);
        this.setState({ currencyKey });
      });
  }

  handleChangeFrom = event => {
    this.setState({ selectedCurrencyFrom: event.target.value });
    console.log(event.target.value);
    const currSelectedFrom = event.target.value;
    console.log(currSelectedFrom + " this is the selected curr From");
  };

  handleChangeTo = event => {
    this.setState({ selectedCurrencyTo: event.target.value });
    console.log(event.target.value);
    const currSelectedTo = event.target.value;
    console.log(currSelectedTo + " this is the selected curr To");
    if (!this.state.selectedCurrencyTo) {
      window.addEventListener("click", e => {
        this.converHendler(e);
      });
    }
  };

  converHendler = () => {
    if (this.state.selectedCurrencyFrom !== this.state.selectedCurrencyTo) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${
            this.state.selectedCurrencyFrom
          }&symbols=${this.state.selectedCurrencyTo}`
        )
        .then(response => {
          const cur = response.data;
          const result = this.state.numValue * Object.values(cur.rates);
          this.setState({ result: result.toFixed(2) });
          console.log(this.state.numValue);
          console.log(Object.values(cur.rates));
        });
    } else {
      this.setState({ result: "You can't convert the same currency!" });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="title" className={classes.title}>
            Exchange
          </Typography>
          <div className={classes.row}>
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              className={classes.textFieldNumber}
              onChange={this.getNamberValue}
              margin="normal"
            />
            <Select
              id="From"
              select
              label="Currency"
              className={classes.textFieldCurrency}
              value={this.state.selectedCurrencyFrom}
              onChange={this.handleChangeFrom}
              margin="normal"
            >
              <MenuItem value={this.state.currencyKey[0]}>
                {this.state.currencyKey[0]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[1]}>
                {this.state.currencyKey[1]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[2]}>
                {this.state.currencyKey[2]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[3]}>
                {this.state.currencyKey[3]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[4]}>
                {this.state.currencyKey[4]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[5]}>
                {this.state.currencyKey[5]}
              </MenuItem>
            </Select>

            <Select
              id="To"
              select
              label="Currency"
              className={classes.textFieldCurrency}
              value={this.state.selectedCurrencyTo}
              // onClick={this.converHendler}
              onChange={this.handleChangeTo}
              margin="normal"
            >
              <MenuItem value={this.state.currencyKey[0]}>
                {this.state.currencyKey[0]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[1]}>
                {this.state.currencyKey[1]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[2]}>
                {this.state.currencyKey[2]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[3]}>
                {this.state.currencyKey[3]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[4]}>
                {this.state.currencyKey[4]}
              </MenuItem>
              <MenuItem value={this.state.currencyKey[5]}>
                {this.state.currencyKey[5]}
              </MenuItem>
            </Select>

            {/* <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.converHendler}
            >
              Convert
            </Button> */}
          </div>
          <div className={classes.mes}>
            {this.state.result && <h3>{this.state.result}</h3>}
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Converter);
