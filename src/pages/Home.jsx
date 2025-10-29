import { useEffect } from "react";
import ContactForm from "../components/ContactFrom.jsx";
import ListCard from "../components/ListCard.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	//console.log(store.userName)

	useEffect(() => {
		const validarAgenda = async () => {
			try {
				let response = await fetch("https://playground.4geeks.com/contact/agendas")
				if (!response.ok) {
					throw new Error("ocurrio un error")
				}
                let data = await response.json()
				//console.log(data.agendas[0].slug)
				//data.agendas.map(ele => console.log(ele))
				let encontrado = data.agendas.filter(ele => ele.slug===store.userName)
				//console.log(encontrado)
				if(!encontrado.length){
                   try {
					 let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.userName}`)
					 if(!response.ok){
						throw new Error("Error Creando la Agenda")
					 }
					 let data = await response.json()
					 console.log(data)
				   } catch (error) {
					console.log(error)
				   }
				}
				return
			} catch (error) {
				console.log(error)
			}
		}
		validarAgenda()
	}, [])


	return (
		<div className="container-fluid text-center1 mt-5 mb-5">
			<ListCard />
			<ContactForm />
		</div>
	);
}; 