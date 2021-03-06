import debounce from 'lodash/debounce'

import './style.css'

function Header({ onSearch, onViewChange, view }) {
  return (
    <header className="header">
      <div class="header__nav">
        <button
          style={{ color: view === 'search' ? '#222' : '#999' }}
          onClick={() => onViewChange('search')}
        >
          Discover
        </button>
        <button
          style={{ color: view === 'ratings' ? '#222' : '#999' }}
          onClick={() => onViewChange('ratings')}
        >
          Ratings
        </button>
      </div>
      {view === 'search' ? (
        <div className="header__search">
          <i class="fas fa-search"></i>
          <input
            placeholder="Search for images"
            onChange={debounce(onSearch, 300)}
          />
        </div>
      ) : null}
    </header>
  )
}

export default Header
