import { FunctionalComponent as FC } from '@stencil/core';

export interface BreakViewProps {
  breakLabel: string;
  breakClassName: string;
}

export const BreakView: FC<BreakViewProps> = ({
  breakLabel,
  breakClassName
}) => {
  return (
    <li class={breakClassName}>
      <a>
        {breakLabel}
      </a>
    </li>
  );
}
