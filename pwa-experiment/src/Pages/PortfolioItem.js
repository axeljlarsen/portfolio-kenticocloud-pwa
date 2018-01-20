import React, { Component } from 'react';
import PortfolioItemStore from '../Stores/PortfolioItem';
import LinkButton from '../Components/LinkButton';
import RichTextElement from '../Components/RichTextElement';
import SkylineClientCard from '../Components/SkylineClientCard';
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
        <div className="container-fluid"></div>
      );
    }

    let formatDate = (value) => {
      return dateFormat(value, "dddd, mmmm d, yyyy");
    };

    let e = portfolioItem;
    let title = e.title.value;
    let imageUrl = e.largeImage.value[0].url;
    let imageDesc = e.largeImage.value[0].description;
    let postDate = formatDate(e.launchDate.value);
    let bodyCopyElement = e.description;
    let clientInfo = e.client[0];
    let subtitle = e.subtitle.value;
    let lengthOfEngagement = e.lengthOfEngagement.value;
    let technologies = e.technologies;
    let mainHighlightsHtml = e.mainHighlightsHtml;


    return (
      <portfolioItem className="portfolioItem-detail portfolioItem-detail-related-box">

        <div className="portfolioItem-detail-image">
          <img alt={imageDesc} className="img-responsive" src={imageUrl} title={imageDesc} />
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-8 col-lg-9">
              <h1>{title}</h1>
              <h2>{subtitle}</h2>
              <RichTextElement className="portfolioItem-detail-content" element={bodyCopyElement} />
            </div>
            <div className="col-4 col-sm-4 col-lg-3">
              <ul>
                <li><strong>Launch Date:</strong> {postDate}</li>
                <li><strong>Project Timeline:</strong> {lengthOfEngagement}</li>
                <li><strong>Industry:</strong> industry placeholder</li>
              </ul>
              <h3>Key Features</h3>
              <ul>
                {
                  e.features.map((feature, index) => {
                    let featureImageUrl = feature.icon.value[0].url;
                    let featureImageDesc = feature.icon.value[0].description;
                    return (
                      <li key={index}>
                        <img alt={featureImageDesc} className="img-responsive" src={featureImageUrl} title={featureImageDesc} />
                        {feature.caption.value}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="row bg-darkgray">
            <div className="col-12">
              <h3>Technologies Used</h3>
              <div className="row">
                {
                  e.technologies.map((technology, index) => {
                    let technologyImageUrl = technology.colorIcon.value[0].url;
                    let technologyImageDesc = technology.colorIcon.value[0].description;
                    return (
                      <div className="col-6 col-sm-4" key={index}>
                        <img alt={technologyImageDesc} className="img-responsive" src={technologyImageUrl} title={technologyImageDesc} />
                        {
                          technology.technicalSkill.taxonomyTerms.map((technicalSkill, index) => {
                            return (
                              <span key={technicalSkill.codename}>{technicalSkill.name}</span>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div className="col-12">
              <h3>Designed and Tested For</h3>
              <div className="row">
                {
                  e.testedPlatforms.map((technology, index) => {
                    let technologyImageUrl = technology.colorIcon.value[0].url;
                    let technologyImageDesc = technology.colorIcon.value[0].description;
                    return (
                      <div className="col-6 col-sm-4" key={index}>
                        <img alt={technologyImageDesc} className="img-responsive" src={technologyImageUrl} title={technologyImageDesc} />
                        {
                          technology.technicalSkill.taxonomyTerms.map((technicalSkill, index) => {
                            return (
                              <span key={technicalSkill.codename}>{technicalSkill.name}</span>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className="row">
            <RichTextElement className="col-12" element={mainHighlightsHtml} />
          </div>

          <SkylineClientCard client={clientInfo} id={"SkylineClient-" + clientInfo.codename} key={clientInfo.codename} />

        </div>
      </portfolioItem>
    );
  }
}

export default PortfolioItem;