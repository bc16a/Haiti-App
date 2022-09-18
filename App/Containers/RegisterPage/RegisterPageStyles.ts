import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { ApplicationStyles, Colors } from '../../Themes';

export default {

  ...ApplicationStyles.texts,
  ...ApplicationStyles,

  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  } as ViewStyle,
  title: {
    textAlign: 'center',
    marginVertical: 8,
  } as TextStyle,

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10
  } as ViewStyle,
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  } as ViewStyle,

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
    backgroundColor: 'white',
    borderRadius: 10,
    width: 300,
    height: 350,
    zIndex: 1,
    alignItems: 'center',
    // alignSelf:'center',
    paddingHorizontal: 24,
    marginBottom: -100
  } as ViewStyle,
  circuloView: {
    marginTop: -150,
    backgroundColor: 'lightblue',
    borderRadius: 600,
    width: 600,
    height: 600,
    marginBottom: -300,


    alignItems: 'center',
    // alignSelf:'center',
    paddingHorizontal: 24,
  } as ViewStyle,
}