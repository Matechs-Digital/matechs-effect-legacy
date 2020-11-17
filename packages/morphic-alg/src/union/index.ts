import { AnyEnv, ConfigsForType } from "../config"
import type { URIS, URIS2, HKT, Kind2, HKT2, Kind } from "../utils/hkt"

import type { Option } from "@matechs/core/Option"

export const UnionURI = "@matechs/morphic-alg/UnionURI" as const
export type UnionURI = typeof UnionURI

declare module "../utils/hkt" {
  export interface Algebra<F, Env> {
    [UnionURI]: MatechsAlgebraUnion<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [UnionURI]: MatechsAlgebraUnion1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [UnionURI]: MatechsAlgebraUnion2<F, Env>
  }
}

export type UnionValues<O> = {
  [o in keyof O]: O[o]
}

export type UnionTypes<F extends URIS2, E, A, R> = {
  [o in keyof A & keyof E]: Kind2<F, R, E[o], A[o]>
}

export interface UnionConfig<Types> {}

export interface MatechsAlgebraUnion<F, Env> {
  _F: F
  union<Types extends readonly [HKT2<F, Env, any, any>, ...HKT2<F, Env, any, any>[]]>(
    ...types: Types
  ): (
    guards: {
      [k in keyof Types]: (
        _: {
          [h in keyof Types]: [Types[h]] extends [HKT2<F, Env, infer E, infer A>]
            ? A
            : never
        }[keyof Types & number]
      ) => Option<Types[k] extends HKT2<any, any, any, any> ? Types[k]["_A"] : never>
    },
    config?: {
      name?: string
      conf?: ConfigsForType<
        Env,
        {
          [h in keyof Types]: [Types[h]] extends [HKT2<F, Env, infer E, infer A>]
            ? E
            : never
        }[keyof Types & number],
        {
          [h in keyof Types]: [Types[h]] extends [HKT2<F, Env, infer E, infer A>]
            ? A
            : never
        }[keyof Types & number],
        UnionConfig<Types>
      >
    }
  ) => HKT2<
    F,
    Env,
    {
      [h in keyof Types]: [Types[h]] extends [HKT2<F, Env, infer E, infer A>]
        ? E
        : never
    }[keyof Types & number],
    {
      [h in keyof Types]: [Types[h]] extends [HKT2<F, Env, infer E, infer A>]
        ? A
        : never
    }[keyof Types & number]
  >
}

export interface MatechsAlgebraUnion1<F extends URIS, Env extends AnyEnv> {
  _F: F
  union<Types extends readonly [Kind<F, Env, any>, ...Kind<F, Env, any>[]]>(
    ...types: Types
  ): (
    guards: {
      [k in keyof Types]: (
        _: {
          [h in keyof Types]: [Types[h]] extends [Kind<F, Env, infer A>] ? A : never
        }[keyof Types & number]
      ) => Option<Types[k] extends HKT<any, any, any> ? Types[k]["_A"] : never>
    },
    config?: {
      name?: string
      conf?: ConfigsForType<
        Env,
        unknown,
        {
          [h in keyof Types]: [Types[h]] extends [Kind<F, Env, infer A>] ? A : never
        }[keyof Types & number],
        UnionConfig<Types>
      >
    }
  ) => Kind<
    F,
    Env,
    {
      [h in keyof Types]: [Types[h]] extends [Kind<F, Env, infer A>] ? A : never
    }[keyof Types & number]
  >
}

export interface MatechsAlgebraUnion2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  union<Types extends readonly [Kind2<F, Env, any, any>, ...Kind2<F, Env, any, any>[]]>(
    ...types: Types
  ): (
    guards: {
      [k in keyof Types]: (
        _: {
          [h in keyof Types]: [Types[h]] extends [Kind2<F, Env, infer E, infer A>]
            ? A
            : never
        }[keyof Types & number]
      ) => Option<Types[k] extends HKT2<any, any, any, any> ? Types[k]["_A"] : never>
    },
    config?: {
      name?: string
      conf?: ConfigsForType<
        Env,
        {
          [h in keyof Types]: [Types[h]] extends [Kind2<F, Env, infer E, infer A>]
            ? E
            : never
        }[keyof Types & number],
        {
          [h in keyof Types]: [Types[h]] extends [Kind2<F, Env, infer E, infer A>]
            ? A
            : never
        }[keyof Types & number],
        UnionConfig<Types>
      >
    }
  ) => Kind2<
    F,
    Env,
    {
      [h in keyof Types]: [Types[h]] extends [Kind2<F, Env, infer E, infer A>]
        ? E
        : never
    }[keyof Types & number],
    {
      [h in keyof Types]: [Types[h]] extends [Kind2<F, Env, infer E, infer A>]
        ? A
        : never
    }[keyof Types & number]
  >
}
