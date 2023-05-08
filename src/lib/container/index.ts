import { TSymbol } from '../types';

export class Container {
  private static _instance: Container;

  private _deps: Map<any, Record<number, any>> = new Map();

  private _container: any[] = [];

  private constructor() {}

  public static getInstance() {
    if (!this._instance) {
      this._instance = new Container();
    }

    return this._instance;
  }

  public get<T>(symbol: TSymbol<T>): T {
    const Target = this._container.find((item) => item === symbol);
    if (!Target) {
      throw new Error(`target ${symbol} not provided`);
    }

    const deps = this.getDependencies(Target);
    if (!deps || !deps.length) {
      return new Target();
    }

    const children = deps.map((dep) => this.get<T>(dep));

    return new Target(...children);
  }

  public has<T>(target: TSymbol<T>) {
    return this._container.find((item) => item === target);
  }

  public set<T>(target: TSymbol<T>) {
    this._container.push(target);
  }

  public _setDependency<T>(target: TSymbol<T>, dependency: any, index: number) {
    let deps = this._deps.get(target);
    if (!deps) {
      deps = {};
    }

    deps[index] = dependency;
    this._deps.set(target, deps);
  }

  public getDependencies<T>(target: TSymbol<T>) {
    const targetDeps = this._deps.get(target);
    if (!targetDeps) {
      return null;
    }

    const targetDepIndexes = Object.keys(targetDeps)
      .map((i) => parseInt(i))
      .sort();
    return targetDepIndexes.map((idx) => targetDeps[idx]);
  }
}
