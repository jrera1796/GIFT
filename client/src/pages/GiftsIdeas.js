import React, { useState, useEffect } from 'react';

import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { SAVE_GIFT, REMOVE_GIFT } from '../utils/mutations';
import Auth from '../utils/auth';

export default function GiftIdeas() {
	const [searchGift, setSearchGift] = useState('');
	const [saveGift] = useMutation(SAVE_GIFT);

	const handleFormSubmit = async (event) => { //search for book
		event.preventDefault();
		if (!searchGift) { return false; }
		try {
			const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchGift}`); //calling the fetch function

			const { items } = await response.json();
			const giftData = items.map((gift) => ({
				giftId: gift.id,
				// giftname: gift.volumeInfo.authors || ['No author to display'],
				// image: gift.volumeInfo.imageLinks?.thumbnail || '',
				// description: gift.volumeInfo.description,
				// title: gift.volumeInfo.title,
				// link: gift.volumeInfo.link,
			}));

			setSearchGift(giftData);
			setSearchGift('');
		} catch (e) { console.error(e); }
	};

	return (
		<>
	
    <div>working Progress in GiftIdeas</div>
  )
			{/* <Jumbotron fluid className='text-light bg-dark'>
				<Container>
					<h1>Search for Books!</h1>
					<Form onSubmit={handleFormSubmit}>
						<Form.Row>
							<Col xs={12} md={8}>
								<Form.Control
									name='searchGift'
									value={searchGift}
									onChange={(e) => setSearchGift(e.target.value)}
									type='text'
									size='lg'
									placeholder='Search for a book'
								/>
							</Col>
							<Col xs={12} md={4}>
								<Button type='submit' variant='success' size='lg'>
									Submit Search
								</Button>
							</Col>
						</Form.Row>
					</Form>
				</Container>
			</Jumbotron>

			<Container>
				<h2>
					{searchedBooks.length
						? `Viewing ${searchedBooks.length} results:`
						: 'Search for a book to begin'}
				</h2>
				<CardColumns>
					{searchedBooks.map((book) => {
						return (
							<Card key={book.bookId} border='dark'>
								{book.image ? (
									<Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
								) : null}
								<Card.Body>
									<Card.Title>{book.title}</Card.Title>
									<p className='small'>Authors: {book.authors}</p>
									<Card.Text>{book.description}</Card.Text>
									{Auth.loggedIn() && (
										<Button
											disabled={savedBookIds?.some((savedId) => savedId === book.bookId)}
											className='btn-block btn-info'
											onClick={() => handleSaveBook(book.bookId)}>
											{savedBookIds?.some((savedId) => savedId === book.bookId)
												? 'This book has already been saved!'
												: 'Click to save this Book!'}
										</Button>
									)}
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns>
			</Container> */}
		</>
	);
};
