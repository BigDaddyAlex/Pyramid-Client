import { Badge, Button, Card, Collection, Divider, Flex, Heading, View } from '@aws-amplify/ui-react';

export default (props)=> {
    return <Card className='d-flex flex-column'
            key={props.index}
            borderRadius="medium"
            maxWidth="20rem"
            variation="outlined"
          >
            <h5>{props.item.pubilcName}</h5>
            <View padding="xs" className='d-flex flex-column'>
              <Flex >
                {props.item.tags.map((badge) => (
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
              <Heading padding="medium">{props.item.description}</Heading>
              <Button className="align-self-end" variation="primary"  isFullWidth>
                Try it
              </Button>
            </View>
          </Card>
}