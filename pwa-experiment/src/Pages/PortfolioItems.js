import React, { Component } from 'react';
import PortfolioItemStore from '../Stores/PortfolioItem';
import { Link } from 'react-router'
import dateFormat from 'dateformat';

let portfolioItemCount = 10;

let getState = () => {
  return {
    portfolioItems: PortfolioItemStore.getPortfolioItems(portfolioItemCount)
  };
};

class PortfolioItems extends Component {

  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PortfolioItemStore.addChangeListener(this.onChange);
    PortfolioItemStore.providePortfolioItems(portfolioItemCount);
  }

  componentWillUnmount() {
    PortfolioItemStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let formatDate = (value) => {
      return dateFormat(value, "mmmm d");
    };

    let counter = 0;

    let portfolioItems = this.state.portfolioItems.reduce((result, portfolioItem, index) => {
      if (index % 4 === 0) {
        result.push(
          <div className="clear" key={counter++}></div>
        );
      }

      let e = portfolioItem.elements;
      let title = e.title.value;
      let imageLink = e.thumbnail_image.value[0].url;
      let postDate = formatDate(e.post_date.value);
      let summary = e.description.value;
      let link = "/portfolioItems/" + portfolioItem.elements.friendly_url.value;

      result.push(
        <div className="col-md-3" key={counter++}>
          <div className="portfolioItem-tile">
            <Link to={link}>
              <img alt={"PortfolioItem " + title} className="portfolioItem-tile-image" src={imageLink} title={"PortfolioItem " + title} />
            </Link>
            <div className="portfolioItem-tile-date">
               {postDate} 
            </div>
            <div className="portfolioItem-tile-content">
              <h2 className="h4">
                <Link to={link}>{title}</Link>
              </h2>
              <p className="portfolioItem-tile-text">
                {summary}
              </p>
            </div>
          </div>
        </div>
      );

      return result;
    }, []);

    return (
      <div className="container">
        {portfolioItems}
      </div>
    );
  }
}

export default PortfolioItems;