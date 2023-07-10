import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createAccountStyles as styles} from './createAccountStyles';
import {handleUsernameChange as handleUsernameChangeUtil} from '../../utils/usernameHandlers';
import {useDispatch} from 'react-redux';
import {createAccount} from '../../redux/user-slice';
import useNostr from '../../nostr/useNostr';

function FormGroup({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  inputStyle = {},
}: any) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.usernameContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
        {icon}
      </View>
    </View>
  );
}

export function CreateAccount() {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [hasValidUsername, setHasValidUsername] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [usernameStatus, setUsernameStatus] = useState('');
  const [imgUri, setImgUri] = useState('');
  const [damus, setDamus] = useState('');
  const {createUser} = useNostr();

  const dispatch = useDispatch();

  const onContinuePress = useCallback(async () => {
    if (!hasValidUsername) {
      Alert.alert('Username has to be longer than 4 characters');
      return;
    }
    const newAccountData = {username, imgUri, damus};
    const kind = 1;
    const fields = newAccountData;
    const tags: string[][] = []; // specify the tags???
    try {
      await createUser(kind, fields, tags);
      dispatch(createAccount(newAccountData));
      navigation.navigate('GenerateKeys', newAccountData);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  }, [
    hasValidUsername,
    username,
    imgUri,
    damus,
    navigation,
    dispatch,
    createUser,
  ]);

  const handleUsernameChange = useCallback(
    (text: string) => {
      handleUsernameChangeUtil(
        text,
        setUsername,
        setHasValidUsername,
        setUsernameStatus,
        setTypingTimeout,
        typingTimeout,
      );
    },
    [typingTimeout],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <FormGroup
        label="Username"
        placeholder="@username"
        value={username}
        onChangeText={handleUsernameChange}
        icon={
          usernameStatus === 'usernameTooShort' ? (
            <Icon name="error" style={styles.errorIcon} />
          ) : usernameStatus === 'valid' ? (
            <Icon name="done" style={styles.doneIcon} />
          ) : null
        }
        inputStyle={styles.usernameInput}
      />
      <FormGroup
        label="Profile Image URL"
        placeholder="Profile Image URL"
        value={imgUri}
        onChangeText={setImgUri}
      />
      <FormGroup
        label="Damus"
        placeholder="Damus"
        value={damus}
        onChangeText={setDamus}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={onContinuePress}>
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateAccount;
