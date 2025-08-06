import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Tag, FileText } from 'lucide-react-native';
import { router } from 'expo-router';

const categories = [
  { id: 1, name: 'Personal', color: '#F87171' },
  { id: 2, name: 'Work', color: '#60A5FA' },
  { id: 3, name: 'Shopping', color: '#34D399' },
];

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [reminder, setReminder] = useState('Set Reminder');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    Alert.alert('Success', 'Task created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <LinearGradient
      colors={['#E879F9', '#A855F7', '#7C3AED']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add task</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title"
              placeholderTextColor="#94A3B8"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter description"
              placeholderTextColor="#94A3B8"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryList}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryChip,
                      { 
                        backgroundColor: selectedCategory.id === category.id 
                          ? category.color 
                          : '#F1F5F9' 
                      }
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Tag 
                      size={16} 
                      color={selectedCategory.id === category.id ? '#FFFFFF' : '#64748B'} 
                      strokeWidth={2} 
                    />
                    <Text 
                      style={[
                        styles.categoryChipText,
                        { 
                          color: selectedCategory.id === category.id 
                            ? '#FFFFFF' 
                            : '#64748B' 
                        }
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Calendar size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.selectButtonText}>{selectedDate}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reminder</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Clock size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.selectButtonText}>{reminder}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Make notes in important task here..."
              placeholderTextColor="#94A3B8"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  cancelText: {
    fontSize: 16,
    color: '#F3E8FF',
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryList: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  selectButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  saveButton: {
    backgroundColor: '#E879F9',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.5,
  },
});