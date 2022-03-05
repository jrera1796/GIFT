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

  )
}

export default Hero;