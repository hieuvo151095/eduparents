import type { GoodBehavior } from '@/lib/mock-data'

const GB_STATUS_LABEL: Record<string, string> = { dat: 'Đạt', khongdat: 'Không đạt' }

// "Open Question" from phieu-be-ngoan-parent-flow-spec.md, mục I — resolved
// with the user: when the latest cycle is "Không đạt", still show the hero
// card (don't hide it), but switch to a lighter/muted variant with a gentle
// encouragement message instead of the celebratory dark card.
export function PhieuCuaConScreen({ goodBehavior }: { goodBehavior: GoodBehavior }) {
  if (!goodBehavior.cycles.length) {
    return (
      <div className="empty-state">
        <div className="glyph">▢</div>
        <div className="text">Chưa có phiếu bé ngoan</div>
      </div>
    )
  }

  const [latest, ...history] = goodBehavior.cycles
  const isDat = latest.status === 'dat'

  return (
    <>
      <div className={`gb-hero ${isDat ? '' : 'gb-hero--miss'}`}>
        <div className="gb-hero-icon">{isDat ? '★' : '☆'}</div>
        <div className="gb-hero-title">Phiếu bé ngoan</div>
        <div className="gb-hero-period">{latest.label}</div>
        <div className="gb-hero-msg">
          {isDat
            ? 'Con đã đạt Phiếu bé ngoan tuần này!'
            : 'Con chưa đạt phiếu kỳ này — cố gắng hơn ở kỳ sau nhé!'}
        </div>
        {latest.comment && (
          <div className="gb-hero-comment">
            <div className="gb-hero-comment-label">Nhận xét của cô</div>
            <div className="gb-hero-comment-text">&quot;{latest.comment}&quot;</div>
          </div>
        )}
      </div>

      <div className="section-heading">Lịch sử</div>
      {history.length ? (
        history.map((c) => (
          <div className="list-item" key={c.id}>
            <span className="glyph">{c.status === 'dat' ? '★' : '☆'}</span>
            <div className="body">
              <div className="title">{c.label}</div>
            </div>
            <span className={`badge badge--${c.status === 'dat' ? 'filled' : 'muted'}`}>
              {GB_STATUS_LABEL[c.status]}
            </span>
          </div>
        ))
      ) : (
        <div className="empty-state">
          <div className="glyph">▢</div>
          <div className="text">Chưa có lịch sử phiếu bé ngoan</div>
        </div>
      )}
    </>
  )
}
