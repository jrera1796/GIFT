import React, { useState, useEffect } from 'react';
import searchProducts from '../utils/searchAPI';
import Auth from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import 'bulma/css/bulma.css';
import { saveGiftIds, getSavedGiftIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_GIFT } from '../utils/mutations';
import checkType from '../utils/personalities';

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
  const [searchGift, setSearchGift] = useState('cat'); //keyword
  const [searchGiftCategory, setSearchGiftCategory] = useState(1000); //category
  const [searchedData, setSearchedData] = useState([]); //result
  const [id, setId] = useState();

  //create state to hold saved giftId values
  const [savedGiftIds, setSavedGiftIds] = useState(getSavedGiftIds());
  const [saveGift] = useMutation(SAVE_GIFT);
  
  let params = (new URL(document.location)).searchParams
    let checkID = params.get('id');

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
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) { return false; }
    try {
      const { resData } = await saveGift({ 
        variables: {
          recipientId: id,
          giftData: giftToSave  }});
      console.log("Recipient Result ", resData);
      setSavedGiftIds([...savedGiftIds, giftToSave.giftId]);
    } catch (e) { console.log('Cannot Save Gift'); }
  }

  useEffect(() => {
    let params = (new URL(document.location)).searchParams
    let personality = params.get('personality');
    let rec_id = params.get('id');
    setId(rec_id);
    if(!personality){return}
    async function fetchData() {
      const typeData = await checkType(personality);
      setToggleLoading(true); loadingScreen();
      const prepopulateData = await searchProducts(typeData[0], typeData[1]);
      console.log(searchedData)
      const giftData = prepopulateData.map((gift) => ({
        giftId: gift.asin,
        title: gift.title || ['No Title'],
        image: gift.image || 'No Image',
        link: gift.link,
      }));
      setSearchedData(giftData);
      setShowResults(true); 
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
                onChange={(e) => setSearchGiftCategory(e.target.value)}
                type='select'
                placeholder='Search by Category'
              >
                <option value={'All Departments'}>Search by category</option>
                <option value={2350150011}>Apps and Games</option>
                <option value={2617942011}>Arts, Crafts and Sewing</option>
                <option value={15690151}>Automotive</option>
                <option value={165797011}>Baby</option>
                <option value={11055981}>Beauty</option>
                <option value={1000}>Books</option>
                <option value={301668}>CDs and Vinyl</option>
                <option value={7141124011}>Clothing, Shoes and Jewelry</option>
                <option value={4991426011}>Collectibles and Fine Arts</option>
                <option value={493964}>Electronics</option>
                <option value={2864120011}>Gift Cards</option>
                <option value={11260433011}>Handmade</option>
                <option value={3760931}>Health and Personal Care</option>
                <option value={1063498}>Home and Kitchen</option>
                <option value={11965861}>Musical Instruments</option>
                <option value={3238155011}>Patio, Lawn and Garden</option>
                <option value={3375301}>Sports and Outdoors</option>
                <option value={468240}>Tool and Home Improvement</option>
                <option value={165795011}>Toys and Games</option>
                <option value={11846801}>Video Games</option>
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
          {searchedData.map((gift) => (
            <div key={gift.giftId} className="card card-max-height">
              <div className="card-image">
                <figure className="image is-half">
                  <img src={gift.image} alt={gift.giftId} />
                </figure>
              </div>
              <div className="card-content p-0">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 pl-6">{gift.title}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <p className="card-footer-item" style={{padding:"10px"}}>
                    <span>
                      View on <a href={gift.link} target="_blank" rel="noreferrer" noopener="true">Amazon</a>
                    </span>
                  </p>
                  {Auth.loggedIn() && checkID ? (<p className="card-footer-item" style={{padding:"10px"}}>
                    <button
                      className='button is-medium'
                      disabled={savedGiftIds?.some((savedId) => savedId === gift.giftId)}
                      onClick={() => handleSaveGift(gift.giftId)}>
                      {savedGiftIds?.some((savedId) => savedId === gift.giftId)
                        ? 'Already Saved' : 'Click To Save'}
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
            <FontAwesomeIcon className='is-3' icon={faSpinner} spin></FontAwesomeIcon>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}

export default SearchPage;
