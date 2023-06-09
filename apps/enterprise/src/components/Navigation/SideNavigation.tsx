import { Logo } from 'components/layout/Logo';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { VStack } from 'lib/ui/Stack';
import { Path } from 'navigation';
import styled from 'styled-components';
import { IconButton, Tooltip } from 'components/primitives';
import { DashboardButton } from 'dao/components/DashboardButton';
import { Favourites } from 'components/layout/Favourites';
import { CreateDaoButton } from 'dao/components/CreateDaoButton';
import { useConnectedWallet } from '@terra-money/use-wallet';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { ReactComponent as ChatIcon } from 'components/assets/Chat.svg';
import { ManageDaosButton } from 'dao/components/ManageDaosButton';
import { SettingsNavigationItem } from 'settings/components/SettingsNavigationItem';

const Container = styled(VStack)`
  padding: 32px;
  padding-bottom: 68px;
  align-items: flex-start;
  border-right: 1px solid ${({ theme }) => theme.colors.foreground.toCssValue()};
`;

export const SideNavigation = () => {
  const connectedWallet = useConnectedWallet();

  return (
    <Container fullHeight justifyContent="space-between">
      <VStack alignItems="center" gap={48}>
        <InternalLink to={Path.Landing}>
        </InternalLink>
        <VStack gap={12}>
            <div>
            </div>
            <div>
            </div>
          <Favourites />
        </VStack>
      </VStack>
      <VStack gap={24} alignItems="center">
          <div>
          </div>
        {connectedWallet && (
            <div>
            </div>
        )}
      </VStack>
    </Container>
  );
};
