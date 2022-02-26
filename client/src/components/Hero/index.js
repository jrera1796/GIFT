import React, { useEffect, useState } from "react";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  const array = ["present1", "valentines1", "christmas1", "restaurant1"];
  
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
    const id = setTimeout(() => setActiveIndex(next), 15000)
    return () => clearTimeout(id);
  })

  return (
    <div className="carousel" data-carousel>
   
      <button className="carousel-button prev" data-carousel-button="prev" onClick={() => { updateIndex(activeIndex - 1) }}></button>
      <button className="carousel-button next" data-carousel-button="next" onClick={() => { updateIndex(activeIndex + 1) }}></button>
      
          <img alt={array[activeIndex]} src={require(`../../assets/images/${array[activeIndex]}.jpeg`)}></img>
       
      
   
    </div>
  )
}

export default Hero;