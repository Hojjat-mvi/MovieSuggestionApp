import { useState } from "react";
import "../Input.scss";

export const Search = (props: {
  search: (value: string) => void;
  val: string;
}) => {
  const [value, setValue] = useState(props.val);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="container">
      <div className="container__item">
        <form className="form">
          <input
            type="search"
            className="form__field"
            placeholder="Search your movie"
            value={value}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn--primary btn--inside uppercase"
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              props.search(value);
            }}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
