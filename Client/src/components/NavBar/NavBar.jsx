import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import {IconLogout} from "@tabler/icons-react";

export default function NavBar ({onSearch, setAccess}){
  return(
   <nav className={styles.FondoSearchBar}>
    <div className={styles.menu}>
    <Link to="/home"><button >Home</button></Link>
    <Link to="/create"><button >Create New Recipe</button></Link>
    <Search className={styles.search} onSearch = {onSearch}
        setAccess = {setAccess}
    />


   {/*  <button onClick={()=>{
    setAccess(false)
    navigate('/')
    }} className={styles.salir}>
    <IconLogout/>
    </button> */}
    </div>
   </nav>
)
}
