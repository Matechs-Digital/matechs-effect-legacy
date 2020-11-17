import { memo } from "../../utils"
import { fcApplyConfig, accessFC } from "../config"
import { FastCheckType, FastCheckURI } from "../hkt"

import { pipe } from "@matechs/core/Function"
import { AnyEnv } from "@matechs/morphic-alg/config"
import { MatechsAlgebraUnion1 } from "@matechs/morphic-alg/union"

export const fcUnionInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraUnion1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    union: (...types) => (_, config) => (env) =>
      new FastCheckType(
        pipe(
          types.map((getArb) => getArb(env).arb),
          (arbs) =>
            fcApplyConfig(config?.conf)(accessFC(env).oneof(...arbs), env, { arbs })
        )
      )
  })
)
