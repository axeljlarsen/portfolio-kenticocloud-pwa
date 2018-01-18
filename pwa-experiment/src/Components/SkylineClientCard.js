import React from 'react';
import SkylineClient from '../Models/SkylineClient';


const SkylineClientCard = (props) => {
  return (
    <div className="client">    
        <p>{props.client.name.value}</p>
        <p>{props.client.nickname.value}</p>
        <p>{props.client.partnership_start_date.value}</p>
    </div>
  );
}

export default SkylineClientCard;


