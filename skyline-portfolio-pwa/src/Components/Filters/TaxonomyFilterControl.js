import React, { Component } from 'react';

import PortfolioStore from "../../Stores/PortfolioItem";
import TaxonomyFilterControlItem from "./TaxonomyFilterControlItem";

let getState = (props) => {
    return {
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

    onChange() {        
        this.setState(getState());
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
            //term.codename = term.codename || term.system.codename;
            //term.name = term.name || term.system.name;
            //term.terms = term.terms || [{codename:term.codename, name:term.name}];

            return (
                <TaxonomyFilterControlItem term={term} filter={this.props.filter} filterItemListName={this.props.filterItemListName} availableFilterItems={this.props.availableFilterItems} filterToggleFunction={this.props.filterToggleFunction}  key={'filterItem_' + term.codename} />
            );
        });


        return (
            <div className="filter-control">
                <button className="filter-control-btn" onClick={(e) => onFilterControlClick(e)} data-target={'#' + this.props.name}>{this.props.buttonText}</button>
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