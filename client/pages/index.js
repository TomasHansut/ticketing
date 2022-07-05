import { getCurrentUser } from "../api/build-client";

const LandingPage = ({ currentUser }) => {
	console.log("Landing PAge");
	if (Object.values(currentUser)[0] == null) {
		return <h1>You are NOT signed in</h1>;
	} else {
		return <h1>You are signed in</h1>;
	}
};

export async function getServerSideProps({ req }) {
	const currentUser = await getCurrentUser(req.headers);

	return { props: { currentUser: currentUser } };
}

export default LandingPage;
