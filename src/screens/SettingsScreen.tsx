import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useSpeech } from '../contexts/SpeechContext';

export default function SettingsScreen({ navigation }: any) {
  const { getText, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { settings, updateSettings } = useSettings();
  const { availableVoices } = useSpeech();

  const [tempSettings, setTempSettings] = useState(settings);
  const [tempLanguage, setTempLanguage] = useState(currentLanguage);

  const handleSave = async () => {
    await updateSettings(tempSettings);
    if (tempLanguage !== currentLanguage) {
      await changeLanguage(tempLanguage);
    }
    
    Alert.alert(
      getText('settings-saved'),
      '',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setTempLanguage(currentLanguage);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Language Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getText('language')}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tempLanguage}
              onValueChange={setTempLanguage}
              style={styles.picker}
            >
              {availableLanguages.map((lang) => (
                <Picker.Item
                  key={lang.code}
                  label={lang.name}
                  value={lang.code}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Voice Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getText('voice')}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tempSettings.voice}
              onValueChange={(value) => setTempSettings({ ...tempSettings, voice: value })}
              style={styles.picker}
            >
              <Picker.Item label="Default" value="default" />
              {availableVoices.map((voice, index) => (
                <Picker.Item
                  key={index}
                  label={`${voice.name} (${voice.language})`}
                  value={voice.identifier}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Speech Rate Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getText('reading-speed')}: {tempSettings.speechRate.toFixed(1)}x
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{getText('slow')}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
              value={tempSettings.speechRate}
              onValueChange={(value) => setTempSettings({ ...tempSettings, speechRate: value })}
              minimumTrackTintColor="#3b82f6"
              maximumTrackTintColor="#e5e7eb"
              thumbStyle={styles.sliderThumb}
            />
            <Text style={styles.sliderLabel}>{getText('fast')}</Text>
          </View>
        </View>

        {/* Font Size Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getText('font-size')}: {tempSettings.fontSize}px
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{getText('small')}</Text>
            <Slider
              style={styles.slider}
              minimumValue={12}
              maximumValue={32}
              step={2}
              value={tempSettings.fontSize}
              onValueChange={(value) => setTempSettings({ ...tempSettings, fontSize: value })}
              minimumTrackTintColor="#3b82f6"
              maximumTrackTintColor="#e5e7eb"
              thumbStyle={styles.sliderThumb}
            />
            <Text style={styles.sliderLabel}>{getText('large')}</Text>
          </View>
        </View>

        {/* Theme Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getText('theme')}</Text>
          <View style={styles.themeButtons}>
            {['light', 'dark', 'sepia'].map((theme) => (
              <TouchableOpacity
                key={theme}
                style={[
                  styles.themeButton,
                  tempSettings.theme === theme && styles.themeButtonActive,
                  { backgroundColor: getThemeColor(theme) },
                ]}
                onPress={() => setTempSettings({ ...tempSettings, theme: theme as any })}
              >
                <Text
                  style={[
                    styles.themeButtonText,
                    { color: theme === 'light' ? '#1f2937' : '#fff' },
                  ]}
                >
                  {getText(theme)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Auto Play Setting */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => setTempSettings({ ...tempSettings, autoPlay: !tempSettings.autoPlay })}
          >
            <Text style={styles.toggleLabel}>Auto-play words</Text>
            <View style={[styles.toggle, tempSettings.autoPlay && styles.toggleActive]}>
              <View style={[styles.toggleThumb, tempSettings.autoPlay && styles.toggleThumbActive]} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>❌ {getText('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>💾 {getText('save')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const getThemeColor = (theme: string) => {
  switch (theme) {
    case 'light':
      return '#ffffff';
    case 'dark':
      return '#1f2937';
    case 'sepia':
      return '#fefcf0';
    default:
      return '#ffffff';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  picker: {
    height: 50,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 16,
  },
  sliderThumb: {
    backgroundColor: '#3b82f6',
    width: 20,
    height: 20,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Lato-Regular',
  },
  themeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  themeButtonActive: {
    borderColor: '#3b82f6',
  },
  themeButtonText: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#1f2937',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#3b82f6',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6b7280',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
});