import {
  createSystem,
  space,
  color,
  typography,
  border,
  layout,
} from '../../dist';
import styled from '@emotion/styled';

const system = createSystem();

const Box = styled('div')(
  system({
    ...space,
    ...color,
    ...border,
    ...typography,
    ...layout,
    textAlign: true,
    textDecoration: true,
  })
);

export default Box;
