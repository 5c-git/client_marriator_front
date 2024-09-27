import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

type MaskedFieldProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
};

export const MaskedField = forwardRef<HTMLInputElement, MaskedFieldProps>(
  function MaskedInput(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        overwrite
        mask={props.mask}
        inputRef={ref}
        unmask={true}
        definitions={{
          p: /[7]/,
        }}
        onAccept={(value: string, _, event) => {
          if (event) {
            onChange({ target: { name: props.name, value } });
          }
        }}
      />
    );
  }
);
