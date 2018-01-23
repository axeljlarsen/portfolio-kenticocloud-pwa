import React, { Component } from 'react';
import PortfolioItemStore from '../Stores/PortfolioItem';
import LinkButton from '../Components/LinkButton';
import Link from '../Components/LowerCaseUrlLink';
import RichTextElement from '../Components/RichTextElement';
import SkylineClientCard from '../Components/SkylineClientCard';
import dateFormat from 'dateformat';
let getState = (props) => {
  return {
    portfolioItem: PortfolioItemStore.getItem(props.match.params.urlSlug)
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
    PortfolioItemStore.provideItem(this.props.match.params.urlSlug);
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
    let imageUrl = (portfolioItem.largeImage.value.length) ? portfolioItem.largeImage.value[0].url : '';
    let imageDesc = (portfolioItem.largeImage.value.length) ? portfolioItem.largeImage.value[0].description : '';
    let postDate = formatDate(portfolioItem.actualLaunchDate.value.length);
    let bodyCopyElement = portfolioItem.description;
    let clientInfo = (portfolioItem.client.length) ? portfolioItem.client[0] : null;
    let clientIndustry = (clientInfo && clientInfo.industries.taxonomyTerms.length) ? clientInfo.industries.taxonomyTerms[0].name : '';
    let subtitle = portfolioItem.subtitle.value;
    let lengthOfEngagement = portfolioItem.lengthOfEngagement.value;
    let technologies = portfolioItem.technologies;
    let deviceSectionCount = portfolioItem.deviceSections.length;

    // Move the main call to action into view when the user scrolls.
    window.addEventListener('scroll', function () {
      var cta = document.querySelector('.cta');
      if (cta) {
        if (window.scrollY > 100) {
          cta.classList.add('cta-in-view');
        }
        else {
          cta.classList.remove('cta-in-view');
        }
      }
    });

    // Create a subtle floating effect based on mouse position.
    // var lFollowX = 0,
    //   lFollowY = 0,
    //   x = 0,
    //   y = 25,
    //   friction = 1 / 30;
    // function parallaxFloat() {
    //   x += (lFollowX - x) * friction;
    //   y += (lFollowY - y) * friction;
    //   y = (y < 15) ? 15 : (y > 50) ? 50 : y;
    //   var translate = 'translate(' + x + '%, ' + y + '%)';
    //   var pFloat = document.querySelector('.parallax-floating');
    //   if (pFloat) {
    //     pFloat.style.transform = translate;
    //   }
    //   requestAnimationFrame(parallaxFloat);
    // }
    // window.addEventListener('mousemove', function (e) {
    //   var lMouseX = Math.max(-100, Math.min(100, window.outerWidth / 2 - e.clientX));
    //   var lMouseY = Math.max(-100, Math.min(100, window.outerHeight / 2 - e.clientY));
    //   lFollowX = lMouseX / 5; // 100 : 12 = lMouxeX : lFollow
    //   lFollowY = lMouseY / 5;
    //   parallaxFloat();
    // });

    return (
      <portfolioItem className="portfolioItem-detail portfolioItem-detail-related-box">

        <div className="cta text">
          <Link to={`/webportfolio/`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.4 22.3"><title>icon-left-arrow</title><path d="M18.87,28.68a.74.74,0,0,1-.45.15.59.59,0,0,1-.4-.15L7.47,18.08a.51.51,0,0,1-.1-.7.47.47,0,0,1,.1-.1L18,6.68a.5.5,0,0,1,.4-.15.74.74,0,0,1,.45.15l.35.4a.53.53,0,0,1,.15.4.74.74,0,0,1-.15.45l-8.95,8.9h18.8a.6.6,0,0,1,.6.6h0v.5a.6.6,0,0,1-.6.6H10.27l9,8.9a.72.72,0,0,1,.15.45.54.54,0,0,1-.15.4Z" transform="translate(-7.27 -6.53)" /></svg>
          </Link>
        </div >

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
                <li><strong>Industry:</strong> {clientIndustry}</li>
              </ul>
              <h3 className="text-quaternary"><strong>Key Features</strong></h3>
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
          <div className="row bg-darkgray portfolioItem-detail-tech">
            <div className="col-120 offset-sm-10 col-sm-100 mt-5">
              <h3 className="text-tertiary">Technologies Used</h3>
              <div className="row">
                {
                  portfolioItem.technologies.map((technology, index) => {
                    if (technology) {
                      let technologyImageUrl = (technology.colorWithDropShadowIcon.value.length) ? technology.colorWithDropShadowIcon.value[0].url : '';
                      let technologyImageDesc = (technology.colorWithDropShadowIcon.value.length) ? technology.colorWithDropShadowIcon.value[0].description : '';
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
                    }
                  })
                }
              </div>
            </div>

            <div className="col-120 offset-sm-10 col-sm-100 mt-3 mb-5">
              <h3 className="text-primary"><small>Designed and Tested For</small></h3>
              <div className="row text-gray">
                {
                  portfolioItem.testedPlatforms.map((technology, index) => {
                    if (technology) {
                      let technologyImageUrl = (technology.colorWithDropShadowIcon.value.length) ? technology.colorWithDropShadowIcon.value[0].url : '';
                      let technologyImageDesc = (technology.colorWithDropShadowIcon.value.length) ? technology.colorWithDropShadowIcon.value[0].description : '';
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
                    }
                  })
                }
              </div>
            </div>
          </div>

          <div className="row bg-alt-diagonal-white-primary portfolioItem-device-sections">
            {
              portfolioItem.deviceSections.map((section, index) => {
                if (section) {
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
                }
              })
            }
          </div>
        </div>
      </portfolioItem >
    );
  }
}

export default PortfolioItem;