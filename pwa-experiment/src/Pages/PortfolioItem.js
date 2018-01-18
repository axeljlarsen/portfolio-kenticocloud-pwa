import React, { Component } from 'react';
import PortfolioItemStore from '../Stores/PortfolioItem';
import LinkButton from '../Components/LinkButton';
import RichTextElement from '../Components/RichTextElement';
import SkylineClientCard   from '../Components/SkylineClientCard';
import dateFormat from 'dateformat';

let getState = (props) => {
  return {
    portfolioItem: PortfolioItemStore.getItem(props.params.urlSlug)
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
    PortfolioItemStore.provideItem(this.props.params.urlSlug);
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

    let e = portfolioItem;
    let title = e.title.value;
    let imageUrl = e.thumbnailImage.value[0].url;
    let postDate = formatDate(e.launchDate.value);
    let bodyCopyElement = e.description.value;
    let clientInfo = e.client[0];
    //let client = e.client.value;

    return (
      <div className="container">
        <portfolioItem className="portfolioItem-detail col-xs-12 col-md-12 col-lg-9 portfolioItem-detail-related-box">
          <h2>{title}</h2>
          <div className="portfolioItem-detail-datetime">
             {postDate}
          </div>
          <div className="row">
            <div className="portfolioItem-detail-image col-xs-12 col-md-push-2 col-md-8">
              <img alt={title} className="img-responsive" src={imageUrl} title={title} />
            </div>
          </div>
          <div className="row">
            <RichTextElement className="portfolioItem-detail-content" element={bodyCopyElement} />
          </div>
          <div className="row">
          <div className="col-xs-12">
          <SkylineClientCard client={clientInfo} />
          </div>
          </div>
        </portfolioItem>
        <LinkButton link="/" text="Link Button"/>
      </div>
    );
  }
}

export default PortfolioItem;