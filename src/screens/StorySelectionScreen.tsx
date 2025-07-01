import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { stories } from '../data/stories';
import { Story } from '../types';

export default function StorySelectionScreen({ navigation }: any) {
  const { getText } = useLanguage();

  const handleStorySelect = (story: Story) => {
    navigation.navigate('Reading', { story });
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10b981';
      case 'intermediate':
        return '#f59e0b';
      case 'advanced':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>📚</Text>
          </View>
          <View>
            <Text style={styles.appName}>EULEX</Text>
            <Text style={styles.tagline}>{getText('reading-assistant')}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={handleHelp}>
            <Text style={styles.headerButtonText}>❓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleSettings}>
            <Text style={styles.headerButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{getText('choose-story')}</Text>
        
        <View style={styles.storiesGrid}>
          {stories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyCard}
              onPress={() => handleStorySelect(story)}
            >
              <View style={styles.storyHeader}>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(story.difficulty) },
                  ]}
                >
                  <Text style={styles.difficultyText}>{story.difficulty}</Text>
                </View>
              </View>
              
              <Text style={styles.storyDescription}>{story.description}</Text>
              
              <View style={styles.storyFooter}>
                <Text style={styles.storyMeta}>
                  {story.wordCount} {getText('words')}
                </Text>
                <Text style={styles.storyMeta}>
                  {getText('est-time').replace('{time}', story.readingTime.toString())}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: '#1f2937',
  },
  tagline: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Lato-Regular',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  headerButtonText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Lato-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  storiesGrid: {
    gap: 16,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  storyTitle: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    textTransform: 'capitalize',
  },
  storyDescription: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Lato-Regular',
    marginBottom: 12,
    lineHeight: 20,
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storyMeta: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Lato-Regular',
  },
});