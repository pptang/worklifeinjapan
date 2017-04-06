import React, { Component } from 'react';
import { Content, Text, List, ListItem } from 'native-base';

export default class SideBar extends Component {
  render() {
    return (
      <Content style={{flex: 1, padding: 10, paddingRight: 0, paddingTop: 30, backgroundColor: '#fff'}}>
        <ListItem button onPress={() => {}}>
          <Text>Home</Text>
        </ListItem>
        <ListItem button onPress={() => {}}>
          <Text>About</Text>
        </ListItem>
      </Content>
    );
  }
}
