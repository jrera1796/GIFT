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

  //create state to hold saved giftId values
  const [savedGiftIds, setSavedGiftIds] = useState(getSavedGiftIds());
  const [saveGift] = useMutation(SAVE_GIFT);

  // useEffect(() => { return () => saveGiftIds(savedGiftIds); });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setShowResults(false)
      setToggleLoading(true); loadingScreen()
      const data = await searchProducts(searchGift, searchGiftCategory);
      console.log(data);

      const giftData = data.map((gift) => ({
        giftId: gift.asin,
        title: gift.title || ['No author to display'],
        image: gift.image || '',
        link: gift.link,
      }));

      console.log(giftData)

      setShowResults(true);
      setSearchedData(giftData);
      setSearchGift('');
      setSearchGiftCategory(1000)


    }
    catch (error) {
      console.log(error)
    }
  };

  const handleSaveGift = async (giftId) => {
    const giftToSave = searchedData.find((gift) => gift.asin === giftId);
    console.log(giftToSave);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) { return false; }
    try {
      const { resData } = await saveGift({ variables: { giftData: { ...giftToSave } } });
      console.log(resData);
      setSavedGiftIds([...savedGiftIds, giftToSave.giftId]);
    } catch (e) { console.log('Cannot Save Gift'); }
  }



  useEffect(() => {
    saveGiftIds(savedGiftIds); 
    let params = (new URL(document.location)).searchParams
    let personality = params.get('personality');
    if(!personality){return}
    async function fetchData() {
      const typeData = await checkType(personality);
     
        setToggleLoading(true); loadingScreen();
        const prepopulateData = await searchProducts(typeData[0], typeData[1]);
        console.log(searchedData)
        setSearchedData(prepopulateData);
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
          {searchedData.map((netData) => (
            <div key={netData.asin} className="card card-max-height">
              <div className="card-image">
                <figure className="image is-half">
                  <img src={netData.image} alt={netData.asin} />
                </figure>
              </div>
              <div className="card-content p-0">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 pl-6">{netData.title}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <p className="card-footer-item" style={{padding:"10px"}}>
                    <span>
                      View on <a href={netData.link} target="_blank" rel="noreferrer" noopener="true">Amazon</a>
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
