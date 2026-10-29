/** Used while the initial route is loading; the HTML shell covers bundle loading. */
export function LaunchScreen() {
  return (
    <div className="launch-screen" role="status" aria-label="Memuat Smile Hub">
      <div className="launch-screen-brand">
        <img src="/favicon.svg" width={100} height={100} alt="" />
        <span>Smile Hub</span>
      </div>
      <span className="launch-screen-spinner" aria-hidden="true" />
    </div>
  )
}
