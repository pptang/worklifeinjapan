import React, { PropTypes } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button } from 'native-base';


export default function Navbar({ navigation, title, goBack }) {
  return (
    <Header style={{ backgroundColor: '#fff', width: '100%', position: 'relative' }}>
      <Left>
        {
          goBack ?
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: '#b51d22' }} />
            </Button>
            :
            <Button androidRippleColor="red" transparent onPress={() => navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={{ color: '#b51d22' }} />
            </Button>
        }
      </Left>
      <Body style={{ position: 'absolute', left: '15%', width: '70%' }}>
        <Title style={{ color: '#b51d22', width: '100%', justifyContent: 'center', alignItems: 'center' }}>{title}</Title>
      </Body>
      <Right style={{ width: '15%', position: 'absolute', right: 15 }} >
        <Button transparent>
          <Icon name="search" style={{ color: '#b51d22' }} />
        </Button>
      </Right>
    </Header>
  );
}

Navbar.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
  goBack: PropTypes.bool.isRequired,
};

Navbar.defaultProps = {
  title: 'Work Life in Japan',
};
