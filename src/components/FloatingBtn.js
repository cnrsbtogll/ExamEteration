import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {Block} from './AppTheme/index';
import colors from '../config/colors';
import {IconTypes, Icon} from './AppTheme/Icon';

const FloatingBtn = ({onPress}) => {
  return (
    <Block style={styles.mapBtn} color={colors.transparent}>
      <TouchableHighlight onPress={onPress} underlayColor="none">
        <Block
          color={colors.blue}
          row
          center
          padding={[16, 16, 16, 16]}
          radius={50}
          shadow>
          <Icon
            name={'plus'}
            type={IconTypes.entypo}
            size={50}
            color={'white'}
          />
        </Block>
      </TouchableHighlight>
    </Block>
  );
};

export default FloatingBtn;

const styles = StyleSheet.create({
  mapBtn: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 32,
  },
});
