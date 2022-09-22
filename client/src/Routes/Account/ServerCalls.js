import axios from "axios";
// Submit form data
export const Submit = async (e, path) => {
	e.preventDefault();
	let formData = new FormData(e.target);
	formData = Object.fromEntries(formData);
	if (formData.username !== "" && formData.password !== "") {
		let vals = [formData.username, formData.password];
		const customConfig = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
		const response = await axios
			.post(path, JSON.stringify({ vals }), customConfig)
			.catch((err) => alert(err.response.data.message));

		if (response !== undefined) alert(response.data.msg);
		return formData.username;
	} else {
		alert("Please fill all forms");
		return false;
	}
};
