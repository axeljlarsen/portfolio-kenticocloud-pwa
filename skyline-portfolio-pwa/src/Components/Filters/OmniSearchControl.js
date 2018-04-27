import React, { Component } from 'react';

import PortfolioStore from "../../Stores/PortfolioItem";

let getState = () => {
    return {
    };
};

class OmniSearchControl extends Component {
    constructor(props) {
        super(props);

        this.state = getState();

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onChange(event) {
        let that = this;
        let fieldsToFilter = that.props.fieldsToFilter;
        fieldsToFilter.forEach((fieldToFilter) => {
            that.props.filter[that.props["filterItemListName"]].push([fieldToFilter,event.target.value]);     
        });

        //that.props.filterToggleFunction(event.target.value, that.props.filter);

        PortfolioStore.setFilter(that.props.filter);
        that.setState(getState());

        if (that.props.parentControl && that.props.parentControl.onChange) {
            that.props.parentControl.onChange();
        }
    }

    render() {

        return (
            <input type="text" onChange={this.onChange} />
        );
    }
}


export default OmniSearchControl;
