import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Text, Button, Card, CardItem } from 'native-base';

export default class ArticleList extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ArticleList</Title>
          </Body>
          <Right />
        </Header>
        <Card>
          <CardItem>
            <Text>Article AAA</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Text>Article BBB</Text>
          </CardItem>
        </Card>
      </Container>
    );
  }
}
