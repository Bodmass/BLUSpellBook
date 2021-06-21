import { useMemo, useState } from 'react'
import styles from './spellbook.module.css'
import data from '../public/data/spells.json'

const SPELLS = data.spell
const SPELLSPERPAGE = 16

function Spell({ id, icon, aquired }) {
  return (
    <div className={styles.spell}>
      <input type="checkbox" id={id} value={aquired} />
      <div className={styles.spellButton} style={{ background: `url('../images/icons/${icon}.png')` }} />
    </div>
  )
}

function LeftPage({ page, setPage, pageSpells, allSpells }) {
  const maxPage = Math.ceil(allSpells.length / SPELLSPERPAGE)

  return (
    <div className={styles.pageLeft}>
      <div className={styles.pageNumbers}>
        {Array.from(Array(maxPage), (e, i) => (
          <div
            role="button"
            onKeyPress={() => {
              setPage(i + 1)
            }}
            className={i + 1 === page ? styles.pageNumberActive : styles.pageNumber}
            tabIndex={i}
            onClick={() => {
              setPage(i + 1)
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className={styles.spellList}>
        {pageSpells.map((e) => (
          <Spell id={e.id} icon={e.icon} aquired={false} />
        ))}
      </div>
    </div>
  )
}

const Spellbook = () => {
  const handleFocus = (event) => event.target.select()

  const [page, setPage] = useState(1)

  const allSpells = useMemo(() => {
    const spellArray = []
    SPELLS.map((s) => {
      const spell = { id: s.id, name: s.name, icon: s.icon, unlocks: s.unlocks, aquired: false }
      spellArray.push(spell)
      return null
    })
    return spellArray
  }, [])

  const pageSpells = useMemo(() => {
    const visibleSpells = []
    for (let i = (page - 1) * SPELLSPERPAGE; i < page * SPELLSPERPAGE; i += 1) {
      if (allSpells[i] !== undefined) visibleSpells.push(allSpells[i])
    }
    return visibleSpells
  }, [page])

  return (
    <>
      <div className={styles.spellbook}>
        <div className={styles.spellbookHeader}>
          <span>0 / {allSpells.length} Spells Learned</span>
          <span>
            Share your progress:
            <input onFocus={handleFocus} type="text" value="Hello World" />
          </span>
        </div>
        <div className={styles.spellbookClickable}>
          <LeftPage page={page} setPage={setPage} pageSpells={pageSpells} allSpells={allSpells} />
        </div>
      </div>
    </>
  )
}

export default Spellbook
