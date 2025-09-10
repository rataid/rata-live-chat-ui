import { AppSidebarHeaderLogo, AppSidebarHeaderWrapper } from './header.style'

export function AppSidebarHeader() {
  return (
    <AppSidebarHeaderWrapper>
      <AppSidebarHeaderLogo>
        <svg fill="none" viewBox="0 0 32 48">
          <g clipPath="url(#logo)">
            <path
              fill="#9E77ED"
              d="M18.164 14.268v33.116c0 .351.352.571.66.395l12.71-6.904a.462.462 0 0 0 .22-.396V21.701a.462.462 0 0 0-.22-.396l-12.666-7.433c-.308-.175-.704.044-.704.396Zm-1.803 33.248V.459c0-.308-.308-.527-.616-.44L.31 5.738c-.176.087-.307.22-.307.44v35.797c0 .176.131.352.307.44l15.436 5.541c.308.088.616-.132.616-.44Z"
            />
            <path
              fill="#53389E"
              d="M18.164 14.268v33.116c0 .351.352.571.66.395l12.71-6.904a.462.462 0 0 0 .22-.396V21.701a.462.462 0 0 0-.22-.396l-12.666-7.433c-.308-.175-.704.044-.704.396Z"
            />
          </g>
          <defs>
            <clipPath id="logo">
              <path fill="#fff" d="M0 0h31.755v48H0z" />
            </clipPath>
          </defs>
        </svg>
      </AppSidebarHeaderLogo>
    </AppSidebarHeaderWrapper>
  )
}
