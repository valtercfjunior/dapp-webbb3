"use client"

import { doLogin } from "@/services/Web3Service";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { push } = useRouter();


  const [message, setMessage] = useState("")

	function btnLoginClick() {
    doLogin()
    .then(account => push("/vote"))
    .catch(err => {
      console.error(err)
      setMessage(err.message)
    })
	}

	return (
		<>
			<Head>
				<title>Webbb3 | Login</title>
				<meta charSet="utf-8"></meta>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				></meta>
			</Head>
			<div className="container col-xxl-8 px-4 py-5">
				<div className="row flex-lg-row-reverse align-items-center g-5 py-5">
					<div className="col-10 col-sm-8 col-lg-6 ">
						<img
							src="https://telaviva.com.br/wp-content/uploads/2021/05/bbb-robo.jpg"
							className="d-block mx-lg-auto img-fluid rounded"
							width="700"
							height="500"
						/>
					</div>
					<div className="col-lg-6">
						<h1 className="display-2 fw-bold  lh-1 mb-5">
							Webbb3
						</h1>
						<p className="lead">Votacao on-chain do BBB</p>
						<p className="lead mb-3">
							Autentique-se com sua carteira e deixe o seu voto
							para o proximo paredao.
						</p>
						<div className="d-grid gap-2 d-md-flex justify-content-md-start">
							<button
								onClick={btnLoginClick}
								className="btn btn-primary btn-lg px-4 me-md-2"
							>
								<img
									src="metamask.svg"
									width="64"
									className="me-3"
								/>
									Conectar com a Metamask
								
							</button>
						</div>
            <p className="message">{message}</p>
					</div>
				</div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Webbb3, Inc</p>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="/about" className="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
        </footer>
			</div>
		</>
	);
}
