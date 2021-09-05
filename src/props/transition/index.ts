import { PropConfigCollection, Transform } from '../../core/types';
import { tokenizeValue } from '../tokenizeValue';

const parseTransition: Transform = ({ path, object, get, strict }) => {
  let result = get(object, path);
  if (result) {
    return result;
  }

  // '$tokenValue, $anotherTokenValue'
  // '$tokenValue, property duration easing'
  if (typeof path === 'string') {
    const transitions = tokenizeValue(path);
    result = transitions
      .map((transition) => {
        if (transition.length === 1) {
          return get(object, transition[0], strict ? undefined : transition[0]);
        }
        return transition.join(' ');
      })
      .join(', ');
    return result;
  }

  return path;
};

export const transition: PropConfigCollection = {
  transition: {
    property: 'transition',
    scale: 'transitions',
    transform: parseTransition,
  },
  transitionDuration: {
    property: 'transitionDuration',
    scale: 'transitionDurations',
  },
  transitionTimingFunction: {
    property: 'transitionTimingFunction',
    scale: 'transitionTimingFunctions',
  },
  transitionProperty: true,
  transitionDelay: true,
};
