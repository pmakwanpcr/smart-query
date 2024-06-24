import React, { Suspense } from "react";
import Header from "./header";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<>
			<Header />
			<Navbar />
			<Suspense fallback={"Loading..."}>
				<Outlet />
			</Suspense>
		</>
	);
}
