import Icon from '../../icon'
import {
  InfiniteScrollLoaderMain,
  InfiniteScrollLoaderWrapper,
} from './loader.style'

export default function InfiniteScrollLoader() {
  return (
    <InfiniteScrollLoaderWrapper>
      <InfiniteScrollLoaderMain>
        <Icon size="lg" icon="mingcute:loading-3-fill" />
      </InfiniteScrollLoaderMain>
      Loading...
    </InfiniteScrollLoaderWrapper>
  )
}
