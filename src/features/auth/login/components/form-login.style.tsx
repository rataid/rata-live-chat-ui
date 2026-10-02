import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const AuthFormLoginWrapper = styled.div.attrs({ className: tw`grid px-6 lg:grid-cols-2 lg:px-0 rounded-lg overflow-hidden bg-white` })``

export const AuthFormLoginImage = styled.div.attrs({ className: tw`w-[26.5625rem] h-[36.25rem] lg:flex lg:items-center lg:justify-center bg-primary-600 m-1 rounded-lg hidden` })``

export const AuthFormLoginMain = styled.div.attrs({ className: tw`w-full h-screen lg:w-[26.5625rem] lg:h-full flex items-center justify-center bg-white` })``

export const AuthFormLoginMainInner = styled.div.attrs({ className: tw`w-80 flex flex-col gap-y-8` })``

export const AuthFormLoginMainImage = styled.div.attrs({ className: tw`flex h-24 w-full items-center justify-center text-primary-600 lg:hidden` })``

export const AuthFormLoginHeading = styled.header.attrs({ className: tw`text-center` })``

export const AuthFormLoginTitle = styled.h1.attrs({ className: tw`text-3xl font-semibold text-gray-900` })``

export const AuthFormLoginSubtitle = styled.p.attrs({ className: tw`leading-6 text-sm text-gray-500` })``

export const AuthFormLoginForm = styled.div.attrs({ className: tw`` })``

export const AuthFormLoginMore = styled.div.attrs({ className: tw`flex items-center justify-between text-sm` })``
