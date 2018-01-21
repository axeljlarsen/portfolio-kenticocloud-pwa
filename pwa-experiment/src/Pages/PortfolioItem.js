import React, { Component } from 'react';
import PortfolioItemStore from '../Stores/PortfolioItem';
import LinkButton from '../Components/LinkButton';
import RichTextElement from '../Components/RichTextElement';
import SkylineClientCard from '../Components/SkylineClientCard';
import dateFormat from 'dateformat';
import sampleMonitorImage from '../Images/wmmb-eatwisconsincheese-imac.png';
import samplePhoneImage from '../Images/wmmb-eatwisconsincheese-galaxys8.png';
import sampleTabletImage from '../Images/wmmb-eatwisconsincheese-ipad.png';

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
      return dateFormat(value, "mmmm yyyy");
    };

    let title = portfolioItem.title.value;
    let imageUrl = portfolioItem.largeImage.value[0].url;
    let imageDesc = portfolioItem.largeImage.value[0].description;
    let postDate = formatDate(portfolioItem.launchDate.value);
    let bodyCopyElement = portfolioItem.description;
    let clientInfo = portfolioItem.client[0];
    let subtitle = portfolioItem.subtitle.value;
    let lengthOfEngagement = portfolioItem.lengthOfEngagement.value;
    let technologies = portfolioItem.technologies;
    let deviceSectionCount = portfolioItem.deviceSections.length;

    return (
      <portfolioItem className="portfolioItem-detail portfolioItem-detail-related-box">

        <div className="portfolioItem-detail-image">
          <img alt={imageDesc} className="img-responsive" src={imageUrl} title={imageDesc} />
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-120 offset-sm-10 col-sm-70 pt-5 pb-5">
              <h1>{title}</h1>
              <h2>{subtitle}</h2>
              <RichTextElement className="portfolioItem-detail-content" element={bodyCopyElement} />
            </div>
            <div className="col-120 col-sm-40 pt-5 pb-5 bg-cube portfolioItem-detail-features">
              <ul className="list-unstyled">
                <li><strong>Launch Date:</strong> {postDate}</li>
                <li><strong>Project Timeline:</strong> {lengthOfEngagement}</li>
                <li><strong>Industry:</strong> industry placeholder</li>
              </ul>
              <h3 className="text-quaternary"><strong>Key Features</strong></h3>
              <table>
                <tbody>
                  {
                    portfolioItem.features.map((feature, index) => {
                      let featureImageUrl = feature.icon.value[0].url;
                      let featureImageDesc = feature.icon.value[0].description;
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
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="row bg-darkgray portfolioItem-detail-tech">
            <div className="col-120 offset-sm-10 col-sm-100 mt-5">
              <h3 className="text-tertiary">Technologies Used</h3>
              <div className="row">
                {
                  portfolioItem.technologies.map((technology, index) => {
                    let technologyImageUrl = technology.colorIcon.value[0].url;
                    let technologyImageDesc = technology.colorIcon.value[0].description;
                    return (
                      <div className="col-60 col-sm-40 col-lg-30 mb-2" key={index}>
                        <img alt={technologyImageDesc} className="img-responsive icon" src={technologyImageUrl} title={technologyImageDesc} />
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

            <div className="col-120 offset-sm-10 col-sm-100 mt-3 mb-5">
              <h3 className="text-primary"><small>Designed and Tested For</small></h3>
              <div className="row text-gray">
                {
                  portfolioItem.testedPlatforms.map((technology, index) => {
                    let technologyImageUrl = technology.colorIcon.value[0].url;
                    let technologyImageDesc = technology.colorIcon.value[0].description;
                    return (
                      <div className="col-60 col-sm-40 col-lg-30 mb-2" key={index}>
                        <img alt={technologyImageDesc} className="img-responsive icon" src={technologyImageUrl} title={technologyImageDesc} />
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

          <div className="row bg-alt-diagonal-white-primary portfolioItem-device-sections">
            {
              portfolioItem.deviceSections.map((section, index) => {
                return (
                  <div className="col-120" key={index}>
                    <div className="row align-items-center align-self-center">
                      {
                        section.columns.map((column, index) => {
                          return (
                            <RichTextElement className={column.classList.value} element={column.content} key={column.system.codename} />
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </portfolioItem>
    );
  }
}

export default PortfolioItem;