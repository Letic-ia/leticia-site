import React, {type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import OriginalSearchBar from '@theme-original/SearchBar';
import type SearchBarType from '@theme/SearchBar';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof SearchBarType>;

// The vitrine (homepage) is a one-page marketing pitch, not documentation:
// keep the search box (and its Ctrl+K shortcut) scoped to /docs/* only.
export default function SearchBarWrapper(props: Props): ReactNode {
  const {pathname} = useLocation();
  if (pathname === '/') {
    return null;
  }
  return <OriginalSearchBar {...props} />;
}
