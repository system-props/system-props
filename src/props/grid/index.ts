import { PropConfigCollection, ResponsiveProp } from '@/types';
import { Property } from 'csstype';

export const grid: PropConfigCollection = {
  gap: {
    property: 'gap',
    scale: 'space',
  },
  gridGap: {
    property: 'gridGap',
    scale: 'space',
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'space',
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'space',
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
};

export interface GridProps {
  gap?: ResponsiveProp<Property.Gap>;
  gridGap?: ResponsiveProp<Property.GridGap>;
  gridColumnGap?: ResponsiveProp<Property.GridColumnGap>;
  gridRowGap?: ResponsiveProp<Property.GridRowGap>;
  gridRow?: ResponsiveProp<Property.GridRow>;
  gridColumn?: ResponsiveProp<Property.GridColumn>;
  gridAutoFlow?: ResponsiveProp<Property.GridAutoFlow>;
  gridAutoColumns?: ResponsiveProp<Property.GridAutoColumns>;
  gridAutoRows?: ResponsiveProp<Property.GridAutoRows>;
  gridTemplateColumns?: ResponsiveProp<Property.GridTemplateColumns>;
  gridTemplateRows?: ResponsiveProp<Property.GridTemplateRows>;
  gridTemplateAreas?: ResponsiveProp<Property.GridTemplateAreas>;
  gridArea?: ResponsiveProp<Property.GridArea>;
}

export default grid;
