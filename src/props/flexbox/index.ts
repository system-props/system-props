import { PropConfigCollection } from '../../types';

export const flexContainer: PropConfigCollection = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
};

export const flexItem: PropConfigCollection = {
  // item
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true,
};

export const flexbox = {
  ...flexContainer,
  ...flexItem,
};

export default flexbox;
