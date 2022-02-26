import React, { useState } from 'react';
import searchProducts from '../utils/searchAPI';
import Auth from '../utils/auth';
import 'bulma/css/bulma.css';

const categories = [
  { 'Apps & Games': 2350150011 },
  { 'Arts, Crafts & Sewing': 2617942011 },
  { 'Beauty': 11055981 },
  { 'Books': 1000 },
  { 'CDs & Vinyl': 301668 },
  { 'Clothing, Shoes & Jewelry': 7141124011 },
  { 'Collectibles & Fine Arts': 4991426011 },
  { 'Digital Music': 624868011 },
  { 'Electronics': 493964 },
  { 'Gift Cards': 2864120011 },
  { 'Grocery & Gourmet Food': 16310211 },
  { 'Handmade': 11260433011 },
  { 'Health & Personal Care': 3760931 },
  { 'Home & Kitchen': 1063498 },
  { 'Industrial & Scientific': 16310161 },
  { 'Movies & TV': 2625374011 },
  { 'Musical Instruments': 11965861 },
  { 'Office Products': 1084128 },
  { 'Patio, Lawn & Garden': 3238155011 },
  { 'Pet Supplies': 2619534011 },
  { 'Software': 409488 },
  { 'Sports & Outdoors': 3375301 },
  { 'Tools & Home Improvement': 468240 },
  { 'Toys & Games': 165795011 },
  { 'Vehicles': 10677470011 },
  { 'Video Games': 11846801 }

]

const SearchPage = () => {

  function searchMore(keywords, category) { return searchProducts(keywords, category) };
  const [searchGift, setSearchGift] = useState('');
  const [searchGiftCategory, setSearchGiftCategory] = useState(1084128);
  const [searchedData, setSearchedData] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await searchMore(searchGift, searchGiftCategory);
      setSearchedData(data);
      setSearchGift('');
      setSearchGiftCategory(1084128)
      console.log(searchedData)
    }
    catch (error) {
      console.log(error)
    }

  }


  return (

    <div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className='field is-flex-direction-row'>
            <div className='control'>
              <input
                className='input is-normal'
                name='searchGift'
                value={searchGift}
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
                <option defaultValue={1084128}>Search by category</option>
                {categories.map(({ key, value }) => (
                  <option key={value} value={value}>{key}</option>
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

      <div className='container card-grid results'>
        {searchedData.map((netData) => (
          <div class="card card-max-height">
            <div class="card-image">
              <figure class="image is-half">
                <img src={netData.image} alt={netData.asin} />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{netData.title}</p>
                </div>
              </div>
              <div className="card-footer">
                <p class="card-footer-item">
                  <span>
                    View on <a href={netData.link}>Amazon</a>
                  </span>
                </p>
                {Auth.loggedIn() ? (<p class="card-footer-item">
                  <button className='button is-medium'>
                    Save
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
    </div>


  )
}

export default SearchPage;
