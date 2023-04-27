import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
const {width, height} = Dimensions.get('screen');

export const LoginButtonContainer = styled.Pressable`
  display: flex;
  flex-direction: ${(props: {flexDirection: any}) =>
    props.flexDirection ? props.flexDirection : 'column'};
  align-items: flex-start;
  padding: 19px 39px;
  gap: 10px;

  width: ${(props: {width: any}) =>
    props.width ? props.width : `${width * 0.8}px`};
  height: 56px;
  align-items: center;
  justify-content: center;

  background-color: #000000;
  border-radius: 12px;
  /* identical to box height, or 18px */
`;
export const ImageContainer = styled.Image`
  width: ${(props: {width: any}) => (props.width ? props.width : '100%')};
  height: ${(props: {height: any}) => (props.height ? props.height : '0px')};
  border-radius: ${(props: {borderRadius: any}) =>
    props.borderRadius ? props.borderRadius : '0px'};
  background-color: ${(props: {bgColor: any}) =>
    props.bgColor ? props.bgColor : 'transparent'};
  margin-left: ${(props: {marginLeft: any}) =>
    props.marginLeft ? props.marginLeft : '0px'};
  margin-right: ${(props: {marginRight: any}) =>
    props.marginRight ? props.marginRight : '0px'};
  margin-top: ${(props: {marginTop: any}) =>
    props.marginTop ? props.marginTop : '0px'};
  margin-bottom: ${(props: {marginBottom: any}) =>
    props.marginBottom ? props.marginBottom : '0px'};
  border-color: ${(props: {borderColor: any}) =>
    props.borderColor ? props.borderColor : '#000000'};
  border-width: ${(props: {borderWidth: any}) =>
    props.borderWidth ? props.borderWidth : '0px'};

  /* identical to box height, or 18px */
`;
