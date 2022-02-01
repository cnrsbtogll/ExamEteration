import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Alert} from 'react-native';
import {Block, Text} from '../components/AppTheme';
import HomeListItem from '../components/Home/HomeListItem';
import FloatingBtn from '../components/FloatingBtn';
import colors from '../config/colors';
import routes from '../navigation/routes';
import simpsons from '../api/simpsons';
import useApi from '../hooks/useApi';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({navigation}) => {
  const [simpsonsList, setSimpsonsList] = useState([]);
  const getSimpsonsListApi = useApi(simpsons.getSimpsons);

  const getSimpsonsList = async q => {
    const result = await getSimpsonsListApi.request({
      ...q,
    });

    if (result.ok) {
      setSimpsonsList(result.data);
      saveData(result.data);
    } else {
      Alert('Tekrar deneyiniz.');
    }
  };

  const saveData = async newData => {
    try {
      await AsyncStorage.setItem('@simpsons', JSON.stringify(newData));
      alert('Data successfully transferred to the storage');
    } catch (e) {
      alert('Failed to transfer the data to the storage');
    }
  };
  const readData = async () => {
    try {
      const simpsons = await AsyncStorage.getItem('@simpsons');
      if (simpsons !== null) {
        setSimpsonsList(JSON.parse(simpsons));
      } else {
        getSimpsonsList();
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  const removeData = async(id) => {
    try{
        let usersJSON= await AsyncStorage.getItem('@simpsons');
        let usersArray = JSON.parse(usersJSON);
        var alteredUsers = usersArray.filter(function(e){
            return e.id !== id
        })
        AsyncStorage.setItem('@simpsons', JSON.stringify(alteredUsers));
        setSimpsonsList(alteredUsers)
    }
    catch(error){
        console.log(error)
    }
};

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      readData();
    });
    return unsubscribe;
  }, []);

  const renderItem = ({item}) => {
    return (
      <HomeListItem
        name={item.name}
        avatar={item.avatar}
        onPress={() => {
          navigation.navigate(routes.DETAIL_SCREEN, {id: item.id});
        }}
        onPressIcon={() => {
          removeData(item.id);
        }}
        marginBottom={20}
      />
    );
  };
  return (
    <Block white>
      <Block>
        <FlatList
          data={simpsonsList}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.index}
          ListFooterComponent={() => {
            return (
              <Block>
                {getSimpsonsListApi.loading ? (
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{marginLeft: 6}}
                  />
                ) : null}
              </Block>
            );
          }}
          ListEmptyComponent={() =>
            !getSimpsonsListApi.loading ? (
              <Block center>
                <Text bold marginTop>
                  "Sonuç Bulunamadı"
                </Text>
              </Block>
            ) : null
          }
        />
      </Block>
      <FloatingBtn onPress={() => navigation.navigate(routes.ADD_SCREEN)} />
    </Block>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  totalText: {alignSelf: 'flex-end'},
});
