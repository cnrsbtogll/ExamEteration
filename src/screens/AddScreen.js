import React, {useState, useEffect} from 'react';
import {Block, Text, Input} from '../components/AppTheme';
import AppButton from '../components/AppButton';
import AsyncStorage from '@react-native-community/async-storage';
import routes from '../navigation/routes';

const AddScreen = ({navigation, route}) => {
  const [id, setId] = useState('');
  const [name_surname, setNameSurname] = useState('');
  const [job, setJob] = useState('');
  const [about, setAbout] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    GenerateRandomNumber();
  }, []);
  const GenerateRandomNumber = () => {
    var RandomNumber = Math.floor(Math.random() * 100) + 1;
    setId(RandomNumber.toString());
  };

  const addData = async (id, name_surname, link, job, about) => {
    var newSimpson = {
      id: id,
      name: name_surname,
      avatar: link,
      job: job,
      about: about,
    };
    try {
      await AsyncStorage.getItem('@simpsons').then(simpsons => {
        const newData = JSON.parse(simpsons);
        newData.push(newSimpson) 
        AsyncStorage.setItem('@simpsons', JSON.stringify(newData));
      });
      alert('Data successfully saved');
      navigation.goBack();
    } catch (e) {
      alert('Failed to save the data to the storage'+ e);
    }
  };

  const handlePress = () => {
    addData(id, name_surname, link, job, about);    
  };

  return (
    <Block margin>
      <Text margin>Name Surname:</Text>
      <Input marginTop onChangeText={value => setNameSurname(value)} />
      <Text margin>Job Title:</Text>
      <Input marginTop onChangeText={value => setJob(value)} />
      <Text margin>Abaout Him/Her:</Text>
      <Input multiline marginTop onChangeText={value => setAbout(value)} />
      <Text margin>Image Link:</Text>
      <Input marginTop onChangeText={value => setLink(value)} />
      <AppButton
        marginTop
        title={'Add Character'}
        onPress={() => {
          handlePress();
        }}
      />
    </Block>
  );
};
export default AddScreen;
