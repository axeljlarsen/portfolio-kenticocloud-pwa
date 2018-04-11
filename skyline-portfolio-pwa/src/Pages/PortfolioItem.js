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
    window.scrollTo(0, 0);
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

    let formatDate = (value, format) => {
      if (!format) format = 'mmmm yyyy';
      return dateFormat(value, 'mmmm yyyy');
    };

    let title = portfolioItem.title.value;
    let imageUrl = (portfolioItem.largeImage.value.length) ? portfolioItem.largeImage.value[0].url : '';
    let imageDesc = (portfolioItem.largeImage.value.length) ? portfolioItem.largeImage.value[0].description : '';
    let launchDate = formatDate(portfolioItem.actualLaunchDate.value, 'mmmm yyyy');
    let description = portfolioItem.description;
    let caseStudy = portfolioItem.skylineCaseStudyUrl;
    let clientInfo = (portfolioItem.client.length) ? portfolioItem.client[0] : null;
    let clientIndustry = (clientInfo && clientInfo.industries.taxonomyTerms.length) ? clientInfo.industries.taxonomyTerms[0].name : '';
    let subtitle = portfolioItem.subtitle.value;
    let lengthOfEngagement = portfolioItem.lengthOfEngagement.value;
    let technologies = portfolioItem.technologies;
    let deviceSectionCount = portfolioItem.deviceSections.length;

    let bootstrapVersion = 3;

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

    //Create a subtle floating effect based on mouse position.
    var lFollowX = 0,
      lFollowY = 0,
      x = 0,
      y = 0,
      friction = 1 / 30,
      midX = window.outerWidth / 2,
      midY = window.outerHeight / 2;
    function parallaxFloat() {
      x += (lFollowX - x) * friction;
      y += (lFollowY - y) * friction;
      var translate = 'translate(' + x + '%, ' + y + '%)';
      var pFloat = document.querySelector('.parallax-floating');
      if (pFloat) {
        pFloat.style.transform = translate;
      }
      requestAnimationFrame(parallaxFloat);
    }
    // window.addEventListener('mousemove', function (e) {
    //   var xDir = e.clientX > midX ? -1 : 1;
    //   var yDir = e.clientY > midY ? -1 : 1;
    //    lFollowX = xDir * 50 * (e.clientX / window.outerWidth);
    //    lFollowY = yDir * 50 * (e.clientY / window.outerHeight);
    //   parallaxFloat();
    // });

    return (
      <portfolioItem className="portfolioItem-detail portfolioItem-detail-related-box">

        <div className="cta text">
          <Link to={`/portfolio/`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.4 22.3"><title>icon-left-arrow</title><path d="M18.87,28.68a.74.74,0,0,1-.45.15.59.59,0,0,1-.4-.15L7.47,18.08a.51.51,0,0,1-.1-.7.47.47,0,0,1,.1-.1L18,6.68a.5.5,0,0,1,.4-.15.74.74,0,0,1,.45.15l.35.4a.53.53,0,0,1,.15.4.74.74,0,0,1-.15.45l-8.95,8.9h18.8a.6.6,0,0,1,.6.6h0v.5a.6.6,0,0,1-.6.6H10.27l9,8.9a.72.72,0,0,1,.15.45.54.54,0,0,1-.15.4Z" transform="translate(-7.27 -6.53)" /></svg>
          </Link>
        </div >

        <div className="portfolioItem-detail-image">
          <img alt={imageDesc} className="img-responsive" src={imageUrl} title={imageDesc} />
        </div>

        <div className="container-fluid">
          <div className={((bootstrapVersion == 4) ? '' : 'bg-cube shadow-light-inset') + ' row'}>
            <div className={((bootstrapVersion == 4) ? 'col-12 col-sm-7 offset-sm-1' : 'bg-white col-xs-12 col-sm-8') + ' portfolioItem-detail-summary'}>
              <div className="portfolioItem-detail-overview">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <RichTextElement className="portfolioItem-detail-content" element={description} />
              </div>
            </div>
            <div className={((bootstrapVersion == 4) ? 'col-12 bg-cube' : 'col-xs-12') + ' col-sm-4 portfolioItem-detail-features'}>
              <ul className="list-unstyled">
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
              <a href={caseStudy.value} className={(caseStudy.value.length == 0) ? 'hide' : 'btn btn-primary btn-lg case-study-link'}>View Case Study</a>
            </div>
          </div>
          <div className="row">
            <div className={((bootstrapVersion == 4) ? 'col col-sm-10 offset-sm-1 py-0' : 'col-xs-12 col-sm-10 col-sm-offset-1 py-0')}>
              <div className="row portfolioItem-detail-tech">
                <div className={((bootstrapVersion == 4) ? 'col-12' : 'col-xs-12') + ' neg-space-col'}><div className="neg-space-shape"></div><div className="neg-space-shape"></div></div>
                <div className={((bootstrapVersion == 4) ? 'col-12' : 'col-xs-12')}>
                  <h3 className="heading heading-tech">Technologies Used</h3>
                  <div className="row">
                    {
                      portfolioItem.technologies.map((technology, index) => {
                        if (technology) {
                          let technologyImageUrl = (technology.colorWithDropShadowIcon.value.length) ? technology.colorWithDropShadowIcon.value[0].url : '';
                          let technologyImageDesc = (technology.colorWithDropShadowIcon.value.length) ? technology.colorWithDropShadowIcon.value[0].description : '';
                          return (
                            <div className={((bootstrapVersion == 4) ? 'col-6' : 'col-xs-6') + ' col-sm-4 col-lg-3 mb-2'} key={index}>
                              <img alt={technologyImageDesc} className="img-responsive icon" src={technologyImageUrl} title={technologyImageDesc} />
                              <span>{technology.name.value}</span>
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>

                <div className={((bootstrapVersion == 4) ? 'col-12' : 'col-xs-12') + ' mt-3 mb-5'}>
                  <h3 className="heading heading-tested text-small">Designed and Tested For</h3>
                  <div className="row">
                    {
                      portfolioItem.testedPlatforms.map((technology, index) => {
                        if (technology) {
                          let technologyImageUrl = (technology.whiteWithDropShadowIcon.value.length) ? technology.whiteWithDropShadowIcon.value[0].url : '';
                          let technologyImageDesc = (technology.whiteWithDropShadowIcon.value.length) ? technology.whiteWithDropShadowIcon.value[0].description : '';
                          return (
                            <div className={((bootstrapVersion == 4) ? 'col-6' : 'col-xs-6') + ' col-sm-4 col-lg-3 mb-2'} key={index}>
                              <img alt={technologyImageDesc} className="img-responsive icon" src={technologyImageUrl} title={technologyImageDesc} />
                              <span className="">{technology.name.value}</span>
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>
                <div className={((bootstrapVersion == 4) ? 'col-12' : 'col-xs-12') + ' neg-space-col'}><div className="neg-space-shape"></div><div className="neg-space-shape"></div></div>
              </div>
            </div>
          </div>

          <div className="row bg-alt-diagonal-white-primary portfolioItem-device-sections">
            {
              portfolioItem.deviceSections.map((section, index) => {
                if (section) {
                  return (
                    <div className={(bootstrapVersion == 4) ? 'col-12' : 'col-xs-12'} key={index}>
                      <div className="row align-items-center align-self-center">
                        {
                          section.columns.map((column, index) => {
                            let dt = column.deviceType.value[0].codename;
                            let cd = column.contentDetails.value[0].codename;
                            let dsc_class = 'col';
                            if (bootstrapVersion == 4) {
                              switch (dt + ' ' + cd) {
                                case 'monitor image_only':
                                  dsc_class = 'col-12 col-sm-5 offset-sm-1 col-lg-4 offset-lg-2';
                                  break;
                                case 'monitor text_only':
                                  dsc_class = 'col-12 col-sm-5 col-lg-4';
                                  break;
                                case 'phone image_only':
                                  dsc_class = 'order-sm-2 col-12 col-sm-3 col-md-2';
                                  break;
                                case 'phone text_only':
                                  dsc_class = ((index == 2) ? 'order-sm-3' : 'order-sm-1') + ' col-12 col-sm';
                                  break;
                                case 'tablet image_only':
                                  dsc_class = 'col-12 col-sm-5 col-lg-4 order-sm-2';
                                  break;
                                case 'tablet text_only':
                                  dsc_class = 'col-12 col-sm-5 offset-sm-1 col-lg-4 offset-lg-2 order-sm-1';
                                  break;
                              }
                            }
                            else {
                              switch (dt + ' ' + cd) {
                                case 'monitor image_only':
                                  dsc_class = 'col-xs-12 col-sm-5 col-sm-offset-1 col-lg-4 col-lg-offset-2';
                                  break;
                                case 'monitor text_only':
                                  dsc_class = 'col-xs-12 col-sm-5 col-lg-4';
                                  break;
                                case 'phone image_only':
                                  dsc_class = 'col-xs-12 col-sm-4 col-sm-push-4 col-md-2 col-md-offset-1 col-md-push-4 ';
                                  break;
                                case 'phone text_only':
                                  dsc_class = 'col-xs-12 col-sm-4 ' + ((index == 2) ? '' : 'col-sm-pull-4 col-md-pull-2');
                                  break;
                                case 'tablet image_only':
                                  dsc_class = 'col-xs-12 col-sm-5 col-lg-4 col-sm-push-6';
                                  break;
                                case 'tablet text_only':
                                  dsc_class = 'col-xs-12 col-sm-5 col-lg-4 col-sm-offset-1 col-sm-pull-5 col-lg-offset-3';
                                  break;
                              }
                            }
                            dsc_class += ' ' + dt + '-' + cd;
                            return (
                              <RichTextElement className={dsc_class} element={column.content} key={column.system.codename} />
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