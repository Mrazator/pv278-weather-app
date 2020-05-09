import React, { Component } from 'react';
import "./SearchForm.scss"
import Button from '../button/Button';
import { getDateString } from 'app/util/utils';
import { ISearchState } from 'app/views/dashboard/Dashboard';

interface ISearchFormProps extends ISearchState {
    onHandleChange: (key: string, value: string) => void
    onShowWeather: () => Promise<void>
}

class SearchForm extends Component<ISearchFormProps> {
    today: string

    constructor(props: ISearchFormProps) {
        super(props)

        this.today = getDateString(new Date())
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
                    <input
                        id="from"
                        name="From"
                        type="date"
                        value={this.props.from}
                        min={this.today}
                        onChange={e => this.props.onHandleChange("from", e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="to">To</label>
                    <input
                        id="to"
                        name="To"
                        type="date"
                        value={this.props.to}
                        min={this.today}
                        onChange={e => this.props.onHandleChange("to", e.target.value)}
                    />
                </div>

                <Button
                    to="/dashboard"
                    onClick={this.props.onShowWeather}
                    className="show-weather-button"
                >
                    Show Weather
                </Button>
            </form>
        );
    }
}

export default SearchForm;