import { Container } from '../container';
import { TSymbol } from '../types';

export const Inject =
  <T>(symbol: TSymbol<T>) =>
  (target: any, _key?: string, index?: number) => {
    const injectIndex = index ?? 0;

    const container = Container.getInstance();
    container._setDependency(target, symbol, injectIndex);

    return target;
  };
