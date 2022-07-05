import Link from "next/link"
import { getCurrentUser } from "../api/build-client";

// Header component with check if user is logged in
const Header = ({ currentUser }) => {
    // Check if user is sign in
    if(currentUser != undefined) {
        if(Object.values(currentUser)[0]) {
            var isSignIn = true
        }
    }

    // Dynamically creates links 
    const links = [
        !isSignIn && { label: "Sign Up", href: "/auth/signup" },
        !isSignIn && { label: "Sign In", href: "/auth/signin" },
        isSignIn && { label: "Sign Out", href: "/auth/signout" }
    ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return <li key={href}>
            <Link href={href}>
                <a className="nav-link">{label}</a>
            </Link>
        </li>
    })

    return <nav className="navbar navbar-light bg-light">
        <Link href="/">
            <a className="navbar-brand">GitTix</a>
        </Link>

        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
                {links}
            </ul>
        </div>
    </nav>
}

export async function getServerSideProps({ req }) {
	const currentUser = await getCurrentUser(req.headers);
	return { props: { currentUser: currentUser } };
}


export default Header;
