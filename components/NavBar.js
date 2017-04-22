import React, { PropTypes } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button } from 'native-base';

export default function Navbar({ navigation, title, goBack }) {
  return (
    <Header style={{ backgroundColor: '#fff' }}>
      <Left>
        {
          goBack ?
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: '#b51d22' }} />
            </Button>
            :
            <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={{ color: '#b51d22' }} />
            </Button>
        }
      </Left>
      <Body>
        <Title style={{ color: '#b51d22' }}>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
}

Navbar.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

