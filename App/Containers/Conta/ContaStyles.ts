import { ViewStyle, TextStyle } from 'react-native';
import { ApplicationStyles, Colors } from '../../Themes';
import { whileStatement } from '@babel/types';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default {

  ...ApplicationStyles.texts,
  ...ApplicationStyles,

  titleValue: {
    marginLeft: '4%',
    marginTop: '3.7%',
    marginBottom: '3.7%',
    fontSize: 18,
    fontWeight: 'bold',
    // fontFamily: 'Times New Roman',
    textDecorationColor: 'red'
  } as TextStyle,

  textValue: {
    marginLeft: '4%',
    marginTop: '3.7%',
    fontSize: 18,
    fontWeight: 'bold',
    // fontFamily: 'Times New Roman',
    textDecorationColor: 'yellow'
  } as TextStyle,

  headerView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '2%',
    backgroundColor: '#91c8ff',

  } as ViewStyle,

  bodyView: {
    alignItems: 'center',
    justifyContent: 'center', padding: '4%',
    backgroundColor: '#FFFFFF',

  } as ViewStyle,
  //RNSelect
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  } as TextStyle,
  iconContainer: {
    top: 20,
    right: 10,
  } as ViewStyle,
  placeholder: {
    color: 'purple',
    fontSize: 12,
    fontWeight: 'bold',
  } as ViewStyle,
  IConeView: {
    backgroundColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'gray',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  } as ViewStyle,


  centeredColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  smallPaddingLeft: {
    paddingLeft: responsiveWidth(3)
  } as ViewStyle,
  smallPaddingRight: {
    paddingRight: responsiveWidth(3)
  } as ViewStyle,

  ColorBackGround: { 
    backgroundColor: '#91c8ff', 
    borderRadius: 30, 
    marginTop: 10, 
    width: 55, height: 55
  } as ViewStyle,

  body: {
    height: '100%'
} as ViewStyle,
textLeft: {
    marginLeft: 15
} as ViewStyle,
textRight: {
    marginRight: 15
} as ViewStyle,
buttonView: {
    borderColor: 'black', backgroundColor: 'grey', borderRadius: 25, height: 40, width: 250, alignItems: 'center',  marginBottom: 10, justifyContent: 'center'
} as ViewStyle,   
 titleBar: {
  height: 50, backgroundColor: '#a5a3a2', width: '100%', alignItems: 'center', justifyContent: 'center'
} as ViewStyle,
datasBar: {
  height: 50, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1
} as ViewStyle,

}