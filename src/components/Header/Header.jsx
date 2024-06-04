import './Header.css'

function Header( { text } ) {
    return (
        <header className="header-section">
            <h1>{text}</h1>
        </header>
    )
}

export default Header;