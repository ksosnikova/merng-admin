import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text with authorization', () => {
  render(<App />);
  const linkElement = screen.getByText('Авторизация');
  expect(linkElement).toBeInTheDocument();
});


// import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import { ProfileCard } from "./ProfileCard";

// let container = null;

// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// const profile = {
//   name: 'Kateryna',
//   gender: 'женский',
//   city: 'Киев'
// }

// describe('ProfileCard component', () => {
//   it("renders with profile props", () => {
//     act(() => {
//       render(<ProfileCard />, container);
//     });
//     expect(container.textContent).toBe("Профиль имя:");
//   });

  // it('should render with props', () => {
  //   const onClick = jest.fn();
  
  //   act(() => {
  //     render(<Button {...props} onClick={onClick} />, container);
  //   });
  
  //   const button = container.querySelector('button');
  
  //   expect(button.textContent).toEqual('someText');


  // act(() => {
  //   render(<ProfileCard name="Петя" />, container);
  // });
  // expect(container.textContent).toBe("имя: Петя");
//});