import houseDecorator, { doesNotExist } from "./house.decorator";
import "babel-polyfill";

export const LEFT_COLUMN_HOUSES_PROPERTY_NAME = "results";
export const RIGHT_COLUMN_HOUSES_PROPERTY_NAME = "saved";

export default function listOfHousesDecorator(data) {
  return {
    leftColumnHouses: function() {
      if (
        doesNotExist(data) ||
        doesNotExist(data[LEFT_COLUMN_HOUSES_PROPERTY_NAME])
      ) {
        return [];
      }
      return data[LEFT_COLUMN_HOUSES_PROPERTY_NAME];
    },
    rightColumnHouses: function() {
      if (
        doesNotExist(data) ||
        doesNotExist(data[RIGHT_COLUMN_HOUSES_PROPERTY_NAME])
      ) {
        return [];
      }

      return data[RIGHT_COLUMN_HOUSES_PROPERTY_NAME];
    },
    existInTheRightColumn: function(aHouse) {
        const rightColumnHouses = this.rightColumnHouses();
        const found = rightColumnHouses.find((house) => {
          return houseDecorator(house).id() === houseDecorator(aHouse).id();
        });

        return !doesNotExist(found);
    },
    removeHouseFromTheRightColumn: function(house) {
      const id = houseDecorator(house).id();
      const rightColumnHouses = this.rightColumnHouses();
      const filteredHouses = this.houseArray(rightColumnHouses).filterById(id);
      data[RIGHT_COLUMN_HOUSES_PROPERTY_NAME] = filteredHouses;
      return data;
    },
    houseArray: function(houses) {
      let filteredHouses = [];
      return {
        filterById: id => {
          filteredHouses = houses.filter(function(aHouse) {
            return id !== houseDecorator(aHouse).id();
          });
          return filteredHouses;
        }
      };
    }
  };
}
