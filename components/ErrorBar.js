import React, { PropTypes } from 'react';
import { Segment, Text, Icon, Button } from 'native-base';
import { ERROR_MESSAGE } from '../utils/constants';

export default function Errorbar({ close }) {
  return (
    <Segment style={{ height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b51d22', opacity: 0.7 }}>
      <Text style={{ color: 'white', backgroundColor: 'transparent' }}>{ERROR_MESSAGE}</Text>
      <Button onPress={() => close()} style={{ position: 'absolute', right: 5, borderWidth: 0 }}>
        <Icon name="cross" android="md-close" style={{ fontSize: 32, color: 'white' }} />
      </Button>
    </Segment>
  );
}

Errorbar.propTypes = {
  close: PropTypes.func.isRequired,
};
