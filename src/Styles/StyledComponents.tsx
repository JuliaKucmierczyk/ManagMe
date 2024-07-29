import styled from "styled-components";

export const Header = styled.header``;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
export const Nav = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
export const Btn = styled.button`
  background-color: dodgerblue;
  color: white;
  padding: 0.6rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
export const User = styled.span`
  font-weight: 700;
  align-self: center;
`;
export const Kanban = styled.article`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
  gap: 3rem;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
export const Column = styled.div`
  background-color: #fff;
  padding: 20px;
  min-width: 20rem;
  min-height: 20rem;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease-in-out;

  ul {
    display: flex;
    flex-direction: column;
  }

  ul li {
    margin-bottom: 10px;
    padding: 10px 15px;
    border: 1px solid rgb(214, 214, 214);
    border-radius: 10px;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  ul li:hover {
    transform: translateY(-3px);
  }

  p {
    margin-bottom: 5px;
    font-size: 0.8rem;
  }

  p span {
    font-weight: bold;
  }

  h2 {
    margin-bottom: 15px;
    text-align: center;
    font-size: 1.2rem;
    color: #333;
  }
`;
export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  /* width: fit-content; */
  margin-top: 5rem;
  padding: 2rem;
  background-color: white;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 24rem;
  gap: 1rem;
  margin-top: 1rem;
`;
export const FormBtn = styled.button`
  background-color: dodgerblue;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  margin: 1rem 1rem 0 0;
  width: 6rem;

  &:hover {
    background-color: rgb(11, 82, 152);
  }
`;
export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
`;
export const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  resize: vertical;
  font-family: "Open Sans", sans-serif;
`;
export const Selector = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  resize: vertical;
`;
