import styled from 'styled-components'

export const LayoutUiNotifWrapper = styled.div`
  &&& .Toastify__toast-container {
    width: 340px;
  }

  @media (min-width: 1280px) {
    &&& .Toastify__toast-container {
      width: 23.75rem;
    }
  }

  .Toastify__progress-bar--info {
    background-color: var(--nui-color-primary-600);
  }

  .Toastify__progress-bar--success {
    background-color: var(--nui-color-success-600);
  }

  .Toastify__progress-bar--warning {
    background-color: var(--nui-color-warning-600);
  }

  .Toastify__progress-bar--error {
    background-color: var(--nui-color-danger-600);
  }

  .Toastify__toast {
    box-shadow: none;
    border: 1px solid var(--nui-color-gray-200);
    border-radius: 0.5rem;
    padding: 1rem;
    font-family:
      'Plus Jakarta Sans',
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue';
  }

  .Toastify__toast-body {
    color: var(--nui-color-blue-body);
  }

  .Toastify__close-button {
    color: var(--nui-color-gray-500);
    right: 0;
  }

  .Toastify__progress-bar {
    height: 2px;
  }

  /* Mobile: top center, matches position="top-center" set in notif.tsx below 640px */
  @media only screen and (max-width: 639px) {
    &&& .Toastify__toast-container {
      top: 12px;
      left: 50%;
      right: auto;
      width: calc(100% - 24px);
      max-width: 23.75rem;
      padding: 0;
      transform: translateX(-50%);
    }

    &&& .Toastify__toast {
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
    }
  }
`
