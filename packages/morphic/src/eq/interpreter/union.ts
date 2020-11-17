import { memo } from "../../utils"
import { eqApplyConfig } from "../config"
import { EqType, EqURI } from "../hkt"

import { AnyEnv } from "@matechs/morphic-alg/config"
import { MatechsAlgebraUnion1 } from "@matechs/morphic-alg/union"

export const eqUnionInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraUnion1<EqURI, Env> => ({
    _F: EqURI,
    union: (...types) => (guards, config) => (env) => {
      const equals = types.map((a) => a(env).eq)
      return new EqType(
        eqApplyConfig(config?.conf)(
          {
            equals: (a, b): boolean => {
              if (a === b) {
                return true
              }
              for (const i in guards) {
                if (guards[i](a)._tag === "Some" && guards[i](b)._tag === "Some") {
                  return equals[i].equals(a, b)
                }
              }
              return false
            }
          },
          env,
          { equals }
        )
      )
    }
  })
)
