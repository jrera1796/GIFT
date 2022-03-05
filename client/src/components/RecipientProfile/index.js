import { React } from 'react';
import { GET_RECIPIENT } from '../../utils/queries';
import { REMOVE_GIFT } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { removeGiftId } from '../../utils/localStorage';

const RecipientProfile = recId => {
	let recipientID = recId.parentToChild; // No luck with conditional render
	const { loading, data } = useQuery(GET_RECIPIENT, {
		variables: {
			_id: recipientID,
		},
	});

	const recipient = data?.recipient || {};

	const [removeGift] = useMutation(REMOVE_GIFT);

	const handleDeleteGift = async giftId => {
		try {
			const { data } = await removeGift({
				variables: {
					recipientId: recipientID,
					giftId: giftId,
				},
			});
			console.log(data);
			removeGiftId(giftId);
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <div>Loading</div>;
	}

	if (!recipient.savedGifts) {
		return (
			<p className="bg-dark text-light p-3">
				{recipient.firstname}, Doesn't have any gifts yet.
				<a href={`/search&personality=${recipient.traits}&id=${recipient._id}`}>
					<button className="button is-medium is-warning">Find Gifts!</button>
				</a>
			</p>
		);
	}

	return (
		<>
			<div>{recipient.firstname}</div>
			<div className="container card-grid results">
				{recipient.savedGifts.map(giftList => (
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
								<p className="card-footer-item" style={{ padding: '10px' }}>
									<button
										className="button is-link is-medium"
										onClick={() => window.open(giftList.link, '_blank')}
									>
										Buy Now
									</button>
								</p>
								<p className="card-footer-item">
									<button
										className="button is-danger is-medium"
										onClick={() => handleDeleteGift(giftList.giftId)}
									>
										Delete Gift
									</button>
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default RecipientProfile;
