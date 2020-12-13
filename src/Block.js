import React, { useEffect, useState } from 'react';
import { Grid, Modal, Button, Card } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';
export default function Main(props) {
  const { api } = useSubstrate()
  const [blockInfo, setBlockInfo] = useState()

  useEffect(() => {
    const unsubscribeAll = null
    const getInfo = async () => {
      try {
        api.rpc.chain.subscribeNewHeads((header) => {
          setBlockInfo(header)
        })
      } catch (e) {
        console.error(e)
      }
    }
    getInfo()
    return () => unsubscribeAll && unsubscribeAll()
  }, []);

  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>Latest Block Info</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Modal trigger={<Button>Show Latest Block Info</Button>}>
            <Modal.Header>Latest Block Info</Modal.Header>
            <Modal.Content scrolling>
              <Modal.Description>
                <pre>
                  <code>{JSON.stringify(blockInfo, null, 2)}</code>
                </pre>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
