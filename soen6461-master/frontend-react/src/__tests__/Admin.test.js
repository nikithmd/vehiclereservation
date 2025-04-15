import { shallow } from "enzyme"
import AdminCarListing from "./../components/Admin/index";
import React from "react"

describe("Admin index file", () => {

	it("it should get data", () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve(["", ""]),
		});
		jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

		const wrapper = shallow(<AdminCarListing/>);

		wrapper.instance().getData()

		expect(global.fetch).toHaveBeenCalled()
		process.nextTick(() => {
			expect(wrapper.state().isLoaded).toBeTruthy()
			expect(wrapper.state().carItems.length).toBe(2)
		})
	})

	it("it should handle update vehicle submit", () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve({}),
		});
		jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
		jest.spyOn(global, "alert").mockImplementation(() => [])

		const wrapper = shallow(<AdminCarListing/>);

		wrapper.state().eachElementData = { id: "22" }
		wrapper.instance().putData({
			licensePlate: "UTE 001",
			type: "SUV",
			make: "",
			model: "",
			year: 1,
			color: ""
		})

		expect(global.fetch).toHaveBeenCalled()
		process.nextTick(() => {
			expect(wrapper.state().isLoaded).toBeTruthy()
			expect(wrapper.state().showEditPanel).toBe(false)
		})
	})

	it("it should handle delete function", () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve({}),
		});
		jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

		const wrapper = shallow(<AdminCarListing/>);

		wrapper.instance().onDeleteClick({ id: "21" })

		expect(global.fetch).toHaveBeenCalled()
		process.nextTick(() => {
			expect(wrapper.state().isLoaded).toBeTruthy()
		})
	})

	it("it should handle the vehicle submit", () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve({}),
		});
		jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
		jest.spyOn(global, "alert").mockImplementation(() => [])

		const wrapper = shallow(<AdminCarListing/>);

		wrapper.instance().handleVehicleSubmit({ licensePlate: "" })

		expect(global.alert).toHaveBeenCalled()

		wrapper.instance().handleVehicleSubmit({
			licensePlate: "UTE 001",
			type: "SUV",
			make: "Nissan",
			model: "Rouge",
			year: 2018,
			color: "Yellow"
		})

		expect(global.fetch).toHaveBeenCalled()
		process.nextTick(() => {
			expect(wrapper.state().isLoaded).toBeTruthy()
		})
	})
})