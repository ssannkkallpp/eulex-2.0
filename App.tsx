import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { LanguageProvider } from './src/contexts/LanguageContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { SpeechProvider } from './src/contexts/SpeechContext';

import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import StorySelectionScreen from './src/screens/StorySelectionScreen';
import ReadingScreen from './src/screens/ReadingScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HelpScreen from './src/screens/HelpScreen';

const Stack = createStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <SettingsProvider>
          <SpeechProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="LanguageSelection"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#3b82f6',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontFamily: 'Lato-Bold',
                    fontSize: 18,
                  },
                }}
              >
                <Stack.Screen 
                  name="LanguageSelection" 
                  component={LanguageSelectionScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="StorySelection" 
                  component={StorySelectionScreen}
                  options={{ 
                    title: 'EULEX',
                    headerLeft: null,
                    gestureEnabled: false
                  }}
                />
                <Stack.Screen 
                  name="Reading" 
                  component={ReadingScreen}
                  options={({ route }) => ({ 
                    title: route.params?.story?.title || 'Reading',
                    headerBackTitle: 'Stories'
                  })}
                />
                <Stack.Screen 
                  name="Settings" 
                  component={SettingsScreen}
                  options={{ 
                    title: 'Settings',
                    presentation: 'modal'
                  }}
                />
                <Stack.Screen 
                  name="Help" 
                  component={HelpScreen}
                  options={{ 
                    title: 'Help',
                    presentation: 'modal'
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
          </SpeechProvider>
        </SettingsProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}