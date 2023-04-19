import { removeByIndex, updateAtIndex } from '@terra-money/apps/utils';
import { WasmMsgInput } from 'components/wasm-msg-input';
import { useMemo, useState } from 'react';
import { ProposalForm } from '../shared/ProposalForm';
import { toExecuteMsg } from './helpers/toExecuteMsg';
import { validateWasmMsg } from './helpers/validateWasmMsg';
import styles from './ExecuteMessageProposalForm.module.sass';
import { AddButton } from 'components/add-button';
import { DeleteIconButton } from 'components/delete-icon-button';
import { useQuery } from 'react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { MsgExecuteContract } from '@terra-money/terra.js';

export const ExecuteMessageProposalForm = () => {
  const [messages, setMessages] = useState<string[]>(['']);
  const { address } = useCurrentDao()

  const messagesErrors = useMemo(() => messages.map(validateWasmMsg), [messages]);
  const areMessagesValid = useMemo(() => messagesErrors.every((e) => !e), [messagesErrors]);

  const client = useLCDClient();

  const errors = useQuery(['executeMessageErrors', messages], () => {
    return Promise.all(messages.map(async message => {
      const error = validateWasmMsg(message);
      if (error) {
        return error
      }

      console.log(JSON.parse(message))

      const transaction = await client.tx.create([{ address }], {
        msgs: [JSON.parse(message)]
      });

      console.log(transaction)

      return undefined
    }))
  })

  const submitDisabled = !areMessagesValid;

  return (
    <ProposalForm
      disabled={submitDisabled}
      getProposalActions={() => [{ execute_msgs: { msgs: messages.map(toExecuteMsg), action_type: 'execute' } }]}
    >
      <div className={styles.root}>
        {messages.map((message, index) => (
          <div className={styles.section}>
            <WasmMsgInput
              label="Custom message"
              error={messagesErrors[index]}
              valid
              placeholder="Type your message here"
              value={message}
              onChange={(value) => setMessages(updateAtIndex(messages, index, value || ''))}
            />
            <DeleteIconButton className={styles.button} onClick={() => setMessages(removeByIndex(messages, index))} />
          </div>
        ))}
        {areMessagesValid && <AddButton onClick={() => setMessages([...messages, ''])} />}
      </div>
    </ProposalForm>
  );
};
