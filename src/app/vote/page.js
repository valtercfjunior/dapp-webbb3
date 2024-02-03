"use client";

import { addVote, getCurrentVoting } from "@/services/Web3Service";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Vote() {
	const { push } = useRouter();

	const DEFAULT_OPTION = {
		name: "Loading...",
		image: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1706966469~exp=1706967069~hmac=84c1fb699138761b7f185ddbe836238226e9be6d6762f4c4e1471fc95aa127ba",
	};

	const [message, setMessage] = useState("");
	const [voting, setVoting] = useState({ maxDate: Date.now() });
	const [option1, setoption1] = useState(DEFAULT_OPTION);
	const [option2, setoption2] = useState(DEFAULT_OPTION);
	const [showVotes, setShowVotes] = useState(0);

	useEffect(() => {
		if (!localStorage.getItem("wallet")) return push("./");

		getCurrentVoting()
			.then((voting) => {
				setVoting(voting);
				setoption1(getOption(voting.option1));
				setoption2(getOption(voting.option2));
			})
			.catch((err) => {
				console.error(err);
				setMessage(err.message);
			});
	}, []);

	function getOption(option) {
		switch (option) {
			case "Valter":
				return {
					name: "Valter",
					image: "https://avatars.githubusercontent.com/u/79730793?u=6cff6b4f5044b92b99c9ac3610a790efb270a4e1&v=4",
				};
			case "Larissa":
				return {
					name: "Larissa",
					image: "https://media.licdn.com/dms/image/C5603AQE61WHyVUfFmA/profile-displayphoto-shrink_800_800/0/1616349348382?e=1712188800&v=beta&t=Anoafs04nGsZu1Voi0988ZMAFh0jy64vvKbfpq8PExw",
				};
			default:
				return DEFAULT_OPTION;
		}
	}


    function btnVoteClick(choice){
        setMessage("Connecting to Wallet, please wait a moment")
        addVote(choice)
        .then(() => {
            setShowVotes(choice)
            setMessage("Resultados parciais sujeitos a alteracao minuto a minuto")
        })
        .catch(err => {
            console.error(err)
            setMessage(err.message)
        }) 
    }

	return (
		<>
			<Head>
				<title>Webbb3 | Votacao</title>
				<meta charSet="utf-8"></meta>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				></meta>
			</Head>
			<div className="container col-xxl-8 px-4 py-5">
				<div className="row align-items-center">
					<h1 className="display-2 fw-bold lh-1 mb-5">
						Webbb3
					</h1>
                    <button className="btn btn-dark col-1 mb-5" onClick={()=> push("./")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
</svg> Home</button>
					<p className="lead">Votacao on-chain do BBB</p>

					{voting.maxDate > (Date.now() / 1000) ? (
						<p className="lead mb-3">
							Voce tem ate{" "}
							{new Date(Number(voting.maxDate) * 1000).toString()}{" "}
							para deixar seu voto em um dos participantes.
						</p>
					) : (
						<p className="lead mb-3">
							Votacao encerrada. Confira abaixo os resultados
						</p>
					)}
				</div>
				<div className="row flex-lg-row-reverse align-items-center g-1 py-5">
					<div className="col-1"></div>
					<div className="col-5">
						<h2
							className="my-2 d-block mx-auto rounded"
							style={{ width: 125, color: "#ffff", paddingLeft: 15, backgroundColor: "#212529", }}
						>
							{voting.option2}
						</h2>
						<img
							src={option2.image}
							className="d-block mx-auto img-fluid rounded-circle"
							width={250}
							height={250}
						/>
						{showVotes > 0 || voting.maxDate < (Date.now() / 1000) ? (
							<button
								className="btn btn-secondary p-3 my-2 d-block mx-auto"
								style={{ width: 250 }}
								disabled={true}
							>
								{showVotes === 2
									? Number(voting.votes2) + 1
									: Number(voting.votes2)}{" "}
								votos{" "}
							</button>
						) : (
							<button
								className="btn btn-primary p-3 my-2 d-block mx-auto"
								style={{ width: 250 }}
								onClick={() => btnVoteClick(2)}
							>
								Quero que saia esse
							</button>
						)}
					</div>
                    <div className="col-5">
						<h2
							className="my-2 d-block mx-auto rounded"
							style={{ width: 125, color: "#ffff", paddingLeft: 10, backgroundColor: "#FF0D98", }}
						>
							{voting.option1}
						</h2>
						<img
							src={option1.image}
							className="d-block mx-auto img-fluid rounded-circle"
							width={250}
							height={250}
						/>
						{showVotes > 0 || voting.maxDate < (Date.now() / 1000) ? (
							<button
								className="btn btn-secondary p-3 my-2 d-block mx-auto"
								style={{ width: 250 }}
								disabled={true}
							>
								{showVotes === 1
									? Number(voting.votes1) + 1
									: Number(voting.votes1)}{" "}
								votos{" "}
							</button>
						) : (
							<button
								className="btn btn-primary p-3 my-2 d-block mx-auto"
								style={{ width: 250 }}
								onClick={() => btnVoteClick(1)}
							>
								Quero que saia esse
							</button>
						)}
					</div>
                    <p className="message">{message}</p>

				</div>
				<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
					<p className="col-md-4 mb-0 text-body-secondary">
						&copy; 2024 Webbb3, Inc
					</p>
					<ul className="nav col-md-4 justify-content-end">
						
						<li className="nav-item">
							<a
								href="/about"
								className="nav-link px-2 text-body-secondary"
							>
								About
							</a>
						</li>
					</ul>
				</footer>
			</div>
		</>
	);
}
