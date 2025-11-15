import { StyleSheet, View,ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
  )
}

export default Loader

const styles = StyleSheet.create({})