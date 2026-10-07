import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const ErrorWrapper = styled.div.attrs({ className: tw`grid place-content-center h-screen` })``

export const ErrorContainer = styled.div.attrs({ className: tw`flex flex-col items-center justify-center gap-y-10 px-20 py-24 text-center` })``

export const ErrorMain = styled.div.attrs({ className: tw`flex flex-col gap-y-1` })``

export const ErrorTitle = styled.div.attrs({ className: tw`text-3xl font-semibold text-gray-900` })``

export const ErrorBody = styled.div.attrs({ className: tw`text-sm text-gray-700 max-w-2xl` })``
