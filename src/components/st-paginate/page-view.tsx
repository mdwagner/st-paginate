import { FunctionalComponent as FC } from '@stencil/core';

export interface PageViewProps {
  onClick: (event?: any) => void;
  selected: boolean;
  pageClassName?: string;
  pageLinkClassName?: string;
  activeClassName?: string;
  extraAriaContext?: string;
  page: number;
}

export const PageView: FC<PageViewProps> = ({
  onClick = () => undefined,
  selected,
  pageClassName,
  pageLinkClassName,
  activeClassName,
  extraAriaContext,
  page
}) => {
  let cssClassName = pageClassName;
  let ariaLabel = `Page ${page}${extraAriaContext ? ' ' + extraAriaContext : ''}`;
  let ariaCurrent = null;

  if (selected) {
    ariaCurrent = 'page';
    ariaLabel = `Page ${page} is your current page`;
    if (typeof cssClassName !== 'undefined') {
      cssClassName += ` ${activeClassName}`;
    } else {
      cssClassName = activeClassName;
    }
  }

  return (
    <li class={cssClassName}>
      <a onClick={onClick}
        class={pageLinkClassName}
        tabIndex={0}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onKeyPress={onClick}>
        {page}
      </a>
    </li>
  );
}
