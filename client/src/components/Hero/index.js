import React, { useState } from "react";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const array = ["present1", "valentines1", "christmas1"];
  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = array.length - 1;
    } else if (newIndex > array.length - 1) {
      newIndex = 0;
    }
    setActiveIndex(newIndex)
  };

  return (
    <div className="carousel" data-carousel>
      <button className="carousel-button prev" data-carousel-button="prev" onClick={() => { updateIndex(activeIndex - 1) }}>&#8656;</button>
      <button className="carousel-button next" data-carousel-button="next" onClick={() => { updateIndex(activeIndex + 1) }}>&#8658;</button>
      <ul data-slides>
        <li>
          <img alt={array[activeIndex]} src={require(`../../assets/images/${array[activeIndex]}.jpeg`)}></img>
        </li>
      </ul>
    </div>
  )
}

export default Hero;