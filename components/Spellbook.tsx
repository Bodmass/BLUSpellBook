import styles from './spellbook.module.css'

const Spellbook = () => {
  const handleFocus = (event) => event.target.select()

  return (
    <>
      <div className={styles.spellbook}>
        <div className={styles.spellbookHeader}>
          <span>0 / 104 Spells Learned</span>
          <span>
            Share your progress:
            <input onFocus={handleFocus} type="text" value="Hello World" />
          </span>
        </div>
        <div className={styles.spellbookClickable} />
      </div>
    </>
  )
}

export default Spellbook
