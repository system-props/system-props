import { PropConfigCollection, ResponsiveProp } from '@/types';
import { Property } from 'csstype';

export const flexbox: PropConfigCollection = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  // item
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true,
};

export interface FlexboxProps {
  alignItems?: ResponsiveProp<Property.AlignItems>;
  alignContent?: ResponsiveProp<Property.AlignContent>;
  justifyItems?: ResponsiveProp<Property.JustifyItems>;
  justifyContent?: ResponsiveProp<Property.JustifyContent>;
  flexWrap?: ResponsiveProp<Property.FlexWrap>;
  flexDirection?: ResponsiveProp<Property.FlexDirection>;
  flex?: ResponsiveProp<Property.Flex>;
  flexGrow?: ResponsiveProp<Property.FlexGrow>;
  flexShrink?: ResponsiveProp<Property.FlexShrink>;
  flexBasis?: ResponsiveProp<Property.FlexBasis>;
  justifySelf?: ResponsiveProp<Property.JustifySelf>;
  alignSelf?: ResponsiveProp<Property.AlignSelf>;
  order?: ResponsiveProp<Property.Order>;
}

export default flexbox;
