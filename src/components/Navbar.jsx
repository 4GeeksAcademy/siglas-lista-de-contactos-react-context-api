import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
    //const [theContact, settheContact] = useState(store.theContact)
	//settheContact(JSON.stringify(theContact))
	return (
	(store.ctrlButton) &&
		<nav className="navbar navbar-light bg-light ">
			<div className="container-fluid d-flex">
{/* 				<Link to="/">
					<span className="navbar-brand mb-0 h1">Main</span>
				</Link> */}
				<div className="ms-auto">
					<Link to={`/contactform/add`}>
						<button className="btn btn-primary">Add new contact</button>
					</Link>
				</div>
			</div>
		</nav>
        
	);
};