import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Block, Text, Icon} from '../AppTheme';
import colors from '../../config/colors';
import {IconTypes} from '../AppTheme/Icon';
import AppImage from '../../components/AppImage';

const HomeListItem = ({onPress, avatar, name, onPressIcon}) => {
  return (
    <Block flex={0} row center space={'between'}>
      <TouchableOpacity onPress={onPress}>
        <Block flex={0} padding={2}>
          <Block row center space={'between'}>
            <AppImage url={avatar} style={styles.avatar} />
            <Text
              size={16}
              color={colors.black}
              style={{position: 'absolute', left: 80}}>
              {name}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
      <Block>
        <TouchableOpacity onPress={onPressIcon}>
          <Icon
            name="delete"
            size={24}
            color={colors.black}
            type={IconTypes.antdesign}
            style={{position: 'absolute', right: 10}}
          />
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default HomeListItem;

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 60,
  },
});
