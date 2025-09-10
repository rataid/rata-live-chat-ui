import tw, { css, styled } from 'twin.macro'

export const LayoutUiNotifWrapper = styled.div(() => [
  css`
    &&& .Toastify__toast-container {
      ${tw`w-[340px] xl:w-[23.75rem]`}
    }
    .Toastify__progress-bar--info {
      ${tw`bg-primary-600`}
    }
    .Toastify__progress-bar--success {
      ${tw`bg-success-600`}
    }
    .Toastify__progress-bar--warning {
      ${tw`bg-warning-600`}
    }
    .Toastify__progress-bar--error {
      ${tw`bg-danger-600`}
    }
    .Toastify__toast {
      ${tw`shadow-none border rounded-lg border-gray-200 p-4 font-sans`}
    }
    .Toastify__toast-body {
      color: blue;
    }
    .Toastify__toast-theme--dark {
    }
    .Toastify__toast-theme--light {
    }
    .Toastify__close-button {
      ${tw`text-gray-500 right-0`}
    }
    .Toastify__progress-bar {
      height: 2px;
    }
    @media only screen and (max-width: 480px) {
      .Toastify__toast-container {
        left: auto;
        top: 12px;
        right: 12px;
      }
    }
  `,
])
