import React, { Component } from 'react';

import PortfolioStore from "../Stores/PortfolioItem";

let getState = () => {
  return {
    techAndBusSkills: PortfolioStore.getTechAndBusSkills(),
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
  }

  componentWillUnmount() {
    PortfolioStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let techAndBusSkills = this.state.techAndBusSkills;
    let filter = this.state.filter;

    return (
      <aside className="col-md-4 col-lg-3 product-filter">
        <TechAndBusinessSkillFilter techAndBusSkills={techAndBusSkills} filter={filter} />
      </aside>
    );
  }
}

const TechAndBusinessSkillFilter = (props) => {
  let filterItems = props.techAndBusSkills.map((skill) => {
    return (
      <ul>
        <TechAndBusinessSkillFilterItem skill={skill} filter={props.filter} key={skill.codename} />
      </ul>
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const TechAndBusinessSkillFilterItem = (props) => {
  let codename = props.skill.codename;
  let name = props.skill.name;
  let checked = props.filter.techAndBusSkills.includes(codename);
  let onChange = () => {
    props.filter.toggleTechAndBusSkills(codename);
    PortfolioStore.setFilter(props.filter);
  }

  let childSkills = props.skill.terms.reduce((result, childSkill, index) => {
    result.push(
      <TechAndBusinessSkillFilterItem skill={childSkill} filter={props.filter} key={childSkill.codename} />
    );
    return result;
  }, []);

  return (
    <li>
      <span className="checkbox js-postback">
        <input id={codename} type="checkbox" checked={checked} onChange={onChange} />
        <label htmlFor={codename}>{name}</label>
      </span>
      <ul className={childSkills.length < 1 ? 'hide d-none' : ''}>
        {childSkills}
      </ul>
    </li>
  );
}


const TechnologyFilter = (props) => {
  let filterItems = props.techAndBusSkills.map((skill) => {
    return (
      <TechnologyFilterItem skill={skill} filter={props.filter} key={skill.system.codename} />
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const TechnologyFilterItem = (props) => {
  let codename = props.skill.system.codename;
  let name = props.skill.name.value;
  let checked = props.filter.techAndBusSkills.includes(codename);
  let onChange = () => {
    props.filter.toggleTechAndBusSkills(codename);
    PortfolioStore.setFilter(props.filter);
  }

  return (    
    <li>
      <span className="checkbox js-postback">
        <input id={codename} type="checkbox" checked={checked} onChange={onChange} />
        <label htmlFor={codename}>{name}</label>
      </span>
    </li>
  );
}

export default PortfolioFilter;
