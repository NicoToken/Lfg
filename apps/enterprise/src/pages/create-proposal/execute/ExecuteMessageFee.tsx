import { formatAmount } from '@terra-money/apps/libs/formatting';
import { Msg } from '@terra-money/terra.js';
import { useEstimatedFeeQuery } from 'chain/hooks/useEstimatedFee';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';

interface ExecuteMessageFeeProps {
  msg: Msg
}

export const ExecuteMessageFee = ({ msg }: ExecuteMessageFeeProps) => {
  const { data, isLoading, error } = useEstimatedFeeQuery([msg]);

  if (isLoading) {
    return <Spinner size={14} />
  }

  if (error) {
    return <Text>failed to estimate</Text>
  }

  if (data) {
    return <Text>~{formatAmount(data)} LUNA</Text>
  }

  return null
};
