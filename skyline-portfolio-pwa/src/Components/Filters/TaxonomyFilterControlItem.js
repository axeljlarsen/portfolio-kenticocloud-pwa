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
    }

    componentWillUnmount() {
    }

    onChange(event) {
        let filteredItems = this.props.filter[this.props["filterItemListName"]];
        let termChecked = filteredItems.includes(this.props.term.codename);

        if (this.props.term.terms) {
            this.props.term.terms.reduce((result, childTerm, index) => {
                let childChecked = this.props.filter[this.props["filterItemListName"]].includes(childTerm.codename);
                if (termChecked == childChecked) {
                    this.props.filterToggleFunction(childTerm.codename, this.props.filter);
                }

                return childTerm.codename;
            }, []);
        }

        this.props.filterToggleFunction(this.props.term.codename, this.props.filter);
        PortfolioStore.setFilter(this.props.filter);
        this.setState(getState());

        if (this.props.parentControl && this.props.parentControl.onChange) {
            this.props.parentControl.onChange();
        }
    }

    render() {
        let codename = this.props.term.codename || this.props.term.system.codename;
        let name = this.props.term.name || this.props.term.caption.value;
        let checked = this.props.filter[this.props.filterItemListName].includes(codename);
        let childTerms = [];
        if (this.props.term.terms) {
            childTerms = this.props.term.terms.reduce((result, childTerm, index) => {
                result.push(
                    <TaxonomyFilterControlItem parentControl={this.props.parentControl} term={childTerm} filter={this.props.filter} filterItemListName={this.props.filterItemListName} availableFilterItems={this.props.availableFilterItems} filterToggleFunction={this.props.filterToggleFunction} key={'childFilterItem_' + index + '_' + childTerm.codename} />
                );
                return result;
            }, []);
        }
        let childUl = <ul>{childTerms}</ul>;
        return (
            <li className="filter-option">
                <span className="checkbox js-postback">
                    <input id={codename} type="checkbox" checked={checked} onChange={this.onChange} />
                    <label htmlFor={codename}>{name}</label>
                </span>
                {childUl}
            </li>
        );
    }
}


export default TaxonomyFilterControlItem;
