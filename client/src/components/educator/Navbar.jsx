import {useApp} from "../../context/AppContext"
import { assets, dummyEducatorData } from '../../assets/assets'
import { Link } from "react-router-dom"

const Navbar = () => {

    const educatorData=dummyEducatorData
    const {user}=useApp()
  return (
    <div>
        <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
        </Link>
        <div>
            <p>Hi!{user? user?.displayName : "Educator"}</p>
        </div>
    </div>
  )
}

export default Navbar