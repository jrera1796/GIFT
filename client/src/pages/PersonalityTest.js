import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import { useMutation } from '@apollo/client';
import personalityTypes from '../utils/personalityTypes';
import { UPDATE_RECIPIENT } from '../utils/mutations';

export default function PersonalityTest() {
	const [traits, setTraits] = useState([]);
	const [traitType, setTraitType] = useState();

	const [updateRecipient, { error }] = useMutation(UPDATE_RECIPIENT);

	const queryParams = new URLSearchParams(window.location.search);
	const id = queryParams.get('id');
	const firstname = queryParams.get('first');
	const lastname = queryParams.get('last');

	let formData = '';

	const handleHide = async (iterate, data) => {
		const question = document.getElementById(`questionID${iterate}`);
		question.style = 'display: none';
		if (iterate <= 4) {
			formData += data;
		}
		iterate = iterate + 1;
		if (iterate === 5) {
			const traitData = personalityTypes(formData);
			setTraits(traitData);
			setTraitType(formData);
		}
		if (iterate === 6) {
			window.location.href = `/search?personality=${traitType}&id=${id}`;
			try {
				const { data } = await updateRecipient({
					variables: {
						recipientId: id,
						traits: traitType,
						firstname: firstname,
						lastname: lastname,
					},
				});
				console.log(data);
			} catch (err) {
				console.log(err);
			}
		}
		const question2 = document.getElementById(`questionID${iterate}`);
		question2.style = 'display: block';
	};

	return (
		<div className='dashboard-main-container is-centered columns'>
			
			<div className='column is-8' style={{ paddingTop: '4%' }}>
			{/* Question 1 */}
			<div
				style={{ display: 'block' }}
				id="questionID1"
				className="box Personality-test-box">
			
				<h1 className='has-text-centered'>Is your recipient introverted (I) or extroverted (E)?</h1>
				<div className="columns is-justify-content-space-evenly">
					<button
						onClick={() => handleHide(1, 'I')}
						className="column is-5-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option1" className="Description">
							<h2>Introverted</h2>
							<ul>
								<ol>Private</ol>
								<ol>Reserve</ol>
								<ol>Passive</ol>
							</ul>
						</div>
					</button>

					<button
						onClick={() => handleHide(1, 'E')}
						className="column is-5-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option2" className="Description">
							<h2>Extroverted</h2>
							<ul>
								<ol>Social</ol>
								<ol>Talkative</ol>
								<ol>Assertive</ol>
							</ul>
						</div>
					</button>
				</div>
			</div>
			{/* Question 2 */}
			<div
				style={{ display: 'none' }}
				id="questionID2"
				className="box Personality-test-box"
			>
				<h1 className='has-text-centered'>Is your recipient intutitive (N) or observant (S)?</h1>
				<div className="columns is-justify-content-space-evenly">
					<button
						onClick={() => handleHide(2, 'N')}
						className="column is-5-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option1" className="Description">
							<h2>Intutitive</h2>
							<ul>
								<ol>Imaginative</ol>
								<ol>Inventive</ol>
								<ol>Idealistic</ol>
							</ul>
						</div>
					</button>

					<button
						onClick={() => handleHide(2, 'S')}
						className="column is-5-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option2" className="Description">
							<h2>Observant</h2>
							<ul>
								<ol>Practical</ol>
								<ol>Factual</ol>
								<ol>Realistic</ol>
							</ul>
						</div>
					</button>
				</div>
			</div>
			{/* Question 3 */}
			<div
				style={{ display: 'none' }}
				id="questionID3"
				className="box Personality-test-box"
			>
				<h1 className='has-text-centered'>Is your recipient feeling (F) or thinking (T)?</h1>
				<div className="columns is-justify-content-space-evenly">
					<button
						onClick={() => handleHide(3, 'F')}
						className="column is-5-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option1" className="Description">
							<h2>Feeling</h2>
							<ul>
								<ol>Empathetic</ol>
								<ol>Passionate</ol>
								<ol>Caring</ol>
							</ul>
						</div>
					</button>

					<button
						onClick={() => handleHide(3, 'T')}
						className="column is-5-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option2" className="Description">
							<h2>Thinking</h2>
							<ul>
								<ol>Logical</ol>
								<ol>Objective</ol>
								<ol>Rational</ol>
							</ul>
						</div>
					</button>
				</div>
			</div>
			{/* Question 4 */}
			<div
				style={{ display: 'none' }}
				id="questionID4"
				className="box Personality-test-box"
			>
				<h1 className='has-text-centered'>Is your recipient judging (J) or prospecting (P)?</h1>
				<div className="columns is-justify-content-space-evenly">
					<button
						onClick={() => handleHide(4, 'J')}
						className="column is-5-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option1" className="Description">
							<h2>Judging</h2>
							<ul>
								<ol>Decisive</ol>
								<ol>Structured</ol>
								<ol>Organized</ol>
							</ul>
						</div>
					</button>

					<button
						onClick={() => handleHide(4, 'P')}
						className="column is-5-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option2" className="Description">
							<h2>Prospecting</h2>
							<ul>
								<ol>Relaxed</ol>
								<ol>Spontaneous</ol>
								<ol>Flexible</ol>
							</ul>
						</div>
					</button>
				</div>
			</div>
			{/* Display Personality */}
			<div
				style={{ display: 'none' }}
				id="questionID5"
				className="box Personality-test-box"
			>
				<h1 className='has-text-centered'>Your Results!</h1>
				<div className="columns is-justify-content-space-evenly">
					<button
						onClick={() => handleHide(5)}
						className="column is-full-desktop is-full-mobile mt-5 pt-3 pb-3 has-background-light"
					>
						<div id="Option1" className="Description">
							<h2>Your Trait is {traits[0]}</h2>
							<br></br>
							<h4>{traits[1]}</h4>
							<div>Click on me to see your recommended ideas!</div>
						</div>
					</button>
				</div>
			</div>
			</div>
		</div>
	);
}
