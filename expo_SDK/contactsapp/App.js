import { StyleSheet, Text, View, Button } from "react-native";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";
import React, { useState } from "react";

export default function App() {
  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContact(data[0]);
      }
    }
  };

  const sendSms = async () => {
    const isSMSAvailable = await SMS.isAvailableAsync();
    if (isSMSAvailable && contact.phoneNumbers.length > 0) {
      const { result } = await SMS.sendSMSAsync(
        [contact.phoneNumbers[0].number],
        "Hello " + contact.name
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text>{contact.name}</Text>
      <Button title="Get contact" onPress={getContacts} />
      <Button title="Send SMS" onPress={sendSms} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
