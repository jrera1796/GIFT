import React, { useEffect, useState } from "react";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const array = [
    
    { img: "present4", a: "Feeling the holiday's gift's blues...", b: "", c: "has-background-light is-size-3 has-text-black"},
    { img: "present5", a: "and slapping a bow on just about anything", b:"" , c: "has-background-light is-size-3 has-text-black"},
    { img: "present6", a: "Give it some thought", b: "", c:"has-background-light is-size-3 has-text-black"},
    { img: "flutes", a: "Gifts for Celebrations", b: "", c:"has-background-light is-size-3 has-text-black"},
    { img: "valentines1", a: "Gifts for Valentines Day", b: "", c: "has-background-light is-size-3 has-text-black"},
    { img: "christmas1", a: "Gifts for Christmas", b: "", c:"has-background-light is-size-3 has-text-black"},
    { img: "roses", a: "Gifts for your loved ones", b: "", c:"has-background-light is-size-3 has-text-black"},
  ];

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = array.length - 1;
    } else if (newIndex > array.length - 1) {
      newIndex = 0;
    }
    setActiveIndex(newIndex)
  };

  useEffect(() => {
    const next = (activeIndex + 1) % array.length;
    const id = setTimeout(() => setActiveIndex(next), 5000)
    return () => clearTimeout(id);
  })

  return (
    <div className="hero-outer">

        <div className="hero-column">
            <div className='text-container'>   
              <div className='box has-text-white level gift-box'>
                <h1 className='is-size-2'>G</h1>
                <p> ift</p>
              </div>
              <div className='box has-text-white level gift-box'>
                <h1 className='is-size-2'>I</h1>
                <p> deas</p>
              </div>
              <div className='box has-text-white level gift-box'>
                <h1 className='is-size-2'>F</h1>
                <p> or</p>
              </div>
              <div className='box has-text-white level gift-box'>
                <h1 className='is-size-2'>T</h1>
                <p> hem</p>
              </div>      
            </div>
        </div>

        <div className="hero-column-2">
            
            <div className="carousel" data-carousel>
              <button className="carousel-button prev" data-carousel-button="prev" onClick={() => { updateIndex(activeIndex - 1) }}></button>
              <button className="carousel-button next" data-carousel-button="next" onClick={() => { updateIndex(activeIndex + 1) }}></button>
              <img alt={array[activeIndex].img} src={require(`../../assets/images/${array[activeIndex].img}.jpeg`)}></img>
                <div className="overlay">
                    <div className={array[activeIndex].c || "overlay-text" }>
                      {array[activeIndex].a}
                      <br></br>{array[activeIndex].b}
                    </div>
                </div>
            </div>
              <div>
                  <br />
                    <div  className="box has-background-dark intro-message-container">
                      <h3 className='intro-message box'> 
                        We know how difficult it can be to come up with the perfect gift for your friends or family. That's why our team decided to create 'GIFT'.
                        <br></br>You can search for gift ideas on our search page, or sign up and gain access to our personality test to help you find the right gift!
                        <br></br>
                        <br></br>Our gift ideas are inspired by <a className="has-text-white" href="https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator">Myer Briggs Type Indicator</a>
                        <br></br>Everyone has a combination of characteristics that determine which type of person they are. This results in 16 possible types, and 16 different gift ideas. Future developments to this website will expand the gift ideas to include even more ideas!
                      </h3>
                    </div>
              </div>
            </div>


        </div>

  )
}

export default Hero;