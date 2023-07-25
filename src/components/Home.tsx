import React from 'react';

import HomeCard from './cards/HomeCard'
import { Collection, Button, Heading, Card, Image, Flex, View, Badge, Divider } from '@aws-amplify/ui-react';


function Home() {


  const items = [
    {
      title: 'A form that hospitals use to register new patients',
      badges: ['Hospital', 'Verified'],
    },
    {
      title: 'A form insurance companies use to collect data about claims',
      badges: ['Insurance', 'Verified'],
    },
  ];

  return (
    <div>
      <div className=" d-flex justify-content-center">
        <div className=" d-flex align-items-center " style={{ height: "60vh" }}>
          <span className="text-center">
            <div className="row text-white">
              <h3 className='text-white'>Let's eliminate the laborious proccesses involved in the exchange of data</h3>
              <div className='text-white'>- our time is better spent doing more productive work</div>
            </div>
          </span>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className='row'>
        <h5 className='text-white'>Check out some of the most popular templates below</h5>

        <Divider orientation="horizontal" />
        <br />
        
      </div>
    <br />
      <Collection
        items={items}
        type="list"
        direction="row"
        gap="20px"
        wrap="nowrap"
      >
        {(item, index) => (
          <Card
            key={index}
            borderRadius="medium"
            maxWidth="20rem"
            variation="outlined"
          >
            <h5>Patient Intake</h5>
            <View padding="xs">
              <Flex>
                {item.badges.map((badge) => (
                  <Badge
                    key={badge}
                    backgroundColor={
                      badge === 'Waterfront' ? 'blue.40'
                        : badge === 'Mountain' ? 'green.40' : 'yellow.40'}
                  >
                    {badge}
                  </Badge>
                ))}
              </Flex>
              <Divider padding="xs" />
              <Heading padding="medium">{item.title}</Heading>
              <Button variation="primary" isFullWidth>
                Try it
              </Button>
            </View>
          </Card>
        )}
      </Collection>
    </div>


  );
}

export default Home;
