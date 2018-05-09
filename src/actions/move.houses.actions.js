export const MOVE_HOUSE_TO_RIGHT_COLUMN = "moving_house_to_the_right_column";
export const MOVE_HOUSE_TO_LEFT_COLUMN = "moving_house_to_the_left_column";
export const HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN = "house";
export const ACTION_TYPE = "type";

export function moveHouseToTheLeftColumn(aHouse) {
  return moveHouseActionBuilder()
    .withHouse(aHouse)
    .withType(MOVE_HOUSE_TO_LEFT_COLUMN)
    .build();
}

export function moveHouseToTheRightColumn(aHouse) {
  return moveHouseActionBuilder()
    .withHouse(aHouse)
    .withType(MOVE_HOUSE_TO_RIGHT_COLUMN)
    .build();
}

export function moveHouseActionBuilder() {
  let house;
  let type;
  return {
    withHouse: function(aHouse) {
      house = aHouse;
      return this;
    },
    withType: function(t) {
      type = t;
      return this;
    },
    build() {
      let action = {};
      action[ACTION_TYPE] = type;
      action[HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN] = house;

      return action;
    }
  };
}
