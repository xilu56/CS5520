import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import MapView, { Marker } from "react-native-maps";

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <MapView
      onPress={(e) => {
        setSelectedLocation({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        });
      }}
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={selectedLocation} />
    </MapView>
  );
}

const styles = StyleSheet.create({ map: { flex: 1 } });