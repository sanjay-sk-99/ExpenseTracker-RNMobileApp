import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ProfilePhotoSelector = ({ profileImage, setProfileImage }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      selectionLimit: 1,
    };

    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Error', result.errorMessage || 'Failed to pick image');
      } else if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setProfileImage(selectedImage);
        setPreviewUrl(selectedImage.uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setPreviewUrl(null);
  };

  return (
    <View style={styles.container}>
      {!profileImage ? (
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Icon name="user" size={40} color="#6875F5" />
          </View>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImageChange}
          >
            <Icon name="upload" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.avatarContainer}>
          <Image source={{ uri: previewUrl }} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleRemoveImage}
          >
            <Icon name="trash-2" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarCircle: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: '#DCD7FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius:moderateScale(50),
  },
  uploadButton: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6875F5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButton: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F05252',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ProfilePhotoSelector;
