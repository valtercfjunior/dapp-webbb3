"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";


export default function About() {
	const { push } = useRouter();

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
					<p className="lead">SmartContract</p>
					
				</div>
				<img className="d-block mx-lg-auto img-fluid rounded"
							width="800"
							 src="/carbon_smartcontract.png"></img>
				<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
					<p className="col-md-4 mb-0 text-body-secondary">
						&copy; 2024 Webbb3, Inc
					</p>

				</footer>
			</div>
		</>
	);
}
