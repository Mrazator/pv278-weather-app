import React, { Component } from 'react';
import "./SearchForm.scss"
import Button from '../button/Button';

interface IState {
    from: string,
    to: string
}

class SearchForm extends Component<{}, IState> {

    today: string

    constructor(props: {}) {
        super(props)

        var today = new Date()
        var weekAfter = new Date()
        weekAfter.setDate(weekAfter.getDate() - 7)

        var getDateString = (date: Date) => { return `${date.getFullYear()}-${date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}` }

        this.state = {
            from: getDateString(today),
            to: getDateString(weekAfter)
        }

        this.today = getDateString(today)
    }

    onFromChangeValue(value: string) {
        this.setState({ from: value })
    }

    onToChangeValue(value: string) {
        this.setState({ to: value })
    }

    render() {
        return (
            <form className="search-form">
                <div className="input-block">
                    <label htmlFor="from">From</label>
                    <input type="date" value={this.state.from} min={this.today} onChange={e => this.onFromChangeValue(e.target.value)} id="from" name="From" />
                </div>
                <div className="input-block">
                    <label htmlFor="to">To</label>
                    <input type="date" value={this.state.to} min={this.today} onChange={e => this.onToChangeValue(e.target.value)} id="to" name="To" />
                </div>
                <Button to="/result" className="show-weather-button">Show Weather</Button>
            </form>
        );
    }
}

export default SearchForm;