import { abbreviateName, type GoodBehavior } from '@/lib/mock-data'

const MEDALS = ['🥇', '🥈', '🥉']

// Two "Open Question" decisions from phieu-be-ngoan-parent-flow-spec.md,
// mục II, resolved with the user before implementing:
// 1. Top-3 privacy: classmates other than the parent's own child are shown
//    with abbreviated names ("Trần T. B."), never full names — the child's
//    own name is always shown in full since the parent already knows it.
// 2. Rank outside Top 3: shown as an exact ordinal ("#7/25"), not a
//    qualitative bucket like "top 30%".
export function TongKetScreen({ goodBehavior }: { goodBehavior: GoodBehavior }) {
  const r = goodBehavior.ranking
  return (
    <>
      <div className="section-heading" style={{ marginTop: 14 }}>
        {goodBehavior.yearLabel}
      </div>
      <div className="card text-center">
        <div className="card-title" style={{ textAlign: 'center' }}>
          Tổng số phiếu bé ngoan của con
        </div>
        <div className="gb-total">
          {r.achieved} / {r.totalCycles} <span className="gb-total-unit">chu kỳ</span>
        </div>
      </div>

      <div className="section-heading">Xếp hạng lớp (Top 3)</div>
      <div className="card">
        {r.top3.map((item, i) => (
          <div className={`feedback-row ${item.isSelf ? 'gb-rank-self' : ''}`} key={item.name}>
            <span>
              {MEDALS[i]} {item.isSelf ? item.name : abbreviateName(item.name)}
            </span>
            <span style={{ fontWeight: 700 }}>{item.count} phiếu</span>
          </div>
        ))}
        {!r.selfInTop3 && (
          <>
            <div className="divider" />
            <div className="feedback-row">
              <span className="text-muted">Vị trí của con</span>
              <span style={{ fontWeight: 700 }}>
                #{r.selfRank}/{r.totalStudents}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  )
}
