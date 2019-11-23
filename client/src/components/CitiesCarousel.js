import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import GridCell from './GridCell';

const items = [
  {
    number: 1,
    cities: [
      {
        pic: require('../images/cities/barcelona3.png'),
        name: "Barcelona"
      },
      {
        pic: require('../images/cities/newyork.png'),
        name: "New York"
      },
      {
        pic: require('../images/cities/amsterdam2.png'),
        name: "Amsterdam"
      },
      {
        pic: require('../images/cities/paris3.png'),
        name: "Paris"
      }
    ]
  },
  {
    number: 2,
    cities: [
      {
        pic: require('../images/cities/london.png'),
        name: "London"
      },
      {
        pic: require('../images/cities/rome3.png'),
        name: "Rome"
      },
      {
        pic: require('../images/cities/athens.png'),
        name: "Athens"
      },
      {
        pic: require('../images/cities/budapest2.png'),
        name: "Budapest"
      }
    ]
  },
  {
    number: 3,
    cities: [
      {
        pic: require('../images/cities/berlin2.png'),
        name: "Berlin"
      },
      {
        pic: require('../images/cities/prague3.png'),
        name: "Prague"
      },
      {
        pic: require('../images/cities/madrid2.png'),
        name: "Madrid"
      },
      {
        pic: require('../images/cities/vienna2.png'),
        name: "Vienna"
      }
    ]
  }
];

const CitiesCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map( (slide, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <div className="citiesGrid">
          {slide.cities.map( (city, index) =>
            <GridCell key={index} src={city.pic} alt={city.name} id={city.name.toLowerCase().replace(/ /g, '')} captionText={city.name} />
          ) }
        </div>
      </CarouselItem>
    );
  });

  return (
    <section id="citiesCarousel">
      <h3>Popular MYtineraries</h3>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </section>
  );
}

export default CitiesCarousel;
