import { useEffect } from "react";
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
				data.agendas.map(ele => console.log(ele))
				let encontrado = data.agendas.filter(ele => ele.slug === store.userName)
				//console.log(encontrado)
				if (!encontrado.length) {
					try {
						let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.userName}`, {
							method: "POST"
						})
						if (!response.ok) {
							throw new Error("Error Creando la Agenda")
						}
						let data = await response.json()
						//console.log(data)


						let newContact = {
							name: "contacto de prueba",
							email: "contacto de prueba@contactodeproeba.com",
							phone: "phone contacto de prueba",
							address: "address contacto de prueba"
						}

						let responseDos = await fetch(`https://playground.4geeks.com/contact/agendas/${store.userName}/contacts`, {
							method: "POST",
							body: JSON.stringify(newContact),
							headers: {
								"Content-Type": "application/json"
							}
						}
						)
						if (!responseDos.ok) {
							throw new Error("Ocurrio un error: al crear contacto de prueba")
						}
						let dataDos = await responseDos.json()
						//console.log("CONTACTO CREADA", dataDos)
						dispatch({
							type: "TOGGLE_ACTUALIZAR_LISTA",
							payload: !store.actualizarLista || ""
						})

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
	<div className="container-fluid  mt-5 mb-5 ">
		<ListCard />
	</div>
);
}; 