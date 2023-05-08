import { Container } from '../container';
import { TSymbol } from '../types';

export const Provide =
  () =>
  <T>(target: TSymbol<T>) => {
    const container = Container.getInstance();
    container.set(target);

    return target;
  };
