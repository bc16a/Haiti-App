
import  AsyncStorage  from '@react-native-async-storage/async-storage';
export const TOKEN_KEY = "@RocketSeat:token";
export const EMAIL_KEY = "@RocketSeat:email";
export const NAME_KEY = "@RocketSeat:name";
export const ID_KEY = "@RocketSeat:id";
export const ADMIN_KEY = "@RocketSeat:admin";

export const onSignIn = (token: any) => AsyncStorage.setItem(TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const onClean = () => AsyncStorage.clear();

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return (token !== null) ? true : false;
};

export const setEmail = (email: any) => AsyncStorage.setItem(EMAIL_KEY, email);
export const setName = (name: any) => AsyncStorage.setItem(NAME_KEY, name);
export const setId = (id: any) => AsyncStorage.setItem(ID_KEY, id);
export const setStateAdmin = (admin: any) => AsyncStorage.setItem(ADMIN_KEY, admin);

export const getEmail = () => AsyncStorage.getItem(EMAIL_KEY);
export const getName = () => AsyncStorage.getItem(NAME_KEY);
export const getId = () => AsyncStorage.getItem(ID_KEY);
export const getStateAdmin = () => AsyncStorage.getItem(ADMIN_KEY);

