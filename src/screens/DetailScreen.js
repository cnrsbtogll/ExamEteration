import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Block, Text} from '../components/AppTheme';
import colors from '../config/colors';
import simpsons from '../api/simpsons';
import useApi from '../hooks/useApi';
import AppImage from '../components/AppImage';

const DetailScreen = ({route}) => {
  const getSimpsonDetailsApi = useApi(simpsons.getSimpsonsDetails);
  const [simpsonDetails, setSimpsonDetails] = useState(null);

  const getSimpsonDetails = async () => {
    const result = await getSimpsonDetailsApi.request(route?.params?.id);

    if (result.ok) {
      setSimpsonDetails(result.data);
    } else {
    }
  };
  useEffect(() => {
    getSimpsonDetails();
  }, []);

  return (
    <Block scroll showsVerticalScrollIndicator={false} style={styles.container}>
      <Block shadow>
        <AppImage style={styles.headerImage} url={simpsonDetails?.avatar} />
      </Block>
      <Block>
        <Block padding={[8, 16, 16, 16]}>
          <Block marginBottom={16}>
            <Text size={20} bold center medium marginBottom>
              {simpsonDetails?.name}
            </Text>
            <Block row center marginBottom={20}>
              <Block center>
                <Text gray>{simpsonDetails?.job}</Text>
              </Block>
            </Block>
            <Text marginBottom medium color={colors.hotelCardGrey}>
              {simpsonDetails?.about}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackGrey,
  },
  headerImage: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.35,
  },
});
