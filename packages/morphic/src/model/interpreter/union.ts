import { memo } from "../../utils"
import { Any, withName } from "../codec"
import * as M from "../codec"
import { modelApplyConfig } from "../config"
import { ModelType, ModelURI } from "../hkt"

import { pipe } from "@matechs/core/Function"
import type { AnyEnv } from "@matechs/morphic-alg/config"
import { MatechsAlgebraUnion2 } from "@matechs/morphic-alg/union"

export const modelUnionInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraUnion2<ModelURI, Env> => ({
    _F: ModelURI,
    union: (...types) => (_guards, config) => (env) =>
      pipe(
        types.map((getType) => getType(env).codec),
        (models) =>
          new ModelType(
            modelApplyConfig(config?.conf)(
              models.length === 1
                ? withName(config?.name)(models[0])
                : M.union(models as [Any, Any, ...Any[]], config?.name, _guards as any),
              env,
              { models }
            )
          )
      )
  })
)
