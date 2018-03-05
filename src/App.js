import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

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

        <div className='container'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <label>Stock:</label> <br/>
              <input className='form-control' type='text' ref='stock' />
              <input className='btn btn-success' type='submit' value='Submit' />
            </div>
          </form>
          {Object.keys(this.state.stocks).map((key, index) => (
            <div id='stocks-container'>
              {this.state.stocks[key]['1. symbol']}
              {this.state.stocks[key]['2. price']}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;