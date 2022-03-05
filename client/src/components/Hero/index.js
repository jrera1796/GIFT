import React, { useEffect, useState } from "react";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const array = [
    { img: "present1", a: "Gift Ideas For Them!", b: "" },
    { img: "present2", a: "Description", b: "Line Break", c: "has-text-danger" },
    { img: "present3", a: "Description", b: "Line Break" },
    { img: "present4", a: "Description", b: "Line Break" },
    { img: "present5", a: "Description", b: "Line Break" },
    { img: "present6", a: "Description", b: "Line Break" },
    { img: "valentines1", a: "Description", b: "Line Break", c: "is-size-2 has-text-success"},
    { img: "christmas1", a: "Description", b: "Line Break" },
    { img: "restaurant1", a: "Description", b: "Line Break" },
    { img: "flutes", a: "Description", b: "Line Break" },
    { img: "roses", a: "Description", b: "Line Break" },
    { img: "rings", a: "Description", b: "Line Break" },
    { img: "baby", a: "Baby Shower gifts anyone?", b: "Line Break" },
    { img: "balloons", a: "Gifts for your next Graduation!", b: "" }
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
    const id = setTimeout(() => setActiveIndex(next), 10000)
    return () => clearTimeout(id);
  })

  return (
    <div className="hero-outer">

        <div className="hero-column">
            <div className='text-container'>   
              <div className='box level gift-box'>
                <h1 className='is-size-2'>G</h1>
                <p> ift</p>
              </div>
              <div className='box level gift-box'>
                <h1 className='is-size-2'>I</h1>
                <p> deas</p>
              </div>
              <div className='box level gift-box'>
                <h1 className='is-size-2'>F</h1>
                <p> or</p>
              </div>
              <div className='box level gift-box'>
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
                    <h3 className='intro-message box'>GIFT: Gift Imagine For Them <br /> 
                        Don't know what to get for your love ones, friends or co-workers?
                        Let GIFT help you figured out what to get for them.
                        Sign-up for our app, take a simple personality test and let GIFT find the gifts that suits your recipients.
                    </h3>
              </div>
            </div>


        </div>

  )
}

export default Hero;