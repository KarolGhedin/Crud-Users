import axios from "axios";
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
display: flex;
align-items: flex-end;
gap: 10px;
flex-wrap: wrap;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
`;

const InputArea = styled.div`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
width: 120px;
padding: 0 10px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;
`;

const Label = styled.label ``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({getUsers, onEdit, setOnEdit}) =>{
    const ref = useRef();
    useEffect(() => {
        if (onEdit) {
          const user = ref.current;
    
          user.name.value = onEdit.name;
          user.mail.value = onEdit.mail;
          user.age.value = onEdit.age;
          user.birth_date.value = onEdit.birth_date;
        }
      }, [onEdit]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const user = ref.current;
    
        if (
          !user.name.value ||
          !user.mail.value ||
          !user.age.value ||
          !user.birth_date.value
        ) {
          return toast.warn("Fill in your information.");
        }
    
        if (onEdit) {
          await axios
            .put("http://localhost:8800/" + onEdit.id, {
              name: user.name.value,
              mail: user.mail.value,
              age: user.age.value,
              birth_date: user.birth_date.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
          await axios
            .post("http://localhost:8800", {
              name: user.name.value,
              email: user.mail.value,
              age: user.age.value,
              birth_date: user.birth_date.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }
    
        user.name.value = "";
        user.mail.value = "";
        user.age.value = "";
        user.birth_date.value = "";
    
        setOnEdit(null);
        getUsers();
      };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
            <Label>Name</Label>
            <Input name="name" />
            </InputArea>
            <InputArea>
            <Label>Email</Label>
            <Input name="mail" />
            </InputArea>
            <InputArea>
            <Label>Age</Label>
            <Input name="age" />
            </InputArea>
            <InputArea>
            <Label>Birth Date</Label>
            <Input name="birth_date" type="date" />
            </InputArea>

            <Button type="submit">SUBMIT</Button>
        </FormContainer>
    );
};

export default Form;
