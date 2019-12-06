import React from 'react'
import './index.sass'
const API_URL = process.env.REACT_APP_API_URL

export default function({onLogout, onLanding, onMyWishes, onMyFriends, onSavedWishes, onMyProfile, user}){
    return <header className="header">
    <section className="header__section1">
        <a href="/" className="header__title" onClick={event => { event.preventDefault(); onLanding() }}>WiShare</a>
        <img className="header__image" src={`${API_URL}/users/profileimage/${user.id}`} alt="profile picture"/>
    </section>
    <section className="header__section2">
        <input type="checkbox" id="show-menu"/>
        <label className="header__hamburguer" htmlFor="show-menu"><img className="header__hamburguericon"
                src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"/></label>
        <nav className="header__nav menu">
            <ul className="menu__list list">
                <li><a href="#" className="list__item" onClick={event => { event.preventDefault(); onMyWishes() }}>My Wishes</a></li>
                <li><a href="#" className="list__item" onClick={event => { event.preventDefault(); onMyFriends() }}>Friends</a></li>
                <li><a href="#" className="list__item" onClick={event => { event.preventDefault(); onSavedWishes() }}>Saved Wishes</a></li>
                <li><a href="#" className="list__item" onClick={event => { event.preventDefault(); onMyProfile() }}>My profile</a></li>
                <li><a href="/" className="list__item" onClick={event => { event.preventDefault(); onLogout() }}>Logout</a></li>
            </ul>
        </nav>
    </section>
</header>
}