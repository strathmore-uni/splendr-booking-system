import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Config from "./config";

const ProfileScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch user ID from AsyncStorage
        const userID = await AsyncStorage.getItem('userID');

        // Fetch user details based on user ID
        const response = await fetch(`${Config.API_URL}/api/user-details/${userID}`);
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userDetails) {
    return (
      <View style={styles.centered}>
        <Text>No user details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Details</Text>

      <TouchableOpacity style={styles.imageContainer}>
        {userDetails.profileImage ? (
          <Image source={{ uri: userDetails.profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.noImageText}>No Image Available</Text>
        )}
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{`${userDetails.firstName} ${userDetails.lastName}`}</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.text}>{userDetails.phone}</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{userDetails.email}</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.text}>{userDetails.gender}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#e8ecf4",
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  noImageText: {
    fontSize: 16,
    color: '#666',
  },
  profileSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#075eec',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#075eec',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProfileScreen;
