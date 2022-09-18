import { ViewStyle, TextStyle } from 'react-native';
import { ApplicationStyles } from '../../Themes';

export default {

  ...ApplicationStyles.texts,
  ...ApplicationStyles,

  body: {
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,
  sectionContainer: {
    marginTop: 32,
    //alignContent:'center',
    // backgroundColor: 'white',
    borderRadius: 10,
    // width: '60%',
    // height: '40%',
    zIndex: 1,
    alignItems: 'center',
    // alignSelf:'center',
    paddingHorizontal: 24,
  } as ViewStyle,
  circuloView: {
    marginTop: -200,
    //alignContent:'center',
    backgroundColor: 'lightblue',
    borderRadius: 600,
    width: 600,
    height: 600,
    marginBottom: -300,


    alignItems: 'center',
    // alignSelf:'center',
    paddingHorizontal: 24,
  } as ViewStyle,
  titleText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 22, fontWeight: 'bold'
  } as TextStyle

}