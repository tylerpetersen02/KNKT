import React, { ComponentType } from 'react';
import PageWrapper from '../components/PageWrapper';

/**
 * HOC that wraps any screen component with PageWrapper.
 * Automatically provides safe area and keyboard handling to every screen.
 *
 * Usage:
 * ```tsx
 * <Tab.Screen name="Home" component={withPageWrapper(HomeScreen)} />
 * ```
 *
 * Now any new screen added automatically gets PageWrapper without manual wrapping.
 */
export function withPageWrapper<P extends object>(
  Component: ComponentType<P>
): React.FC<P> {
  return (props: P) => (
    <PageWrapper>
      <Component {...props} />
    </PageWrapper>
  );
}
