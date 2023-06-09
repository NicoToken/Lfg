import { ComponentWithChildrenProps } from 'lib/shared/props';
import { ReactNode } from 'react';
import { VStack } from '../Stack';
import { Text } from '../Text';

interface Props extends ComponentWithChildrenProps {
  title: ReactNode;
}

export const TitledSection = ({ title, children }: Props) => (
  <VStack gap={32}>
    <Text as="div" size={20} weight="bold">
      {title}
    </Text>
    {children}
  </VStack>
);
