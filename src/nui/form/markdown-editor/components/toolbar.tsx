import { CmdKey } from '@milkdown/core'
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark'
import { callCommand } from '@milkdown/utils'

import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'
import Tooltip from '@nui/ui/tooltip'

import { MarkdownEditorToolbarProps } from '../types'
import { MarkdownEditorToolbarMain } from './toolbar.style'

export default function MarkdownEditorToolbar({
  tooltipId,
  get,
}: MarkdownEditorToolbarProps) {
  function call<T>(command: CmdKey<T>, payload?: T) {
    return get()?.action(callCommand(command, payload))
  }

  return (
    <MarkdownEditorToolbarMain>
      <Tooltip portalId={tooltipId} content="Bold">
        <Button
          size="sm"
          variant="tertiaryGray"
          icon={<Icon stroke="lg" icon="lucide:bold" />}
          onClick={() => call(toggleStrongCommand.key)}
        />
      </Tooltip>
      <Tooltip portalId={tooltipId} content="Italic">
        <Button
          size="sm"
          variant="tertiaryGray"
          icon={<Icon stroke="lg" icon="lucide:italic" />}
          onClick={() => call(toggleEmphasisCommand.key)}
        />
      </Tooltip>
      <Tooltip portalId={tooltipId} content="List Bullet">
        <Button
          size="sm"
          variant="tertiaryGray"
          icon={<Icon stroke="lg" icon="lucide:list" />}
          onClick={() => call(wrapInBulletListCommand.key)}
        />
      </Tooltip>
      <Tooltip portalId={tooltipId} content="List Number">
        <Button
          size="sm"
          variant="tertiaryGray"
          icon={<Icon stroke="lg" icon="octicon:list-ordered-24" />}
          onClick={() => call(wrapInOrderedListCommand.key)}
        />
      </Tooltip>
      <Tooltip portalId={tooltipId} content="Blockquote">
        <Button
          size="sm"
          variant="tertiaryGray"
          icon={<Icon stroke="lg" icon="lucide:message-square-quote" />}
          onClick={() => call(wrapInBlockquoteCommand.key)}
        />
      </Tooltip>
    </MarkdownEditorToolbarMain>
  )
}
