import { removeByIndex, updateAtIndex } from '@terra-money/apps/utils';
import { WasmMsgInput } from 'components/wasm-msg-input';
import { useMemo, useState } from 'react';
import { ProposalForm } from '../shared/ProposalForm';
import { toExecuteMsg } from './helpers/toExecuteMsg';
import { validateWasmMsg } from './helpers/validateWasmMsg';
import { AddButton } from 'components/add-button';
import { DeleteIconButton } from 'components/delete-icon-button';
import styled from 'styled-components';
import { HStack, VStack } from 'lib/ui/Stack';
import { ExecuteMessageInfo } from './ExecuteMessageInfo';

const DeleteButton = styled(DeleteIconButton)`
  margin-top: 40px;
`

export const ExecuteMessageProposalForm = () => {
  const [messages, setMessages] = useState<string[]>(['']);

  const messagesErrors = useMemo(() => messages.map(validateWasmMsg), [messages]);
  const areMessagesValid = useMemo(() => messagesErrors.every((e) => !e), [messagesErrors]);


  // const errors = useQuery(['executeMessageErrors', messages], () => {
  //   return Promise.all(messages.map(async message => {
  //     const error = validateWasmMsg(message);
  //     if (error) {
  //       return error
  //     }

  //     console.log(JSON.parse(message))

  //     const transaction = await client.tx.create([{ address }], {
  //       msgs: [JSON.parse(message)]
  //     });

  //     console.log(transaction)

  //     return undefined
  //   }))
  // })

  const submitDisabled = !areMessagesValid;

  return (
    <ProposalForm
      disabled={submitDisabled}
      getProposalActions={() => [{ execute_msgs: { msgs: messages.map(toExecuteMsg), action_type: 'execute' } }]}
    >
      <VStack gap={24}>
        {messages.map((message, index) => (
          <VStack gap={8}>
            <HStack gap={16}>
              <WasmMsgInput
                label="Custom message"
                error={messagesErrors[index]}
                valid
                placeholder="Type your message here"
                value={message}
                onChange={(value) => setMessages(updateAtIndex(messages, index, value || ''))}
              />
              <DeleteButton onClick={() => setMessages(removeByIndex(messages, index))} />
            </HStack>
            {!messagesErrors[index] && (
              <ExecuteMessageInfo value={message} />
            )}
          </VStack>
        ))}
        {areMessagesValid && <AddButton onClick={() => setMessages([...messages, ''])} />}
      </VStack>
    </ProposalForm>
  );
};
