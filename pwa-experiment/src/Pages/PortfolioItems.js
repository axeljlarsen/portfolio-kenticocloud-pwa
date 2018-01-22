import React, { Component } from 'react';
import PortfolioItemStore from '../Stores/PortfolioItem';
import Link from '../Components/LowerCaseUrlLink';
import dateFormat from 'dateformat';
import RichTextElement from '../Components/RichTextElement';

let portfolioItemCount = 10;

let getState = () => {
  return {
    portfolioItems: PortfolioItemStore.getItems(portfolioItemCount)
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
    PortfolioItemStore.provideItems(portfolioItemCount);
  }

  componentWillUnmount() {
    PortfolioItemStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let formatDate = (value) => {
      return dateFormat(value, 'mmmm d');
    };

    let counter = 0;

    let portfolioItems = this.state.portfolioItems.reduce((result, portfolioItem, index) => {
      if (index % 3 === 0) {
        result.push(
          <div className="clear" key={counter++}></div>
        );
      }

      let title = portfolioItem.title.value;
      let imageUrl = portfolioItem.thumbnailImage.value[0].url || '';
      let imageDesc = portfolioItem.thumbnailImage.value[0].description || '';
      let postDate = formatDate(portfolioItem.launchDate.value);
      let summary = portfolioItem.description;
      let link = '/portfolioItems/' + portfolioItem.friendlyURL.value;

      let features = portfolioItem.features;

      result.push(
        <div className="col-120 col-sm-60 col-md-40 col-lg-30" key={counter++}>
          <div className="portfolioItem-tile">
            <Link to={link}>
              <img alt={'PortfolioItem ' + title} className="portfolioItem-tile-image" src={imageUrl} title={'PortfolioItem ' + title} />
            </Link>
            <div className="portfolioItem-tile-date">
              {postDate}
            </div>
            <div className="portfolioItem-tile-content">
              <h2 className="h4">
                <Link to={link}>{title}</Link>
              </h2>
              <RichTextElement className="portfolioItem-tile-text" element={summary} />
            </div>
          </div>
        </div>
      );

      return result;
    }, []);

    return (
      <div className="container">
        <div className="row bg-cube pt-5 pb-5">
          {portfolioItems}
        </div>
      </div>
    );
  }
}

export default PortfolioItems;