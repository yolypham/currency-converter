import React, { Component } from 'react';
import Header from './components/Header'
import CurrencySelect from './components/CurrencySelect'
import { postConversion } from './services/currencyService'
import './App.css';

const USD_CURRENCY = "USD"

const currencyFormats = [
  {
    type: "USD",
    formatter:
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
  },
  {
    type: "CAD",
    formatter:
      new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
      })
  },
  {
    type: "GBP",
    formatter:
      new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
      })
  },
  {
    type: "EUR",
    formatter:
      new Intl.NumberFormat('it-TI', {
        style: 'currency',
        currency: 'EUR'
      })
  }
]

class App extends Component {
  constructor() {
    super()
    this.state = {
      currency: [
        {
          id: 0,
          title: 'CAD',
          selected: false,
          key: 'currency'
        },
        {
          id: 1,
          title: 'GBP',
          selected: false,
          key: 'currency'
        },
        {
          id: 2,
          title: 'EUR',
          selected: false,
          key: 'currency'
        }
      ],
      fromCurrency: '',
      fromValue: 0,
      toValue: 0
    }
  }

  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    })
  }

  clearInputHandler = async () => {
    this.setState({ fromCurrency: "" })
  }

  convertHandler = async (value, currencyType) => {
    const numVal = value.replace(/,/g, '')
    try {
      //POST
      const conversionResult = await postConversion(
        {
          amount: numVal,
          currency: currencyType
        })

      if (conversionResult === null) {
        console.log('Check API server')
        alert('API server is down, please contact support')
        return
      }

      await this.setState({
        fromValue: numVal,
        fromCurrency: currencyType,
        toValue: conversionResult.amount
      })
    } catch (error) {
      console.log('Check API server')
      alert('API server is down, please contact support')
    }

  }

  render() {
    let conversionDiv = ""

    if (this.state.fromCurrency !== "") {
      const fromCurrencyObj = currencyFormats.find(o => o.type === this.state.fromCurrency)

      const toCurrencyObj = currencyFormats.find(o => o.type === USD_CURRENCY)

      const fromValFormatted = (fromCurrencyObj.formatter.format(this.state.fromValue));
      const toValFormatted = (toCurrencyObj.formatter.format(this.state.toValue));

      conversionDiv = this.state.toValue ? (
        <div className="result-div">
          <h2>{fromValFormatted}  {this.state.fromCurrency} = {toValFormatted} {toCurrencyObj.type}</h2>
        </div>
      ) : ""
    }


    return (
      <div className="App">

        <Header />
        <p><br />Enter amount and select currency to convert to US $ equivalent amount:</p>
        <div className="select-div">
          <CurrencySelect
            title="..."
            list={this.state.currency}
            resetThenSet={this.resetThenSet}
            onConversionTrigger={this.convertHandler}
            onClearInput={this.clearInputHandler}
          />
        </div>

        {conversionDiv}

      </div>
    );
  }
}

export default App;
