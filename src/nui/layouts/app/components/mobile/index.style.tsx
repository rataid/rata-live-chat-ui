import tw from 'twin.macro'

export const AppMobileNavWrapper = tw.div`flex h-[4.5rem] items-center justify-between border-b border-gray-200 bg-white px-4 max-w-3xl mx-auto`

export const AppMobileNavLogo = tw.div`w-[2.125rem]`

export const AppMobileNavOverlay = tw.div`flex h-full max-w-3xl mx-auto overflow-hidden flex-col items-end justify-end bg-gray-500/10 backdrop-blur-[2px]`

export const AppMobileNavMain = tw.div`relative bg-white w-full flex flex-col h-full justify-between`

export const AppMobileNavNav = tw.div`flex justify-between h-[calc(100%-72px)]`

export const AppMobileNavNavWrapper = tw.div`w-[72px] py-2 border-r border-gray-200`

export const AppMobileNavNavMain = tw.div`w-full flex flex-col items-center gap-y-2 py-2 px-4`

export const AppMobileNavNavDivide = tw.div`border-t border-gray-200 h-1 w-full last:hidden`

export const AppMobileNavSubNavWrapper = tw.div`w-full h-full mt-6 pb-4 overflow-hidden`

export const AppMobileNavSubNavMain = tw.div`flex flex-col pb-2 gap-y-4`

export const AppMobileNavProfile = tw.div`absolute bottom-0 bg-white right-0 left-0`
