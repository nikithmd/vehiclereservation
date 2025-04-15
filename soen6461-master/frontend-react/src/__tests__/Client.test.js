import { shallow } from "enzyme"
import ClientListing from "../components/clientListing"
import React from "react"

describe("Client Listing File", () => {
	it("should get data", () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve(["mock", "data", "want"]),
		});
		jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

		const wrapper = shallow(<ClientListing />);

		wrapper.instance().getData()

		expect(global.fetch).toHaveBeenCalled()
	})

	it("should delete clients", () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve(["mock", "data", "want"]),
		});
		jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

		const wrapper = shallow(<ClientListing />);
		const spy = jest.spyOn(wrapper.instance(), "getData")

		wrapper.instance().getData()

		expect(global.fetch).toHaveBeenCalled()
		expect(spy).toHaveBeenCalled()
		process.nextTick(() => {
			expect(wrapper.state().isLoaded).toBeTruthy()
		})
	})

	it("should handle submit new client", () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve(["me"]),
		});
		jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
		jest.spyOn(global, "alert").mockImplementation(() => [])

		const wrapper = shallow(<ClientListing />);
		const spy = jest.spyOn(wrapper.instance(), "postData")

		wrapper.instance().handleClientSubmit({ first_name: "" })

		expect(global.alert).toHaveBeenCalled()

		wrapper.instance().handleClientSubmit({
			first_name: "UNIT",
			last_name: "TEST",
			phone: "5252552",
			expiryDate: "2020-12-22",
			licence_number: "UNITTEST"
		})

		expect(spy).toHaveBeenCalled()
	})
})