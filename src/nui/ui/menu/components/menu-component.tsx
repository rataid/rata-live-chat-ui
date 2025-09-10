import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTransitionStyles,
  useTypeahead,
} from '@floating-ui/react'
import {
  Children,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { DivPropsWithoutRef } from '@nui/types'
import Icon from '@nui/ui/icon'

import { MenuContext } from '../provider'
import { MenuProps } from '../types'
import { MenuButton, MenuContainer } from './menu-component.style'

export const MenuComponent = forwardRef<
  HTMLDivElement,
  MenuProps & DivPropsWithoutRef
>(function MenuComponent(
  { label, portalId, padding, children, ...props },
  forwardedRef
) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasFocusInside, setHasFocusInside] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const elementsRef = useRef<Array<HTMLButtonElement | null>>([])
  const labelsRef = useRef<Array<string | null>>([])
  const parent = useContext(MenuContext)

  const tree = useFloatingTree()
  const nodeId = useFloatingNodeId()
  const parentId = useFloatingParentNodeId()
  const item = useListItem()

  const isNested = parentId != null

  const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? 'right-start' : 'bottom-start',
    middleware: [
      offset({ mainAxis: isNested ? 4 : 8, alignmentAxis: isNested ? -4 : 0 }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 400,
    initial: {
      opacity: 0,
    },
  })

  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  })

  const click = useClick(context, {
    event: 'mousedown',
    toggle: !isNested,
    ignoreMouse: isNested,
  })

  const role = useRole(context, { role: 'menu' })
  const dismiss = useDismiss(context, { bubbles: true })
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  })
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, listNavigation, typeahead]
  )

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  useEffect(() => {
    if (!tree) return

    function handleTreeClick() {
      setIsOpen(false)
    }

    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false)
      }
    }

    tree.events.on('click', handleTreeClick)
    tree.events.on('menuopen', onSubMenuOpen)

    // eslint-disable-next-line consistent-return
    return () => {
      tree.events.off('click', handleTreeClick)
      tree.events.off('menuopen', onSubMenuOpen)
    }
  }, [tree, nodeId, parentId])

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit('menuopen', { parentId, nodeId })
    }
  }, [tree, isOpen, nodeId, parentId])

  const value = useMemo(
    () => ({
      activeIndex,
      setActiveIndex,
      getItemProps,
      setHasFocusInside,
      isOpen,
    }),
    [activeIndex, setActiveIndex, getItemProps, setHasFocusInside, isOpen]
  )

  const hasChildren = !Children.toArray(children).every((child) => !child)

  const menuButtonRef = useMergeRefs([
    refs.setReference,
    item.ref,
    forwardedRef,
  ])

  if (!hasChildren) {
    return null
  }

  return (
    <FloatingNode id={nodeId}>
      <MenuButton
        isNested={isNested}
        ref={menuButtonRef}
        tabIndex={
          // eslint-disable-next-line no-nested-ternary
          !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
        }
        role={isNested ? 'menuitem' : undefined}
        data-open={isOpen ? '' : undefined}
        data-nested={isNested ? '' : undefined}
        data-focus-inside={hasFocusInside ? '' : undefined}
        {...getReferenceProps(
          parent.getItemProps({
            ...props,
            onFocus(event: React.FocusEvent<HTMLDivElement>) {
              props.onFocus?.(event)
              setHasFocusInside(false)
              parent.setHasFocusInside(true)
            },
          })
        )}
      >
        {label}
        {isNested && (
          <span aria-hidden tw="absolute right-0">
            <Icon icon="lucide:chevron-right" size="xs" />
          </span>
        )}
      </MenuButton>
      <MenuContext.Provider value={value}>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {isOpen && isMounted && (
            <FloatingPortal id={portalId}>
              <FloatingOverlay lockScroll>
                <div style={styles}>
                  <FloatingFocusManager
                    context={context}
                    modal={false}
                    initialFocus={isNested ? -1 : 0}
                    returnFocus={!isNested}
                  >
                    <MenuContainer
                      ref={refs.setFloating}
                      padding={padding}
                      style={floatingStyles}
                      {...getFloatingProps()}
                    >
                      {children}
                    </MenuContainer>
                  </FloatingFocusManager>
                </div>
              </FloatingOverlay>
            </FloatingPortal>
          )}
        </FloatingList>
      </MenuContext.Provider>
    </FloatingNode>
  )
})
