import { KeyboardEvent, useState } from "react";
import { styled } from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoArrowUpCircle } from "react-icons/io5";

interface InputProps {
  disabled: boolean;
  setState: React.Dispatch<React.SetStateAction<{ queries: string; answers: string }[]>>;
}

const Input = (props: InputProps) => {
  const { disabled, setState } = props;

  const [value, setValue] = useState<string>("");

  const handleOnSubmit = () => {
    if (value.trim() === "") return null;
    else {
      setState((prev) => [...prev, { queries: value, answers: "" }]);
      setValue("");
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // 한글은 자음과 모음의 조합으로 끝난상태인지 파악하기 어렵기 때문에 방어 필요
    if (event.nativeEvent.isComposing) return;

    if (event.code === "Enter") {
      event.preventDefault();
      handleOnSubmit();
    }
  };

  return (
    <StyledInputContainer>
      <StyledInputWrppaer>
        <StyledAddFileIcon />
        <StyledInput
          placeholder="질문하기"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleOnKeyDown(e)}
          disabled={disabled}
        />
        <StyledSubmitIcon onClick={handleOnSubmit} />
      </StyledInputWrppaer>
    </StyledInputContainer>
  );
};

export default Input;

const StyledInputContainer = styled.div`
  width: -webkit-fill-available;
  position: absolute;
  bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
`;

const StyledInputWrppaer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 30px;
  width: -webkit-fill-available;
  outline: none;
  border: none;
  background-color: #1E1F20;
  color : #cdced0;
  border-radius: 4px;
  padding-left: 8px;
  font-size: 0.765rem;

  &::placeholder {
    color: #cdced0;
  }
  f
`;

const StyledAddFileIcon = styled(AiOutlinePlusCircle)`
  color: #444654;
  font-size: 1.45rem;
  margin-top: 0.3rem;
  cursor: pointer;
`;

const StyledSubmitIcon = styled(IoArrowUpCircle)`
  color: #4b89d4;
  position: absolute;
  font-size: 1.45rem;
  right: 8px;
  top: 5px;
`;
