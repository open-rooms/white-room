import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../components/Button';
import {generateKeys} from '../nostr/utils/generateKeys';
import {useStorage} from '../utils/useStorage';
import {copyToClipboard} from '../utils/copyToClipboard';
import {PRIMARY_COLOR} from '../utils/colors';
import {publicKeyText, privateKeyText} from '../texts/registerText';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function CreateAccount() {
  const {connectAccount} = useStorage();
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [damus, setDamus] = useState('');
  const navigation = useNavigation<any>();
  const [prvKey, setPrvKey] = React.useState(
    'nsec15558b158124e5da8dd850c10533aa984aae38eb612a2bad225a8ccc896a34dc2',
  );
  const [pubKey, setPubKey] = React.useState(
    'npub1291f8dd2fa4f568eec41f6f202a75cd12394e8edfd66a3b2524c1d9f478bddd2',
  );
  const [privateKeyCopied, setPrivateKeyCopied] = React.useState(false);
  const [publicKeyCopied, setPublicKeyCopied] = React.useState(false);
  const accountPrivateKey = `nsec1${prvKey}`;
  const accountPublicKey = `npub1${pubKey}`;
  const publicKeyTitle = 'Public Key';
  const privateKeyTitle = 'Private Key';

  React.useEffect(() => {
    const {publicKey, privateKey} = generateKeys();
    setPrvKey(privateKey);
    setPubKey(publicKey);
  }, []);

  const copyPublicKeytoClipboard = async () => {
    copyToClipboard(accountPublicKey).then(status =>
      setPublicKeyCopied(status),
    );
  };

  const copyPrivateKeytoClipboard = async () => {
    copyToClipboard(accountPrivateKey).then(status =>
      setPrivateKeyCopied(status),
    );
  };

  const onContinuePress = async () => {
    if (privateKeyCopied && publicKeyCopied) {
      connectAccount(pubKey, prvKey).then(() => {
        navigation.navigate('Rooms');
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleInput}> Username </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <Text style={styles.titleInput}> Profile Pic </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Profile Pic URL"
        onChangeText={text => setProfilePic(text)}
        value={profilePic}
      />
      <Text style={styles.titleInput}> Damus Account </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Damus account"
        onChangeText={text => setDamus(text)}
        value={damus}
      />
      <Text style={styles.title}> {publicKeyTitle} </Text>
      <Text style={styles.text}> {publicKeyText} </Text>
      <TouchableOpacity
        onPress={() => {
          copyToClipboard(accountPublicKey);
          setPublicKeyCopied(true);
        }}>
        <Text style={styles.text}>
          {' '}
          {accountPublicKey} <Icon name="content-copy" size={20} color="grey" />{' '}
        </Text>
      </TouchableOpacity>

      <Button
        title={publicKeyCopied ? 'Done' : 'Copy Public Key'}
        onPress={copyPublicKeytoClipboard}
        buttonColor={publicKeyCopied ? 'white' : PRIMARY_COLOR}
        titleColor={publicKeyCopied ? PRIMARY_COLOR : 'white'}
        buttonStyle={styles.button}
      />
      {publicKeyCopied && (
        <>
          <Text style={styles.title}> {privateKeyTitle} </Text>
          <Text style={styles.text}> {privateKeyText} </Text>

          <TouchableOpacity
            onPress={() => {
              copyToClipboard(accountPrivateKey);
              setPrivateKeyCopied(true);
            }}>
            <Text style={styles.text}>
              {' '}
              {accountPrivateKey}{' '}
              <Icon name="content-copy" size={20} color="grey" />{' '}
            </Text>
          </TouchableOpacity>

          <Button
            title={privateKeyCopied ? 'Done' : 'Copy Private Key'}
            onPress={copyPrivateKeytoClipboard}
            buttonColor={privateKeyCopied ? 'white' : PRIMARY_COLOR}
            titleColor={privateKeyCopied ? PRIMARY_COLOR : 'white'}
            buttonStyle={styles.button}
          />
        </>
      )}
      {privateKeyCopied && publicKeyCopied && (
        <Button
          title="Continue"
          onPress={onContinuePress}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.button}
        />
      )}
    </View>
  );
}

export default CreateAccount;