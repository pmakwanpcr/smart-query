import { appConfig } from "@/configs";
import { helper } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
	user: null,
	all_filter: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		handleAllFilter: (state, action) => {
			state = {
				...state,
				all_filter: action.payload,
			};
			return state;
		},
		handleRemoveFilter: (state) => {
			state = {
				...state,
				all_filter: null,
			};
			return state;
		},
		handleLogin: (state, action) => {
			state = {
				...state,
				token: action.payload.access_token,
				user: action.payload.userData,
			};
			window.localStorage.setItem(appConfig.localStorage.token, action.payload.access_token);
			return state;
		},

		handleLogout: (state, action) => {
			window.localStorage.removeItem(appConfig.localStorage.token);

			state = {
				...state,
				token: null,
				user: null,
			};

			helper.toaster.success("User logged out successfully");
			return state;
		},
	},
});

export default authSlice.reducer;
export const { handleLogin, handleLogout, handleAllFilter, handleRemoveFilter } = authSlice.actions;
