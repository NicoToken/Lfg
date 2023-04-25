import { HStack } from "lib/ui/Stack";
import { Text } from "lib/ui/Text";
import { toCosmosMsg } from "./helpers/toCosmosMsg";
import { ExecuteMessageFee } from "./ExecuteMessageFee";
import { useCurrentDao } from "dao/components/CurrentDaoProvider";

interface Props {
  value: string
}

export const ExecuteMessageInfo = ({ value }: Props) => {
  // const address = useAssertMyAddress()
  const { address } = useCurrentDao()

  let msg = undefined
  let err = undefined
  try {
    msg = toCosmosMsg({
      sender: address,
      msg: value
    })
  } catch {
    err = 'Invalid message'
  }

  return (
    <Text color="supporting" as="div" size={14}>
      <HStack alignItems="center" gap={4}>
        <Text>Fee:</Text>
        {err && <Text color="alert">invalid message</Text>}
        {msg && <ExecuteMessageFee msg={msg} />}
      </HStack>
    </Text>
  );
}