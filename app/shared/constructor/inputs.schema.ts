import { z } from "zod";

import { text } from "../ui/StyledTextField/StyledTextField.schema";
import { snils } from "../ui/StyledSnilsField/StyledSnilsField.schema";
import { sms } from "../ui/StyledSmsField/StyledSmsField.schema";
import { select } from "../ui/StyledSelect/StyledSelect.schema";
import { radio } from "../ui/StyledRadioButton/StyledRadioButton.schema";
import { photo } from "../ui/StyledPhotoInput/StyledPhotoInput.schema";
import { photoCheckbox } from "../ui/StyledPhotoCheckbox/StyledPhotoCheckbox.schema";
import { phone } from "../ui/StyledPhoneField/StyledPhoneField.schema";
import { month } from "../ui/StyledMonthField/StyledMonthField.schema";
import { inn } from "../ui/StyledInnField/StyledInnField.schema";
import { file } from "../ui/StyledFileInput/StyledFileInput.schema";
import { email } from "../ui/StyledEmailField/StyledEmailField.schema";
import { date } from "../ui/StyledDateField/StyledDateField.schema";
import { checkboxMultiple } from "../ui/StyledCheckboxMultiple/StyledCheckboxMultiple.schema";
import { checkbox } from "../ui/StyledCheckbox/StyledCheckbox.schema";
import { card } from "../ui/StyledCardField/StyledCardField.schema";
import { account } from "../ui/StyledAccountField/StyledAccountField.schema";
import { selectMultiple } from "../ui/StyledSelectMultiple/StyledSelectMultiple.schema";
import { autocomplete } from "../ui/StyledAutocomplete/StyledAutocomplete.schema";
import { bic } from "../ui/StyledAutocompleteBic/StyledAutocompleteBic.schema";

export const inputs = z
  .array(
    z.union([
      text,
      snils,
      sms,
      select,
      radio,
      photo,
      photoCheckbox,
      phone,
      month,
      inn,
      file,
      email,
      date,
      checkboxMultiple,
      checkbox,
      card,
      account,
      selectMultiple,
      autocomplete,
      bic,
    ]),
  )
  .min(1);

export type Inputs = z.infer<typeof inputs>;
