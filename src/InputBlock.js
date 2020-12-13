import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Grid, Label, Icon, Button } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';

export default function Main(props) {
    const [status, setStatus] = useState(null);
    const { api } = useSubstrate()
    const [blockInfo, setBlockInfo] = useState()

    const onChange = (_, data) => getInfo(data);

    const getInfo = async (data) => {
        try {
            // returns Hash
            const blockHash = await api.rpc.chain.getBlockHash(data.value);
            // returns SignedBlock
            const signedBlock = await api.rpc.chain.getBlock(blockHash);
            setBlockInfo(signedBlock);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Grid.Column width={8}>
            <h1>Input Block Number</h1>
            <Form>
                <Form.Field>
                    <Label basic color='teal'>
                        <Icon name='hand point right' />
            Block Number
          </Label>
                </Form.Field>
                <Form.Field>Input a block number to get block info</Form.Field>
                <Form.Field>
                    <Input
                        fluid
                        label='Block Number'
                        type='number'
                        onChange={onChange}
                    />
                </Form.Field>
                <Form.Field style={{ textAlign: 'center' }}>
                    <Modal trigger={<Button>Show Block Info</Button>}>
                        <Modal.Header>Latest Block Info</Modal.Header>
                        <Modal.Content scrolling>
                            <Modal.Description>
                                <pre>
                                    <code>{JSON.stringify(blockInfo, null, 2)}</code>
                                </pre>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Form.Field>
                <div style={{ overflowWrap: 'break-word' }}>{status}</div>
            </Form>
        </Grid.Column>
    );
}