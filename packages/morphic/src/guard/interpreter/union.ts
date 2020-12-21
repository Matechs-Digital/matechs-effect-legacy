import { memo } from "../../utils"
import { guardApplyConfig } from "../config"
import { GuardType, GuardURI } from "../hkt"

import type { AnyEnv } from "@matechs/morphic-alg/config"
import { MatechsAlgebraUnion1 } from "@matechs/morphic-alg/union"

export const guardUnionInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraUnion1<GuardURI, Env> => ({
    _F: GuardURI,
    union: (...types) => (_, config) => (env) => {
      const guards = types.map((a) => a(env).guard)
      return new GuardType(
        guardApplyConfig(config?.conf)(
          {
            is: (u): u is any => {
              for (const k in guards) {
                if (guards[k].is(u)) {
                  return true
                }
              }
              return false
            }
          },
          env,
          { guards: guards as any }
        )
      )
    }
  })
)
