import React, { Component } from 'react';
import "./SearchForm.scss"
import Button from '../button/Button';
import { getDateString, getDiffInDays } from 'app/util/utils';
import { ISearchState } from "app/views/dashboard/IDashBoard";

interface ISearchFormProps extends ISearchState {
    disabled: boolean
    onHandleChange: (key: string, value: string) => void
    onShowWeather: () => Promise<void>
}

class SearchForm extends Component<ISearchFormProps> {
    today: string

    constructor(props: ISearchFormProps) {
        super(props)

        this.today = getDateString(new Date())
    }

    render() {
        var errorTile = <></>
        if (this.props.from > this.props.to) {
            errorTile = <div className="search-form-error">Invalid date range.</div>
        } else if (getDiffInDays(this.props.from, this.props.to) > 10) {
            errorTile = <div className="search-form-error">Date range must not be longer then 10 days.</div>
        }
        return (
            <form className="search-form">
                <div className="input-block">
                    <label htmlFor="from">From</label>
                    <input
                        id="from"
                        name="From"
                        type="date"
                        value={getDateString(this.props.from)}
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
                        value={getDateString(this.props.to)}
                        min={this.today}
                        onChange={e => this.props.onHandleChange("to", e.target.value)}
                    />
                </div>
                {errorTile}
                <Button
                    to="/dashboard"
                    disabled={this.props.disabled}
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
