import { editorViewOptionsCtx } from '@milkdown/core'
import type { Ctx } from '@milkdown/ctx'

export function nuiTheme(ctx: Ctx): void {
  ctx.update(editorViewOptionsCtx, (prev) => {
    const prevClass = prev.attributes

    return {
      ...prev,
      attributes: (state) => {
        const attrs =
          typeof prevClass === 'function' ? prevClass(state) : prevClass

        return {
          ...attrs,
          class: 'prose nui-theme',
        }
      },
    }
  })
}
