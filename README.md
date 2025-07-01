# EULEX iOS - Enhanced Learning Experience

A React Native iOS app designed to help learners improve their reading skills through syllable splitting, text-to-speech, and interactive features.

## 🚀 Features

- **Interactive Story Reading**: Choose from a curated collection of stories with varying difficulty levels
- **Syllable Breakdown**: Algorithm that splits words into syllables for better pronunciation
- **Text-to-Speech**: Built-in speech synthesis with multiple voice options using Expo Speech
- **Multi-language Support**: Interface available in multiple languages
- **Progress Tracking**: Visual progress indicators and word-by-word navigation
- **Native iOS Experience**: Optimized for iOS with native navigation and gestures
- **Offline Capable**: Works without internet connection once installed

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **Speech**: Expo Speech API
- **Storage**: AsyncStorage for settings persistence
- **Styling**: React Native StyleSheet with custom design system
- **State Management**: React Context API
- **Fonts**: Custom Lato font family

## 📦 Installation

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (for development)
- Xcode (for iOS builds)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd eulex-ios
```

2. Install dependencies:
```bash
npm install
```

3. Download and place Lato fonts in `assets/fonts/`:
   - Lato-Regular.ttf
   - Lato-Bold.ttf
   - Lato-Light.ttf

4. Start the development server:
```bash
npm start
```

5. Run on iOS:
```bash
npm run ios
```

## 🏗️ Building for Production

### Development Build
```bash
expo build:ios
```

### Production Build with EAS
```bash
npm install -g @expo/eas-cli
eas build --platform ios
```

### App Store Submission
```bash
eas submit --platform ios
```

## 📱 App Structure

```
src/
├── contexts/          # React Context providers
│   ├── LanguageContext.tsx
│   ├── SettingsContext.tsx
│   └── SpeechContext.tsx
├── screens/           # App screens
│   ├── LanguageSelectionScreen.tsx
│   ├── StorySelectionScreen.tsx
│   ├── ReadingScreen.tsx
│   ├── SettingsScreen.tsx
│   └── HelpScreen.tsx
├── data/             # Static data
│   ├── stories.ts
│   └── translations.ts
├── utils/            # Utility functions
│   └── syllableUtils.ts
└── types/            # TypeScript definitions
    └── index.ts
```

## 🎯 Key Features

### Language Support
- English, Spanish, French, German
- Easy to add more languages
- Persistent language selection

### Reading Interface
- Word-by-word navigation
- Syllable breakdown with pronunciation
- Progress tracking
- Adjustable font sizes and themes

### Speech Synthesis
- Native iOS speech synthesis
- Multiple voice options
- Adjustable speech rate
- Word and sentence playback

### Settings
- Voice selection
- Reading speed control
- Font size adjustment
- Theme selection (Light/Dark/Sepia)
- Auto-play toggle

## 🔧 Configuration

### App Configuration
Edit `app.json` to customize:
- App name and description
- Bundle identifier
- Version numbers
- Permissions
- Icons and splash screens

### Build Configuration
The app uses Expo's managed workflow for easy building and deployment.

## 📋 Requirements

- iOS 11.0+
- iPhone and iPad support
- Landscape and portrait orientations
- VoiceOver accessibility support

## 🚀 Deployment

1. **TestFlight**: Use EAS Build to create builds for TestFlight testing
2. **App Store**: Submit through EAS Submit or manually through App Store Connect
3. **Enterprise**: Configure for enterprise distribution if needed

## 🎨 Design System

The app uses a consistent design system with:
- Custom color palette
- Lato font family
- Consistent spacing (8px grid)
- Accessible contrast ratios
- Native iOS design patterns

## 🔍 Testing

Run tests with:
```bash
npm test
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

Built with ❤️ using React Native and Expo