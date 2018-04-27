import React, { Component } from 'react';

import PortfolioStore from "../../Stores/PortfolioItem";
import TaxonomyFilterControlItem from "./TaxonomyFilterControlItem";

let getState = (props) => {
    return {
        filterApplied: props.filterApplied || '',
        buttonText: props.buttonText || 'Filter Items',
        buttonTextModifier: props.buttonTextModifier || ''
    };
};

class TaxonomyFilterControl extends Component {
    constructor(props) {
        super(props);

        this.state = getState(props);

        this.onChange = this.onChange.bind(this);
    }


    componentDidMount() {
        //PortfolioStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        //PortfolioStore.removeChangeListener(this.onChange);
    }

    onChildItemChange(terms) {
        alert(terms.length);
    }

    onChange() {
        let filteredItems = this.props.filter[this.props["filterItemListName"]];
        let filterApplied = filteredItems.length > 0 ? 'filter-applied' : '';
        let buttonText = this.state.buttonText
        let buttonTextModifier = filteredItems.length > 0 ? ' (' + filteredItems.length + ')' : '';
        this.setState(getState(
            {
                filterApplied: filterApplied,
                buttonText: buttonText,
                buttonTextModifier: buttonTextModifier
            }));

    }

    render() {

        let onFilterControlClick = (event) => {
            var target = document.querySelector(event.currentTarget.dataset.target);
            if (target.classList.contains('open')) {
                event.currentTarget.classList.remove('active');
                target.classList.remove('open');
            }
            else {
                event.currentTarget.classList.add('active');
                target.classList.add('open')
            }
        }

        let filterItems = this.props.availableFilterItems.map((term) => {
            term.codename = term.codename || term.system.codename;
            term.name = term.name || term.system.name;

            return (
                <TaxonomyFilterControlItem parentControl={this} term={term} filter={this.props.filter} filterItemListName={this.props.filterItemListName} availableFilterItems={this.props.availableFilterItems} filterToggleFunction={this.props.filterToggleFunction} key={'filterItem_' + term.codename} />
            );
        });


        return (
            <div className="filter-control">
                <button className={'filter-control-btn ' + (this.state.filterApplied || this.props.filterApplied)} onClick={(e) => onFilterControlClick(e)} data-target={'#' + this.props.name}>{this.state.buttonText}{this.state.buttonTextModifier}</button>
                <div id={this.props.name} className="filter-option-panel">
                    <ul className="filter-options">
                        {filterItems}
                    </ul>
                </div>
            </div>
        );
    }
}

export default TaxonomyFilterControl;
