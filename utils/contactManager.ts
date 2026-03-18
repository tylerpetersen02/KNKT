import * as Contacts from 'expo-contacts';
import { Alert } from 'react-native';

/**
 * Opens native contact form with name and phone prefilled
 * User can then save to their contacts
 */
export async function addContact(phoneNumber: string, name: string): Promise<void> {
  try {
    // Request permission to access contacts
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to contacts to add this person.');
      return;
    }

    // Open native contact form with prefilled name and phone
    // Try to open directly to create contact form
    try {
      await (Contacts as any).presentFormAsync(
        {
          givenName: name,
          phoneNumbers: [
            {
              number: phoneNumber,
              label: 'mobile',
            },
          ],
        },
        { formType: 'create' } // Try specifying form type directly
      );
    } catch (e) {
      // If that fails, use the standard approach
      await Contacts.presentFormAsync(
        undefined,
        {
          givenName: name,
          phoneNumbers: [
            {
              number: phoneNumber,
              label: 'mobile',
            },
          ],
        }
      );
    }
  } catch (error: any) {
    const errorMsg = error?.message || JSON.stringify(error);
    console.error('Error opening contact form:', errorMsg);
    Alert.alert('Error', `Could not open contact form: ${errorMsg}`);
  }
}
