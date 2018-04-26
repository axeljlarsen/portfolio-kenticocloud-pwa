import React, { Component } from 'react';

import PortfolioStore from "../../Stores/PortfolioItem";

let getState = () => {
    return {
    };
};

class TaxonomyFilterControlItem extends Component {
    constructor(props) {
        super(props);

        this.state = getState();

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        //PortfolioStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        //PortfolioStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState(getState());
        this.props.filterToggleFunction(this.props.term.codename, this.props.filter);
        PortfolioStore.setFilter(this.props.filter);
    }

    render() {
        let codename = this.props.term.codename;
        let name = this.props.term.name;
        let checked = this.props.filter.techAndBusSkills.includes(codename);
        ////this might be necessary for modular content but doesn't work with taxonomy terms.
        //let checked = this.props.filter[this.props.filterItemListName].includes(this.props.term);

        // let childTerms = this.props.term.terms.reduce((result, childTerm, index) => {
        //     // result.push(
        //     //     <TaxonomyFilterControlItem term={childTerm} filter={this.props.filter} filterItemListName={this.props.filterItemListName} availableFilterItems={this.props.availableFilterItems} filterToggleFunction={this.props.filterToggleFunction} key={'childFilterItem_' + index + '_' + childTerm.codename} />
        //     // );
        //     return result;
        // }, []);
        return (
            <li className="filter-option">
                <span className="checkbox js-postback">
                    <input id={codename} type="checkbox" checked={checked} onChange={this.onChange} />
                    <label htmlFor={codename}>{name}</label>
                </span>
                {/* <ul className={childTerms.length < 1 ? 'hide d-none' : ''}>
                </ul> */}
            </li>
        );
    }
}


export default TaxonomyFilterControlItem;
