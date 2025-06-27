# EULEX 2.0 - Enhanced Learning Experience

A modern, React-based reading assistance tool designed to help learners improve their reading skills through syllable splitting, text-to-speech, and interactive features.

## 🚀 Features

- **Interactive Story Reading**: Choose from a curated collection of stories with varying difficulty levels
- **Syllable Breakdown**: Advanced algorithm that splits words into syllables for better pronunciation
- **Text-to-Speech**: Built-in speech synthesis with multiple voice options
- **Multi-language Support**: Interface available in multiple languages
- **Progress Tracking**: Visual progress indicators and word-by-word navigation
- **Accessibility**: Keyboard navigation, screen reader support, and high contrast modes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds
- **Speech Synthesis**: Web Speech API
- **State Management**: React Hooks
- **Internationalization**: Custom i18n system

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eulex-2.0
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎯 Usage

### Getting Started
1. Select your preferred language when the app loads
2. Choose a story from the selection panel
3. Use the navigation controls to move through words
4. Click on syllables to hear individual pronunciations
5. Use the audio controls to hear words or sentences

### Keyboard Shortcuts
- **Space/Right Arrow**: Next word
- **Left Arrow**: Previous word
- **P**: Play current word
- **S**: Play current sentence

### Features
- **Story Selection**: Browse stories by difficulty level (beginner, intermediate, advanced)
- **Syllable Display**: Each word is automatically split into clickable syllables
- **Progress Tracking**: Visual progress bar shows reading completion
- **Settings**: Customize voice, font size, and theme preferences
- **Multi-language**: Switch between different interface languages

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── StorySelection.tsx
│   ├── ReadingInterface.tsx
│   ├── LanguageModal.tsx
│   ├── SettingsModal.tsx
│   ├── HelpModal.tsx
│   └── CompletionModal.tsx
├── hooks/              # Custom React hooks
│   ├── useLanguage.ts
│   ├── useSettings.ts
│   └── useSpeechSynthesis.ts
├── data/               # Static data
│   ├── stories.ts
│   └── translations.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── syllableUtils.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Adding New Stories
Edit `src/data/stories.ts` to add new stories:

```typescript
{
    id: 'unique-id',
    title: 'Story Title',
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    description: 'Story description',
    wordCount: 100,
    readingTime: 3,
    content: 'Story content here...'
}
```

### Adding New Languages
Edit `src/data/translations.ts` to add new language support:

```typescript
fr: {
    "welcome": "Bienvenue sur EULEX",
    "select-language": "Veuillez sélectionner votre langue préférée",
    // ... more translations
}
```

### Customizing Styles
The app uses Tailwind CSS with custom CSS variables. Modify `src/index.css` to customize:
- Color schemes
- Typography
- Animations
- Theme variables

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Static Hosting
The built files in the `dist/` directory can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🌟 Features in Detail

### Syllable Algorithm
The app uses an advanced syllable splitting algorithm that considers:
- Vowel-consonant patterns
- Common letter combinations
- Language-specific rules
- Pronunciation guidelines

### Speech Synthesis
- Multiple voice options
- Adjustable speech rate
- Word and sentence playback
- Syllable-level pronunciation

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Reduced motion support
- Focus management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Web Speech API for text-to-speech functionality
- Tailwind CSS for the styling framework
- React team for the amazing framework
- The open-source community for inspiration and tools

---

**EULEX 2.0** - Making reading accessible and enjoyable for everyone! 📚✨
