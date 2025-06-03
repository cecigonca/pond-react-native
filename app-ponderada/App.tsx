import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CadastroScreen from './screens/CadastroScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AddProductScreen from './screens/AddProductScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

// 🎨 Tema personalizado com dourado, preto e branco
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#AF8155',       // Dourado quente
    onPrimary: '#FFFFFF',     // Texto sobre o dourado
    secondary: '#906341',     // Cobre escuro
    background: '#FFFFFF',    // Fundo branco
    surface: '#F5F5F5',       // Cartões / inputs
    onSurface: '#333333',     // Texto sobre superfícies claras
    text: '#000000',          // Texto geral
    error: '#B00020',         // Vermelho padrão para erro
  },
};

export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}