import { useEffect, useMemo, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import styles from './spellbook.module.css'
import data from '../public/data/spells.json'

const SPELLS = data.spell
const SPELLSPERPAGE = 16

function Spell({ id, icon, setFocusedSpell, allSpells, spellCount, setSpellCount }) {
  if (allSpells[id] === undefined) {
    return <></>
  }

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (allSpells[id].aquired === 'true') setChecked(true)
    if (id === 1) {
      setChecked(true)
    }
  })

  const handleChange = (event) => {
    setChecked(event.target.checked)
    if (event.target.checked) {
      allSpells[id].setAquired('true')
      if (typeof window !== 'undefined') {
        localStorage.setItem(id + 1, 'true')
      }
      setSpellCount(spellCount + 1)
    } else {
      allSpells[id].setAquired('false')
      if (typeof window !== 'undefined') {
        localStorage.setItem(id + 1, 'false')
      }
      setSpellCount(spellCount - 1)
    }
  }

  return (
    <div className={styles.spell}>
      <Checkbox checked={checked} onChange={handleChange} style={{ padding: '0' }} disabled={id === 1} />
      <div
        className={styles.spellButton}
        role="button"
        tabIndex={id}
        aria-label={allSpells[id].name}
        onClick={() => {
          setFocusedSpell(allSpells[id - 1])
        }}
        onKeyPress={() => {
          setFocusedSpell(allSpells[id - 1])
        }}
        style={{ background: `url('../images/icons/${icon}.png')` }}
      />
      <div className={styles.mobileSpell}>
        <div className={styles.mobileName}>{allSpells[id - 1].name}</div>
        <div className={styles.mobileSpellDU}>
          <div className={styles.mobileSpellData}>
            <ul>
              <li>
                <span style={{ color: 'green' }}>
                  <b>Type: </b>
                </span>
                <span>{allSpells[id - 1].type}</span>
              </li>
              <li>
                <span style={{ color: 'green' }}>
                  <b>Aspect: </b>
                </span>
                <span>{allSpells[id - 1].aspect}</span>
              </li>
              <li>
                <span style={{ color: 'green' }}>
                  <b>Rank: </b>
                </span>
                <span style={{ fontSize: '0.6rem' }}>
                  {Number(allSpells[id - 1].rank) === 1 ? <b>★</b> : null}
                  {Number(allSpells[id - 1].rank) === 2 ? <b>★★</b> : null}
                  {Number(allSpells[id - 1].rank) === 3 ? <b>★★★</b> : null}
                  {Number(allSpells[id - 1].rank) === 4 ? <b>★★★★</b> : null}
                  {Number(allSpells[id - 1].rank) === 5 ? <b>★★★★★</b> : null}
                </span>
              </li>
            </ul>
          </div>
          <div className={styles.mobileUnlocks}>
            <ul>
              {allSpells[id - 1].unlocks.map((e) => (
                <li>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeftPage({ page, setPage, pageSpells, allSpells, focusedSpell, setFocusedSpell, spellCount, setSpellCount }) {
  const maxPage = Math.ceil(allSpells.length / SPELLSPERPAGE)

  return (
    <div className={styles.pages}>
      <div className={styles.pageLeft}>
        <div className={styles.pageNumbers}>
          {Array.from(Array(maxPage), (e, i) => (
            <div
              key={i}
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
            <Spell
              key={e.id}
              id={e.id}
              icon={e.icon}
              setFocusedSpell={setFocusedSpell}
              allSpells={allSpells}
              spellCount={spellCount}
              setSpellCount={setSpellCount}
            />
          ))}
        </div>
      </div>
      <div className={styles.pageRight}>
        <span>{focusedSpell.name}</span>
        <div className={styles.focusedSpellData}>
          <div
            className={styles.focusedSpellIcon}
            style={{ background: `url('../images/icons/${focusedSpell.icon}.png') 100%/100%` }}
          />
          <div className={styles.focusedSpellAspects}>
            <ul>
              <li>
                <span style={{ color: 'green' }}>
                  <b>Type: </b>
                </span>
                <span>{focusedSpell.type}</span>
              </li>
              <li>
                <span style={{ color: 'green' }}>
                  <b>Aspect: </b>
                </span>
                <span>{focusedSpell.aspect}</span>
              </li>
              <li>
                <span style={{ color: 'green' }}>
                  <b>Rank: </b>
                </span>
                <span style={{ fontSize: '0.6rem' }}>
                  {Number(focusedSpell.rank) === 1 ? <b>★</b> : null}
                  {Number(focusedSpell.rank) === 2 ? <b>★★</b> : null}
                  {Number(focusedSpell.rank) === 3 ? <b>★★★</b> : null}
                  {Number(focusedSpell.rank) === 4 ? <b>★★★★</b> : null}
                  {Number(focusedSpell.rank) === 5 ? <b>★★★★★</b> : null}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.spellLearn}>
          <div className={styles.spellLearnTitle}>How to Learn</div>
          <div className={styles.spellLearnList}>
            <ul>
              {focusedSpell.unlocks.map((e) => (
                <li>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const Spellbook = () => {
  const handleFocus = (event) => event.target.select()

  const [page, setPage] = useState(1)
  const [focusedSpell, setFocusedSpell] = useState(null)
  const [spellCount, setSpellCount] = useState(0)

  const allSpells = useMemo(() => {
    const spellArray = []
    SPELLS.map((s) => {
      let aquiredBool = 'false'

      if (typeof window !== 'undefined') {
        if (!localStorage.getItem(s.id.toString())) localStorage.setItem(s.id.toString(), 'false')
        if (localStorage.getItem(s.id.toString()) === 'true') {
          aquiredBool = 'true'
        }
      }

      const spell = {
        id: s.id,
        name: s.name,
        icon: s.icon,
        type: s.type,
        aspect: s.aspect,
        rank: s.rank,
        unlocks: s.unlocks,
        aquired: aquiredBool,
        setAquired: (set) => {
          spell.aquired = set
        },
      }

      if (spell.id === 1) {
        spell.aquired = 'true'
      }

      spellArray.push(spell)
      return null
    })
    setFocusedSpell(spellArray[0])

    return spellArray
  }, [])

  const pageSpells = useMemo(() => {
    const visibleSpells = []
    for (let i = (page - 1) * SPELLSPERPAGE; i < page * SPELLSPERPAGE; i += 1) {
      if (allSpells[i] !== undefined) visibleSpells.push(allSpells[i])
    }
    return visibleSpells
  }, [page])

  useMemo(() => {
    let spellsAquired = 0
    allSpells.map((e) => {
      if (e.aquired === 'true') spellsAquired += 1
      return null
    })

    setSpellCount(spellsAquired)
  }, [])

  return (
    <>
      <div className={styles.spellbook}>
        <div className={styles.spellbookHeader}>
          <span>
            {spellCount} / {allSpells.length} Spells Learned
          </span>
          <span>
            Share your progress:
            <input onFocus={handleFocus} type="text" value="Hello World" readOnly />
          </span>
        </div>
        <div className={styles.spellbookClickable}>
          <LeftPage
            page={page}
            setPage={setPage}
            pageSpells={pageSpells}
            allSpells={allSpells}
            focusedSpell={focusedSpell}
            setFocusedSpell={setFocusedSpell}
            spellCount={spellCount}
            setSpellCount={setSpellCount}
          />
        </div>
      </div>
    </>
  )
}

export default Spellbook
