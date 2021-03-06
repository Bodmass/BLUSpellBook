import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa'
import styles from './header.module.css'

function HeaderList() {
  function HeaderIcon({ children, link }) {
    return (
      <div className={styles.icon}>
        <a href={link}> {children}</a>
      </div>
    )
  }
  return (
    <div className={styles.icons}>
      <HeaderIcon link="https://azizarar.com">
        <FaGlobe />
      </HeaderIcon>
      <HeaderIcon link="https://github.com/Bodmass/BLUSpellbook">
        <FaGithub />
      </HeaderIcon>
      <HeaderIcon link="https://twitter.com/bodmassad">
        <FaTwitter />
      </HeaderIcon>
    </div>
  )
}

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="../images/logo.png" alt="" />
      </div>
      <HeaderList />
    </div>
  )
}

export default Header
