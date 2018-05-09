import {
  moveHouseToTheLeftColumn,
  moveHouseToTheRightColumn,
  MOVE_HOUSE_TO_RIGHT_COLUMN,
  MOVE_HOUSE_TO_LEFT_COLUMN,
  HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN,
  ACTION_TYPE
} from "./move.houses.actions";
import { aHouse } from "../data/house.decorator.test";
describe("move house actions unit tests ", () => {
  const payload = {};
  payload[HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN] = aHouse;

  it(
    "Given that action type is MOVE_HOUSE_TO_RIGHT_COLUMN, " +
      "then moveHouseToTheRightColumn should return action with a matching type and payload",
    () => {
      const action = moveHouseToTheRightColumn(payload);
      expect(action[ACTION_TYPE]).toBe(MOVE_HOUSE_TO_RIGHT_COLUMN);
      expect(action[HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN]).toBe(payload);
    }
  );

  it(
    "Given that action type is MOVE_HOUSE_TO_LEFT_COLUMN, " +
      "then moveHouseToTheLeftColumn should return action with a matching type and payload",
    () => {
      const action = moveHouseToTheLeftColumn(payload);
      expect(action[ACTION_TYPE]).toBe(MOVE_HOUSE_TO_LEFT_COLUMN);
      expect(action[HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN]).toBe(payload);
    }
  );
});
