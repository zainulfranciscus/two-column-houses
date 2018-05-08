export const ATTRIBUTE_IS_MISSING = "Unknown";

export function doesNotExist(property) {
  return typeof property === "undefined" || property === null;
}

export default function houseDecorator(data) {
  return {
    price: function() {
      if (doesNotExist(data.price)) {
        return ATTRIBUTE_IS_MISSING;
      }

      return data.price;
    },
    primaryBrandingColor: function() {
      if (
        doesNotExist(data.agency) ||
        doesNotExist(data.agency.brandingColors) ||
        doesNotExist(data.agency.brandingColors.primary)
      ) {
        return ATTRIBUTE_IS_MISSING;
      }

      return data.agency.brandingColors.primary;
    },
    logo: function() {
      if (doesNotExist(data.agency) || doesNotExist(data.agency.logo)) {
        return ATTRIBUTE_IS_MISSING;
      }
      return data.agency.logo;
    },
    id: function() {
      if (doesNotExist(data.id)) {
        return ATTRIBUTE_IS_MISSING;
      }

      return data.id;
    },
    mainImage: function() {
      if (doesNotExist(data.mainImage)) {
        return ATTRIBUTE_IS_MISSING;
      }
      return data.mainImage;
    }
  };
}
