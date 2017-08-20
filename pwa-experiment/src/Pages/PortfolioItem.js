import React, { Component } from 'react';
import PortfolioItemStore from '../Stores/PortfolioItem';
import RichTextElement from '../Components/RichTextElement';
import dateFormat from 'dateformat';

let getState = (props) => {
  return {
    portfolioItem: PortfolioItemStore.getPortfolioItem(props.params.portfolioItemSlug)
  };
};

class PortfolioItem extends Component {

  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PortfolioItemStore.addChangeListener(this.onChange);
    PortfolioItemStore.providePortfolioItem(this.props.params.portfolioItemSlug);
  }

  componentWillUnmount() {
    PortfolioItemStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let portfolioItem = this.state.portfolioItem;

    if (!portfolioItem) {
      return (
        <div className="container"></div>
      );
    }

    let formatDate = (value) => {
      return dateFormat(value, "dddd, mmmm d, yyyy");
    };

    let e = portfolioItem.elements;
    let title = e.title.value;
    let imageLink = e.thumbnail_image.value[0].url;
    let postDate = formatDate(e.post_date.value);
    let bodyCopyElement = e.description;

    return (
      <div className="container">
        <portfolioItem className="portfolioItem-detail col-lg-9 col-md-12 portfolioItem-detail-related-box">
          <h2>{title}</h2>
          <div className="portfolioItem-detail-datetime">
             {postDate}
          </div>
          <div className="row">
            <div className="portfolioItem-detail-image col-md-push-2 col-md-8">
              <img alt={title} className="img-responsive" src={imageLink} title={title} />
            </div>
          </div>
          <div className="row">
            <RichTextElement className="portfolioItem-detail-content" element={bodyCopyElement} />
          </div>
        </portfolioItem>
      </div>
    );
  }
}

export default PortfolioItem;