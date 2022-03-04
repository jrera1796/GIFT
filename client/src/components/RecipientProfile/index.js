import React from 'react'
import { GET_RECIPIENTS } from '../../utils/queries'
import { useQuery } from '@apollo/client';

const recipientID = "622087685230516c500caba8"

const RecipientProfile = () => {
const {loading, data} = useQuery(GET_RECIPIENTS, {
  variable: {_id: recipientID}
});

const recData = data?.recipients || {};


console.log(loading, '\n Line Break',data,'\n Line Break', recData)
return (<div>

  <h1>{recData._id}</h1>

</div>
)
}

export default RecipientProfile;