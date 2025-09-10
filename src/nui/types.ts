import {
  ClassAttributes,
  HTMLAttributes,
  PropsWithRef,
  PropsWithoutRef,
} from 'react'

export type HTMLProps<T> = ClassAttributes<T> & HTMLAttributes<T>

// Props type for input element
export type InputPropsWithoutRef = PropsWithoutRef<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>

export type InputPropsWithRef = PropsWithRef<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>

export type ButtonPropsWithoutRef = PropsWithoutRef<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

export type ImagePropsWithoutRef = PropsWithoutRef<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
>

export type TextareaPropsWithoutRef = PropsWithoutRef<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
>

export type DivPropsWithoutRef = PropsWithoutRef<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>

export type AnchorPropsWithoutRef = PropsWithoutRef<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
>

// export type ActionType = 'create' | 'update' | 'delete'

export type ActionResult<T = void> = {
  success: boolean
  message?: string
  payload?: T
}
