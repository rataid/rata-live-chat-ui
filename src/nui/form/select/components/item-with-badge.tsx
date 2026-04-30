import Icon from '@nui/ui/icon'

import { SelectItemBadgeProps, } from '../types'
import {
    SelectItemLabel,
    SelectItemSymbol,
    SelectItemWrapper,
} from './item.style'
import Badge from '@nui/ui/badge'

export function SelectItemWithBadge({
    item,
    isSelected,
    badgeColor,
    itemToString,
}: SelectItemBadgeProps) {
    return (
        <SelectItemWrapper isSelected={isSelected}>
            <Badge color={badgeColor} >
                <SelectItemLabel>
                    {itemToString ? itemToString(item) : item.label || ''}
                </SelectItemLabel>
            </Badge>
            <SelectItemSymbol>
                {isSelected && <Icon icon="lucide:check" size="xs" />}
            </SelectItemSymbol>
        </SelectItemWrapper>
    )
}
