import React, { Component } from "react";
import Slider from "react-slick";
import "./Home.css"; // Import your CSS file

export default class HomeSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="main">
        <Slider {...settings}>
          <div>
            <img
              className="slide-image"
              src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="slide-image"
              src="https://b.zmtcdn.com/data/pictures/9/20575589/2ced954129d4f31f33f238f779394f37_o2_featured_v2.jpg?output-format=webp"
              alt=""
            />
          </div>
          <div>
            <img
              className="slide-image"
              src="https://b.zmtcdn.com/data/pictures/7/20147797/338781aebc573be2d23a7ce2e6821114_o2_featured_v2.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="slide-image"
              src="https://b.zmtcdn.com/data/pictures/5/19744215/c71f59ce31710a85d03b0e3ba36c46ab_o2_featured_v2.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="slide-image"
              src="https://b.zmtcdn.com/data/pictures/chains/2/18939242/a6c8129329bf976270361b45058f110b_o2_featured_v2.jpg?output-format=webp"
              alt=""
            />
          </div>
        </Slider>
        <h1>Weclome to Recipe Search</h1>
      </div>
    );
  }
}
