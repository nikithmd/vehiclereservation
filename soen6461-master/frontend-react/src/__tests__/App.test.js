import React from 'react';
import { shallow, mount } from 'enzyme'
import App from '../App'
import ClientForm from '../components/clientForm';
import ClientListing from '../components/clientListing';
import RenderCarListing from '../components/listing/renderCarlisting';

/* Snapshot testing */
it("renders correctly", () => {
    const wrapper = shallow(
        <App />
    );

    expect(wrapper).toMatchSnapshot();
});


/* Test to check proper props are being passed down the Component */
const handleSubmit = () => {};

describe ('<ClientForm />', () => {
  // it ('contains Row', () => {
  //   const wrapper = mount(<ClientForm handleSubmit={handleSubmit} />)
  //   const value = wrapper.find('Row').text()
  //   expect(value).toEqual('John Doe')
  // })
  it ('accepts handleSubmit props', () => {
    const wrapper = mount(<ClientForm handleSubmit={handleSubmit} />);
    expect(wrapper.props().handleSubmit).toEqual(handleSubmit)
  })
})


/** Testing the method response */
describe('ClientListing handleChangeDate method', () => {
  it('should be handling handleChangeDate', () => {
    const wrapper = shallow(<ClientListing />);
    expect(wrapper.instance().handleChangeDate());
  });
});

/** Testing lists in the dom */
describe('RenderCarListing should have lists', () => {
  // it('should be handling handleChangeDate', () => {
  const wrapper = mount(<RenderCarListing />);
  expect(wrapper.find("li")).toHaveLength(0);
  // });
});
