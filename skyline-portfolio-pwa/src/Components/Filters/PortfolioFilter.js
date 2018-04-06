import React, { Component } from 'react';

import PortfolioStore from "../../Stores/PortfolioItem";
import TaxonomyFilterControl from "./TaxonomyFilterControl";

let getState = () => {
  return {
    techAndBusSkills: PortfolioStore.getTechAndBusSkills(),
    services: PortfolioStore.getServices(),
    features: PortfolioStore.getFeatures(),
    filter: PortfolioStore.getFilter()
  };
};

class PortfolioFilter extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PortfolioStore.addChangeListener(this.onChange);
    PortfolioStore.provideTechAndBusSkills();
    PortfolioStore.provideServices();
    PortfolioStore.provideFeatures();
  }

  componentWillUnmount() {
    PortfolioStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let availableTechSkills = this.state.techAndBusSkills;
    let availableServices = this.state.services;
    let availableFeatures = this.state.features;
    let filter = this.state.filter;
    if (availableTechSkills.length) {
      return (
        <div>
          <TaxonomyFilterControl filter={filter}
            filterItemListName="techAndBusSkills"
            availableFilterItems={availableTechSkills}
            filterToggleFunction={filter.toggleTechAndBusSkills}
            name="techFilter"
            buttonText="Select Tech Used" />

          {/* <TaxonomyFilter filter={filter} availableFilterItems={availableFeatures} filterToggleFunction={filter.toggleFeatures} name="featureFilter" buttonText="Select Features" /> */}
          {/* <TaxonomyFilter filter={filter} availableFilterItems={availableServices} filterToggleFunction={filter.toggleServices} name="serviceFilter" buttonText="Select Service" /> */}
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }
}

export default PortfolioFilter;
