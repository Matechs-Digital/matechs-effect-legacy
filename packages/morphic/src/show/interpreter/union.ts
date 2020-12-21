import { memo } from "../../utils"
import { showApplyConfig } from "../config"
import { ShowType, ShowURI } from "../hkt"

import type { AnyEnv } from "@matechs/morphic-alg/config"
import { MatechsAlgebraUnion1 } from "@matechs/morphic-alg/union"

export const showUnionInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraUnion1<ShowURI, Env> => ({
    _F: ShowURI,
    union: (...types) => (guards, config) => (env) => {
      const shows = types.map((a) => a(env).show)
      return new ShowType(
        showApplyConfig(config?.conf)(
          {
            show: (a): string => {
              for (const i in guards) {
                if (guards[i](a)._tag === "Some") {
                  return shows[i].show(a)
                }
              }
              throw new Error("BUG: guard not found")
            }
          },
          env,
          { shows: shows as any }
        )
      )
    }
  })
)
