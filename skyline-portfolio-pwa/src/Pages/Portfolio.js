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

let shorten = (str, maxLen, separator = ' ') => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
};

class Portfolio extends Component {

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
      // if (index % 3 === 0) {
      //   result.push(
      //     <div className="clear" key={counter++}></div>
      //   );
      // }

      // let title = portfolioItem.title.value;
      // let imageUrl = portfolioItem.thumbnailImage.value[0].url || '';
      // let imageDesc = portfolioItem.thumbnailImage.value[0].description || '';
      // let postDate = formatDate(portfolioItem.actualLaunchDate.value);
      // let description = portfolioItem.description;
      // let features = portfolioItem.features;
      let link = '/webportfolio/' + portfolioItem.friendlyUrl.value;

      let title = portfolioItem.title.value;
      let imageUrl = (portfolioItem.thumbnailImage.value.length) ? portfolioItem.thumbnailImage.value[0].url : '';
      let imageDesc = (portfolioItem.thumbnailImage.value.length) ? portfolioItem.thumbnailImage.value[0].description : '';
      let postDate = formatDate(portfolioItem.actualLaunchDate.value.length);
      let description = {
        value: shorten(portfolioItem.description.value.replace(/(<([^>]+)>)/ig,''),97).concat('...')
      };
      let clientInfo = (portfolioItem.client.length) ? portfolioItem.client[0] : null;
      let clientIndustry = (clientInfo && clientInfo.industries.taxonomyTerms.length) ? clientInfo.industries.taxonomyTerms[0].name : '';
      let subtitle = portfolioItem.subtitle.value;
      let lengthOfEngagement = portfolioItem.lengthOfEngagement.value;
      let technologies = portfolioItem.technologies;

      result.push(
        <div className="col-120 col-sm-60 col-md-40 col-lg-30" key={counter++}>
          <div className="portfolioItem-tile">
            <Link to={link}>
              <img alt={'PortfolioItem ' + title} className="portfolioItem-tile-image" src={imageUrl} title={'PortfolioItem ' + title} />
            </Link>
            <div className="portfolioItem-tile-date d-none">
              {postDate}
            </div>
            <div className="portfolioItem-tile-content">
              <h2 className="h4">
                <Link to={link}>{title}</Link>
              </h2>            
              <RichTextElement className={'portfolioItem-detail-content ' + ((description.value.length <= 3) ? 'd-none' : '') } element={description} />
              <table>
                <tbody>
                  {
                    portfolioItem.features.map((feature, index) => {
                      if (feature) {
                        let featureImageUrl = (feature.icon.value.length) ? feature.icon.value[0].url : '';
                        let featureImageDesc = (feature.icon.value.length) ? feature.icon.value[0].description : '';
                        return (
                          <tr key={index}>
                            <td className="align-middle text-center">
                              <img alt={featureImageDesc} className="img-responsive icon" src={featureImageUrl} title={featureImageDesc} />
                            </td>
                            <td>
                              <span>{feature.caption.value}</span>
                            </td>
                          </tr>
                        )
                      }
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

      return result;
    }, []);

    return (
      <div className="container-fluid">
        <div className="row masonry bg-cube pt-5 pb-5">
          {portfolioItems}
        </div>
      </div>
    );
  }
}

export default Portfolio;