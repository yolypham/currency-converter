import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import '../styles/globalSelect.css'

class CurrencySelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOpen: false,
            headerTitle: this.props.title,
            amount: ""
        }
        this.close = this.close.bind(this)
    }

    componentDidUpdate() {
        const { listOpen } = this.state
        setTimeout(() => {
            if (listOpen) {
                window.addEventListener('click', this.close)
            }
            else {
                window.removeEventListener('click', this.close)
            }
        }, 0)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.close)
    }

    close(timeOut) {
        this.setState({
            listOpen: false
        })
    }

    selectItem(title, id, stateKey) {
        //console.log('selected ', title, id, stateKey)
        this.setState({
            headerTitle: title,
            listOpen: false
        }, this.props.resetThenSet(id, stateKey))

        this.props.onConversionTrigger(this.state.amount, title)
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    inputChangeHandler = (event) => {
        const val = event.target.value
        this.setState({ amount: val })

        if (this.state.headerTitle !== "...") {
            this.props.onConversionTrigger(val, this.state.headerTitle)
        }
    }

    resetAmount = () => {
        this.setState({ amount: "" })
        this.props.onClearInput()
    }

    render() {
        const { list } = this.props
        const { listOpen, headerTitle } = this.state
        return (
            <div className="select-control">
                <span className="dd-amount-box">
                    <span className="input-amount-box">
                        <input
                            className="dd-amount"
                            onChange={this.inputChangeHandler}
                            type="text"
                            value={this.state.amount}
                        ></input>
                    </span>

                    <span className="clear-x">
                        <FontAwesomeIcon icon={faTimes}
                            className="show-clear-x"
                            onClick={this.resetAmount} />
                    </span>

                </span>

                <span>&nbsp;</span>

                <span className="dd-wrapper">
                    <div className="dd-header" onClick={() => this.toggleList()}>
                        <div className="dd-header-title">{headerTitle}</div>
                        {listOpen
                            ? <FontAwesomeIcon icon={faAngleUp} size="2x" />
                            : <FontAwesomeIcon icon={faAngleDown} size="2x" />
                        }
                    </div>
                    {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
                        {list.map((item) => (
                            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected && <FontAwesomeIcon icon={faCheck} />}</li>
                        ))}
                    </ul>}
                </span>
            </div>

        )
    }
}

export default CurrencySelect
