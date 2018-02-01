import React from 'react';
import SkylineClient from '../Models/SkylineClient';
import RichTextElement from './RichTextElement';


const SkylineClientCard = (props) => {

  let industries = props.client.industries.value.map((industry, index) => {
    return (
      <li key={index}> 
        {industry.name}
      </li>
    );
  });

  return (
    <div className="client">
      <p>{props.client.name.value}</p>
      <p>{props.client.nickname.value}</p>
      <p>{props.client.partnershipStartDate.value}</p>
      <RichTextElement element={props.client.description} />
      <ul>
        {industries}
      </ul>
    </div>
  );
}

export default SkylineClientCard;


