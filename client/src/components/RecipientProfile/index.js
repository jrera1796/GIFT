import React from 'react'
import { GET_RECIPIENT } from '../../utils/queries'
import { useQuery } from '@apollo/client';


const RecipientProfile = () => {
  let params = (new URL(document.location)).searchParams
  let recipientID = params.get('id'); // No luck with conditional render
  const { loading, data } = useQuery(GET_RECIPIENT, {
    variables: {
      _id: recipientID
    }
  });
  const recipient = data?.recipient || {};

  console.log(loading, '\n Line Break', '\n Line Break', recipient)
  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  if (!recipient.savedGifts) {
    return (
      <p className="bg-dark text-light p-3">
        {recipient.firstname}, Doesn't have any gifts yet.
        <a href={`/search&personality=${recipient.traits}&id=${recipient._id}`}>
          <button className='button is-medium is-warning'>
            Find Gifts!
          </button>
        </a>
      </p>
    )
  }

  return (
    <>
      <div>{recipient.firstname}</div>
      <div className='container card-grid results'>
        {recipient.savedGifts.map((giftList) => (
          <div key={giftList.giftId} className="card card-max-height">
            <div className="card-image">
              <figure className="image is-half">
                <img src={giftList.image} alt={giftList.giftId} />
              </figure>
            </div>
            <div className="card-content p-0">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4 pl-6"></p>
                </div>
              </div>
              <div className="card-footer">
                <p className="card-footer-item" style={{ padding: "10px" }}>
                  <a href={giftList.link} target="_blank" rel="noreferrer" noopener="true">
                    <button className='button is-link is-medium'>
                      Buy Now
                    </button>
                  </a>
                </p>
                <p className="card-footer-item">
                  <button
                    className='button is-danger is-medium'
                    onClick={() => console.log("deleted")}>
                    Delete Gift
                  </button>
                </p>

              </div>
            </div>
          </div>
        )
        )
        }
      </div>
    </>


  )
}

export default RecipientProfile;