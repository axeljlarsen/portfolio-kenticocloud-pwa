import React, { Component } from 'react';

import PortfolioStore from '../../Stores/PortfolioItem';
import TaxonomyFilterControl from './TaxonomyFilterControl';
import TaxonomyFilterControlItem from './TaxonomyFilterControlItem';
import OmniSearchControl from './OmniSearchControl';

let getState = () => {
  return {
    filteredFields: [],
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

    let techFilterControl;
    let featureFilterControl;
    let serviceFilterControl;
    if (availableTechSkills.length) {
      techFilterControl = <TaxonomyFilterControl filter={filter}
                            filterItemListName="techAndBusSkills"
                            availableFilterItems={availableTechSkills}
                            filterToggleFunction={filter.toggleTechAndBusSkills}
                            name="techFilter"
                            buttonText="Select Tech Used" />;
    }
    if (availableFeatures.length) {
      featureFilterControl = <TaxonomyFilterControl filter={filter}
                              filterItemListName="features"
                              availableFilterItems={availableFeatures}
                              filterToggleFunction={filter.toggleFeatures}
                              name="featureFilter"
                              buttonText="Select Features" />
    }
    if (availableServices.length) {
      serviceFilterControl = <TaxonomyFilterControl filter={filter}
                              filterItemListName="services"
                              availableFilterItems={availableServices}
                              filterToggleFunction={filter.toggleServices}
                              name="serviceFilter"
                              buttonText="Select Service" />
    }
    return (
      <div>

        <OmniSearchControl
          parentControl={this}
          filter={filter}
          filterItemListName="filteredFields"
          fieldsToFilter={['title']}/>

        {techFilterControl}
        {featureFilterControl}
        {serviceFilterControl}
      </div>
    );
  }
}


export default PortfolioFilter;
