import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Colors from '../Util/Colors';

export const MediaPlayerOverlayContainer = styled.View`
  background: rgba(253, 253, 255, 0.2);
  /* dropdshadow-down/$dropshadow-z2-down */

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  position: absolute;
  bottom: 80px;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  height: 64px;
`;

export const MediaNameText = styled.Text`
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #ffffff;
`;

export const MediaNameSubText = styled.Text`
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  margin-top: 4px;
  /* identical to box height */

  color: #888888;
`;

export const style = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: '5%',
    borderRadius: 20,
    backgroundColor: Colors.WHITE[200],
    paddingHorizontal: '4%',
    position: 'absolute',
    bottom: '5%',
    marginHorizontal: '5%',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textStyle: {
    color: Colors.WHITE[100],
    width: '100%',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
  },
  subTextStyle: {
    color: Colors.WHITE[100],
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
    marginTop: 4,
  },
  bottomBar: {
    width: '100%',
    paddingVertical: 1,
    position: 'absolute',
    bottom: 0,
    marginHorizontal: '5%',
    height: 5,
    flexDirection: 'row',
    backgroundColor: Colors.GRAY[100],
  },
  barViewStyle: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
});
