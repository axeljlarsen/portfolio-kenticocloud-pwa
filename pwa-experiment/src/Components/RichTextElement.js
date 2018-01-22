import React from 'react';
import { withRouter } from 'react-router-dom';
import { resolveContentLink } from '../Utilities/ContentLinks';


function handleClick(element, history, match, e) {
  if (e.target.tagName === "A" && e.target.hasAttribute("data-item-id")) {
    e.preventDefault();

    const id = e.target.getAttribute("data-item-id");
    const link = element.links.find(m => m.itemId === id);

    if (link) {
      const path = resolveContentLink(link);

      if (path) {
        history.push(`/${path}`);
      }
    }
  }
}

const RichTextElement = (props) => {
  return (
    <div className={props.className} dangerouslySetInnerHTML={{ __html: props.element.getHtml() }} onClick={(e) => handleClick(props.element, props.history, props.match, e)} />
  );
};

export default withRouter(RichTextElement);