import React, { Component } from "react";
import houseDecorator, { ATTRIBUTE_IS_MISSING } from "../data/house.decorator";

export const PREFIX_FOR_IMG_ID = "main-image-";
export const PREFIX_FOR_LOGO_ID = "logo-";
export const PREFIX_FOR_PRICE_ID = "price-";

export const PREFIX_FOR_LOGO_CONTAINER_ID = "logo-container-";
export const PREFIX_FOR_HOUSE_CONTAINER = "container-";
export const PREFIX_FOR_MOVE_BTN_ID = "move-btn-";
export const CSS_CLASS_FOR_HIDING_BUTTON = "is-hidden";
export const CSS_CLASS_FOR_BUTTON = "button";
export const PRICE_HAS_NOT_BEEN_SPECIFIED = "Price has not been set";

export function generateID(prefix, id) {
  return prefix + id;
}

export default class House extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false
    };
  }

  moveHouseToAColumn() {
    const house = this.props.data;
    this.props.moveHouse(house);
  }

  displayButton() {
    this.setState({
      showButton: true
    });
  }

  hideButton() {
    this.setState({
      showButton: false
    });
  }

  render() {
    const decoratedHouseData = houseDecorator(this.props.data);
    const mainImageURL = decoratedHouseData.mainImage();
    const price = decoratedHouseData.price();
    const id = decoratedHouseData.id();
    const buttonText = this.props.buttonText;
    const logoURL = decoratedHouseData.logo();
    const brandingColor = decoratedHouseData.primaryBrandingColor();

    if (id === ATTRIBUTE_IS_MISSING) {
      return null;
    }

    return (
      <div
        id={generateID(PREFIX_FOR_HOUSE_CONTAINER, id)}
        className="property-container"
        onMouseOver={this.displayButton.bind(this)}
        onMouseLeave={this.hideButton.bind(this)}
      >
        {logoURL !== ATTRIBUTE_IS_MISSING && (
          <div
            id={generateID(PREFIX_FOR_LOGO_CONTAINER_ID, id)}
            style={{ backgroundColor: brandingColor }}
          >
            <img
              id={generateID(PREFIX_FOR_LOGO_ID, id)}
              src={logoURL}
              alt="agency logo"
            />
          </div>
        )}

        {mainImageURL !== ATTRIBUTE_IS_MISSING && (
          <img
            id={generateID(PREFIX_FOR_IMG_ID, id)}
            src={mainImageURL}
            alt="house"
          />
        )}

        <span id={generateID(PREFIX_FOR_PRICE_ID, id)}>
          {price === ATTRIBUTE_IS_MISSING
            ? PRICE_HAS_NOT_BEEN_SPECIFIED
            : price}
        </span>
        <div className="button-container">
          <button
            className={
              this.state.showButton
                ? CSS_CLASS_FOR_BUTTON
                : CSS_CLASS_FOR_BUTTON + " " + CSS_CLASS_FOR_HIDING_BUTTON
            }
            id={generateID(PREFIX_FOR_MOVE_BTN_ID, id)}
            onClick={this.moveHouseToAColumn.bind(this)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}
