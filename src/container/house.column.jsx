import React, { Component } from "react";
import { connect } from "react-redux";
import House from "../component/house";
import Error from "../component/error";
import Loading from "../component/loading";
import { fetchListOfHouses } from "../actions/fetch.houses.actions";
import {
  moveHouseToTheLeftColumn,
  moveHouseToTheRightColumn
} from "../actions/move.houses.actions";
import { doesNotExist } from "../data/house.decorator";
import listOfHousesDecorator from "../data/list.of.houses.decorator";
import "../stylesheets/foundation.min.css";
import "../stylesheets/layout.css";

export const LEFT_COLUMN_ID = "left-column";
export const RIGHT_COLUMN_ID = "right-column";
const TEXT_FOR_ADD_BUTTON = "add";
const TEXT_FOR_REMOVE_BUTTON = "remove";

export class HouseColumn extends Component {
  componentWillMount() {
    if (doesNotExist(this.props.fetchListOfHouses)) {
      return;
    }

    this.props.fetchListOfHouses();
  }

  housesInLeftColumn() {
    const housesInTheLeftColumns = listOfHousesDecorator(
      this.props.houses
    ).leftColumnHouses();
    const moveHouseToTheRightColumn = this.props.moveHouseToTheRightColumn;

    return this.renderHouses({
      listOfHouses: housesInTheLeftColumns,
      buttonText: TEXT_FOR_ADD_BUTTON,
      buttonActionHandler: moveHouseToTheRightColumn
    });
  }

  housesInRightColumn() {
    const housesInTheRightColumns = listOfHousesDecorator(
      this.props.houses
    ).rightColumnHouses();
    const moveHouseToTheLeftColumn = this.props.moveHouseToTheLeftColumn;
    return this.renderHouses({
      listOfHouses: housesInTheRightColumns,
      buttonText: TEXT_FOR_REMOVE_BUTTON,
      buttonActionHandler: moveHouseToTheLeftColumn
    });
  }

  renderHouses(obj) {
    const listOfHouses = obj.listOfHouses;

    if (doesNotExist(listOfHouses) || doesNotExist(listOfHouses.map)) {
      return;
    }

    const houses = listOfHouses.map(function(aHouse) {
      return (
        <House
          data={aHouse}
          key={aHouse.id}
          buttonText={obj.buttonText}
          moveHouse={obj.buttonActionHandler}
        />
      );
    });

    return houses;
  }

  render() {
    const housesInLeftColumn = this.housesInLeftColumn();
    const housesInRightColumn = this.housesInRightColumn();
    const hasErrored = this.props.fetchingListOfHousesHasErrored;
    const isFetchingListOfHouses = this.props.isFetchingListOfHouses;

    return (
      <div>
        <Loading
          fetchingData={isFetchingListOfHouses}
          hasErrored={hasErrored}
        />
        <Error hasErrored={hasErrored} />
        <div className="row">
          <div className="columns small-6 header">Result</div>
          <div className="columns small-6 header">Saved Properties</div>
        </div>
        <div className="row">
          <div id={LEFT_COLUMN_ID} className="columns small-6">
            {housesInLeftColumn}
          </div>
          <div id={RIGHT_COLUMN_ID} className="columns small-6">
            {housesInRightColumn}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  const url = process.env.REACT_APP_HOUSES_DATA_JSON;
  return {
    fetchListOfHouses: () => {
      dispatch(fetchListOfHouses(url));
    },
    moveHouseToTheRightColumn: aHouse => {
      dispatch(moveHouseToTheRightColumn(aHouse));
    },
    moveHouseToTheLeftColumn: aHouse => {
      dispatch(moveHouseToTheLeftColumn(aHouse));
    }
  };
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseColumn);
