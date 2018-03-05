import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
var NumberFormat = require('react-number-format');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    if (this.refs.stock.value === '') {
      alert('Cannot be blank')
    }
    const symbols = this.refs.stock.value
    axios.get('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=' + symbols + '&apikey=0B24087DFLZ21EKU')
      .then(response => {
        const stocks = response.data['Stock Quotes'];
        console.log(stocks);
        this.setState({stocks: stocks})
      })
      // .then(response => response.data['Stock Quotes'].map((item, index) => {
      //   let list = [];
      //   list.push(item['2. price'])
      //   console.log(list)
      //   this.setState({ stocks: list})
      // }))
    // console.log(this.state.stocks)
    // console.log(response.data['Stock Quotes'][0]['2. price'])
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Explore Consulting Stock Ticker</h2>
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
            <div id='stocks-container'>
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