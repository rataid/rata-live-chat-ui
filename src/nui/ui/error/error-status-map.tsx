import IconAuthorized from '@/assets/svg/auth'
import NotfoundSvg from '@/assets/svg/not-found'

export const errorStatusMap = [
  {
    title: 'Bad Request',
    body: 'The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.',
    statuses: [400],
    icon: <NotfoundSvg />,
  },
  {
    title: 'You are not authorized',
    body: 'It seems like you don’t have permission to view this page. Please sign in with different account or contact your administrator.',
    statuses: [401, 403],
    icon: <IconAuthorized />,
  },
  {
    title: 'Page not found',
    body: 'Sorry, the page you are looking for doesn’t exist or has been moved.',
    statuses: [404],
    icon: <NotfoundSvg />,
  },
  {
    title: 'Internal Server error',
    body: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
    statuses: [500],
    icon: <NotfoundSvg />,
  },
  {
    title: 'Service unavailable',
    body: 'The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.',
    statuses: [503],
    icon: <NotfoundSvg />,
  },
  {
    title: 'Gateway Timeout',
    body: 'Did not receive a response from the upstream server specified by the URI.',
    statuses: [504],
    icon: <NotfoundSvg />,
  },
  {
    title: 'Client error',
    body: 'Ops something went wrong. Please try again.',
    statuses: [0],
    icon: <NotfoundSvg />,
  },
]
