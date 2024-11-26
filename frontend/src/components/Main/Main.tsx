import { Link } from "react-router-dom"
import "../../App.css"

const Main = () => { // Компонент главной страницы
    return (
        <div className="page">
                <div className="wrapper">
                    <Link className="main-row" to="/login">Авторизация</Link>
                    <Link className="main-row" to="/register">Регистрация</Link>
                    <Link className="main-row" to="/profile">Профиль</Link>
                    <Link className="main-row" to="/admin">Админ-панель</Link>
                </div>
        </div>
    )
}

export default Main