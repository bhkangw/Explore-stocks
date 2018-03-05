import React, { Component } from 'react';
import './App.css';
import axios from 'axios'; // for making http requests to API
var NumberFormat = require('react-number-format'); // to format stock price

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    // prevents empty submission
    if (this.refs.stock.value === '') {
      alert('Field cannot be blank; please enter a stock symbol')
    }
    const symbols = this.refs.stock.value // const for input field value
    // use axios to make an http get request to API using symbols as params
    axios.get('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=' + symbols + '&apikey=0B24087DFLZ21EKU')
      .then(response => {
        const stocks = response.data['Stock Quotes']; // store API's stock quotes array as stocks
        this.setState({stocks: stocks}) // set state to stocks
      })
    this.refs.stock.value = ''; // resets input field to blank
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Explore Cons. Stock Ticker</h2>
        </div>

        <div className='jumbotron container'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <p>Enter a stock symbol to find current price (USD):</p>
              <input className='form-control' type='text' ref='stock' placeholder='Enter mutiple symbols separated by commas' /> <br />
              <input className='btn btn-success pull-right' type='submit' value='Submit' />
            </div>
          </form>
        </div>

        <div className='container'>
          {Object.keys(this.state.stocks).map((key, index) => (
            <div id='stocks-container' key={index}>
              <span className='left'>{this.state.stocks[key]['1. symbol']}</span>
              <span className='right'><NumberFormat value={this.state.stocks[key]['2. price']} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'} /></span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;