import { Theme } from '../types/system-props';
import { CSSProperties } from '../types/css';

export type Props = {
  theme?: Theme;
  [x: string]: any;
};

export interface SystemConfig {
  (value: string | number, scale: string, props: Props, cache?: Cache): {};
  scale?: 'string';
  defaultScale?: unknown;
}

export interface Get {
  (obj?: any, path?: any, fallback?: any): any;
}

export interface StyleFunction {
  (propertyConfig: PropertyConfig): SystemConfig;
}

export interface Transform {
  ({
    path,
    object,
    props,
    strict,
    get,
  }: {
    path?: any;
    object?: any;
    props?: Props;
    strict?: boolean;
    get: Get;
  }): any;
}

export type MaybeCSSProperty = keyof CSSProperties | (string & {});

export type PropertyConfig = {
  properties?: Array<MaybeCSSProperty>;
  property?: MaybeCSSProperty;
  scale?: string;
  defaultScale?: Array<string | number>;
  transform?: Transform;
  tokenPrefix?: 'prefix' | 'noprefix' | 'all';
};

export interface PropConfigCollection {
  [key: string]: true | PropertyConfig;
}

export interface Cache {
  breakpoints?: Record<string, string> | string[];
  media?: (string | null)[];
  strict: boolean;
  key: string;
}

export interface SomeObject {
  [x: string]: SomeObject | string | number | ((x: Theme) => string | number);
}
