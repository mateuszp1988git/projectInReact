const Cash = (props) => {
  const value = (props.cash / props.ratio * props.price).toFixed(2)
  return (
    <div>{props.title} {props.cash <= 0 ? "" : value}</div>
  )
}

class ExchangeCounter extends React.Component {

  state = {
    amount: "",
    product: "gas"
  }

  static defaultProps = {
    currencies: [
      {
        id:0,
        name: 'PLN',
        ratio: 1,
        title: 'Value in PLN:'
      },
      {
        id:1,
        name: 'dollar',
        ratio: 4.1,
        title: 'Value in dollars:'
      },
      {
        id:2,
        name: 'euro',
        ratio: 4.4,
        title: 'Value in euros:'
      },
      {
        id:1,
        name: 'pound',
        ratio: 4.6,
        title: 'Value in Swiss francs:'
      },
    ],
    prices: {
      electricity: 1.50,
      gas: 5.99,
      apples: 7.99,
    }
  }

  handleChange = e => {
    this.setState({
      amount: e.target.value
    })
  }

  handleSelect = e => {
    this.setState({
      product: e.target.value,
      amount: "",
    })
  }

  insertSuffix(select) {
    if (select === "electricity") return <em>  kWh</em>
    else if (select === "gas") return <em>  liters</em>
    else if (select === "apples") return <em>  kilometers</em>
    else return null
  }

  selectPrice(select) {
    const price = this.props.prices[select]
    return price
  }

  render() {
    const { amount, product } = this.state;
    const price = this.selectPrice(product)

    const calculators = this.props.currencies.map(currency => (
      <Cash key={currency.id} ratio={currency.ratio} title={currency.title} cash={amount} price={price} />
    ))
    return (
      <div className="app">
       <label>Select a product:   
       <select className="select" value={product} onChange={this.handleSelect}>
            <option value="electricity">electricity</option>
            <option value="gas">gas</option>
            <option value="apples">apples</option>
          </select>
        </label>
        <br/>
        <label className="label">
          <input
            className="input" 
            type="number"
            value={this.state.amount}
            onChange={this.handleChange}
          />
          {this.insertSuffix(this.state.product)} 
        </label>
        {calculators}
      </div>
    )
  }
}
ReactDOM.render(<ExchangeCounter />, document.getElementById('root'))
