import React, { useState, useEffect } from 'react';
import searchProducts from '../utils/searchAPI';
import Auth from '../utils/auth';
import 'bulma/css/bulma.css';
import {


  useParams
} from "react-router-dom";
import { saveGiftIds, getSavedGiftIds } from '../utils/savingGifts';
import { useMutation } from '@apollo/client';
import { SAVE_GIFT } from '../utils/mutations';

const categories = [
  { "Apps,Games": 2350150011 },
  { "Arts, Crafts, Sewing": 2617942011 },
  { "Beauty": 11055981 },
  { "Books": 1000 },
  { "CDs, Vinyl": 301668 },
  { "Clothing, Shoes, Jewelry": 7141124011 },
  { "Collectibles, Fine Arts": 4991426011 },
  { "Digital Music": 624868011 },
  { "Electronics": 493964 },
  { "Gift Cards": 2864120011 },
  { "Grocery, Gourmet Food": 16310211 },
  { "Handmade": 11260433011 },
  { "Health, Personal Care": 3760931 },
  { "Home, Kitchen": 1063498 },
  { "Industrial, Scientific": 16310161 },
  { "Movies, TV": 2625374011 },
  { "Musical Instruments": 11965861 },
  { "Patio, Lawn, Garden": 3238155011 },
  { "Pet Supplies": 2619534011 },
  { "Software": 409488 },
  { "Sports, Outdoors": 3375301 },
  { "Tools, Home Improvement": 468240 },
  { "Toys, Games": 165795011 },
  { "Vehicles": 10677470011 },
  { "Video Games": 11846801 }

]

const SearchPage = () => {

  const [showResults, setShowResults] = useState(false)
  const [toggleLoading, setToggleLoading] = useState(false)

  function loadingScreen() {
    if (toggleLoading === true) {
      setToggleLoading(true)
    } else {
      console.log('Loading results')
    }
  }

  // function searchMore(keywords, category) { return searchProducts(keywords, category) };
  const [searchGift, setSearchGift] = useState('cat');
  const [searchGiftCategory, setSearchGiftCategory] = useState(1000);
  const [searchedData, setSearchedData] = useState([]);

  //create state to hold saved giftId values
  const [savedGiftIds, setSavedGiftIds] = useState(getSavedGiftIds());
  const [saveGift] = useMutation(SAVE_GIFT);

  useEffect(() => { return () => saveGiftIds(savedGiftIds); });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setShowResults(false)
      setToggleLoading(true); loadingScreen()
      const data = await searchProducts(searchGift, searchGiftCategory);
      setShowResults(true);
      setSearchedData(data);
      setSearchGift('');
      setSearchGiftCategory(1000)
    }
    catch (error) {
      console.log(error)
    }
  };

  const handleSaveGift = async (giftId) => {
    const giftToSave = searchedData.find((gift) => gift.giftId === giftId);
    console.log(giftToSave);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) { return false; }
    try {
      const { resData } = await saveGift({ variables: { data: { ...giftToSave } } });
      console.log(resData);
      setSavedGiftIds([...savedGiftIds, giftToSave.giftId]);
    } catch (e) { console.log('Cannot Save Gift'); }
  }



  useEffect(() => {
    let params = (new URL(document.location)).searchParams
    let personality = params.get('personality');

    async function fetchData() {
      if (personality === 'INFJ') {
        setToggleLoading(true); loadingScreen();
        const prepopulateData = await searchProducts('Advocacy', 1000);
        console.log(searchedData)
        setSearchedData(prepopulateData);
        setShowResults(true);
      } else {
        console.log('Not' + params)
      }
    } fetchData()
  }, []);


  return (

    <div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className='field is-flex-direction-row'>
            <div className='control'>
              <input
                className='input is-normal'
                name='searchGift'
                onChange={(e) => setSearchGift(e.target.value)}
                type='text'
                placeholder='Search for gifts'
              /></div>
            <div className='select'>
              <select
                className='text ml-2'
                name='searchGift'
                value={searchGiftCategory}
                onChange={(e) => setSearchGiftCategory(e.target.value)}
                type='select'
                placeholder='Search by Category'
              >
                <option value={1000}>Search by category</option>
                {categories.map((c) => (
                  <option key={JSON.stringify(c)} value={c}>{JSON.stringify(c)}</option>
                ))}
                {/* Can't get this to display */}
              </select>
            </div>

            <button className='button is-medium ml-5' type='submit' variant='success'>
              Submit Search
            </button>

          </div>
        </form>
      </div>
      {showResults ? (
        <div className='container card-grid results'>
          {searchedData.map((netData) => (
            <div key={netData.asin} className="card card-max-height">
              <div className="card-image">
                <figure className="image is-half">
                  <img src={netData.image} alt={netData.asin} />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{netData.title}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <p className="card-footer-item">
                    <span>
                      View on <a href={netData.link}>Amazon</a>
                    </span>
                  </p>
                  {Auth.loggedIn() ? (<p className="card-footer-item">
                    <button
                      className='button is-medium'
                      disabled={savedGiftIds?.some((savedId) => savedId === netData.giftId)}
                      onClick={() => handleSaveGift(netData.giftId)}>
                      {savedGiftIds?.some((savedId) => savedId === netData.giftId)
                        ? 'Save' : 'Already Saved'}
                    </button>
                  </p>
                  ) : (
                    <></>
                  )}
                </div>

              </div>
            </div>

          ))}
        </div>
      ) : (
        <>
          {toggleLoading ? (
            <div className="loader">I'm Loading</div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}

export default SearchPage;
