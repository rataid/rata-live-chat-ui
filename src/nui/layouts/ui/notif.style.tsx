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

  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      left: auto;
      top: 12px;
      right: 12px;
    }
  }
`
