import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import { withRouter } from "storybook-addon-remix-react-router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Ajv from "ajv";

import schema from "./constructor.schema.json";
import textInputSchema from "../ui/StyledTextField/StyledTextField.schema.json";
import selectInputSchema from "../ui/StyledSelect/StyledSelect.schema.json";
import radioInputSchema from "../ui/StyledRadioButton/StyledRadioButton.schema.json";
import checkboxMultipleSchema from "../ui/StyledCheckboxMultiple/StyledCheckboxMultiple.schema.json";
import photoCheckboxSchema from "../ui/StyledPhotoCheckbox/StyledPhotoCheckbox.schema.json";
import checkboxSchema from "../ui/StyledCheckbox/StyledCheckbox.schema.json";
import fileSchema from "../ui/StyledFileInput/StyledFileInput.schema.json";

import type { SchemaForConstructor } from "./constructor.type";

import {
  generateDefaultValues,
  generateValidationSchema,
  generateInputsMarkup,
} from "./constructor";

const ajv = new Ajv();

ajv.addSchema(textInputSchema);
ajv.addSchema(selectInputSchema);
ajv.addSchema(radioInputSchema);
ajv.addSchema(checkboxMultipleSchema);
ajv.addSchema(photoCheckboxSchema);
ajv.addSchema(checkboxSchema);
ajv.addSchema(fileSchema);

const validate = ajv.compile(schema);

const Сonstructor = ({ data }: { data: SchemaForConstructor }) => {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: generateDefaultValues(data),
    resolver: yupResolver(Yup.object(generateValidationSchema(data))),
    mode: "onChange",
  });

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((element) => {
        if (element.error !== undefined) {
          setError(element.name, {
            type: "custom",
            message: element.error,
          });
        }
      });
    }
  }, [data, setError]);

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(values);
      })}
      style={{
        display: "grid",
        rowGap: "16px",
      }}
    >
      {generateInputsMarkup(data, errors, control, setValue, trigger)}

      <button type="submit">submit</button>
    </form>
  );
};

const DataLoader = ({ url }: { url: string }) => {
  const [data, setData] = useState<SchemaForConstructor | undefined | null>(
    undefined
  );

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: SchemaForConstructor) => {
        if (validate(data)) {
          console.log("JSON SCHEMA VALID");
          setData(data);
        } else {
          console.log(validate.errors);
          alert("Полученный JSON объект не соответствует схеме!");
        }
      });
  }, [url]);

  if (data !== null && data === undefined) {
    return <p>Загрузка...</p>;
  }

  if (data === null) {
    return <p>Данные не соответствуют JSON Schema</p>;
  }

  return <Сonstructor data={data} />;
};

const meta = {
  title: "Конструктор Форм",
  component: DataLoader,
  tags: ["autodocs"],
  decorators: [withRouter],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Ресурсы:</h2>
          <p>
            <a href="https://transform.tools" target="_blank" rel="noreferrer">
              Transform
            </a>
          </p>
          <p>
            <a
              href="https://json-schema-faker.js.org/"
              target="_blank"
              rel="noreferrer"
            >
              JSON Schema to mock JSON
            </a>
          </p>

          <h2>Моковые запросы</h2>
          <p>
            ФИО{"  "} <strong>/fio</strong>
          </p>
          <p>
            Машины{"  "} <strong>/auto</strong>
          </p>

          <h3>
            Объект формы после успешного сабмита можно посмотреть в браузерной
            консоли, как и ошибки валидации JSON схемы
          </h3>

          <h2>JSON Schema</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(schema, null, 2)}
          />
          {/* <DocBlock.Canvas /> */}
          {/* <DocBlock.ArgTypes /> */}
          {/* <DocBlock.Stories /> */}
        </>
      ),
    },
  },
} satisfies Meta<typeof DataLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Конструктор",
  args: {
    url: "/auto",
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/auto", async () => {
          await delay(2000);
          return HttpResponse.json([
            {
              inputtype: "text",
              name: "place",
              value: "Воркута",
              validation: "none",
              placeholder: "Куда доставить автомобиль?",
              error: "В данный город доставка не осуществляется",
            },
            {
              inputtype: "radio",
              value: "",
              name: "radio",
              validation: "default",
              options: [
                {
                  value: "winter",
                  label: "Зима",
                  disabled: false,
                },
                {
                  value: "spring",
                  label: "Весна",
                  disabled: false,
                },
                {
                  value: "summer",
                  label: "Лето",
                  disabled: false,
                },
                {
                  value: "authum",
                  label: "Осень",
                  disabled: false,
                },
              ],
            },
            {
              inputtype: "checkbox",
              validation: "unchecked",
              name: "radioOne",
              value: false,
              label: "Моё доверенное лицо",
            },
            {
              inputtype: "checkboxMultiple",
              name: "chckbox",
              validation: "default",
              value: [],
              options: [
                {
                  value: "winter",
                  label: "Зима",
                  disabled: false,
                },
                {
                  value: "spring",
                  label: "Весна",
                  disabled: false,
                },
                {
                  value: "summer",
                  label: "Лето",
                  disabled: false,
                },
                {
                  value: "authum",
                  label: "Осень",
                  disabled: false,
                },
              ],
            },
            {
              inputtype: "select",
              name: "developer",
              value: "Volkswagen",
              placeholder: "Выберете марку",
              validation: "default",
              options: [
                {
                  value: "mercedes",
                  label: "Мерседес",
                  disabled: false,
                },
                {
                  value: "audi",
                  label: "Ауди",
                  disabled: false,
                },
                {
                  value: "vas",
                  label: "АвтоВаз",
                  disabled: true,
                },
                {
                  value: "Volkswagen",
                  label: "Фольксваген",
                  disabled: false,
                },
              ],
              status: "warning",
            },
            {
              inputtype: "select",
              name: "modelType",
              value: "",
              placeholder: "Выберете модель",
              validation: "default",
              options: [
                {
                  value: "S-Class",
                  label: "S-Class",
                  disabled: false,
                },
                {
                  value: "audiA4",
                  label: "Ауди A4",
                  disabled: false,
                },
                {
                  value: "vesta",
                  label: "Веста",
                  disabled: true,
                },
                {
                  value: "Passat",
                  label: "Пассат",
                  disabled: false,
                },
              ],
            },
          ]);
        }),
        http.get("/fio", async () => {
          await delay(2000);
          return HttpResponse.json([
            {
              inputtype: "text",
              name: "firstName",
              value: "",
              validation: "default",
              placeholder: "Укажите имя",
            },
            {
              inputtype: "text",
              name: "middleName",
              value: "",
              validation: "default",
              placeholder: "Укажите отчество",
            },
            {
              inputtype: "text",
              name: "lastName",
              value: "",
              validation: "default",
              placeholder: "Укажите фамилию",
            },
            {
              inputtype: "text",
              name: "funnyName",
              value: "Косой",
              validation: "none",
              placeholder: "Укажите кличку",
            },
            {
              inputtype: "select",
              name: "gender",
              value: "",
              placeholder: "Укажите пол",
              validation: "default",
              options: [
                {
                  value: "male",
                  label: "мужской",
                  disabled: false,
                },
                {
                  value: "female",
                  label: "женский",
                  disabled: false,
                },
                {
                  value: "transgender",
                  label: "Трансгендер",
                  disabled: true,
                },
              ],
              heading: "Неинклюзивное поле",
            },
          ]);
        }),
        http.get("/file", async () => {
          await delay(2000);
          return HttpResponse.json([
            {
              inputtype: "file",
              name: "filee",
              value: "",
              // error: "ошибка!",
              url: "https://api.escuelajs.co/api/v1/files/upload",
              placeholder: "Приложи документ",
              validation: "default",
            },
          ]);
        }),
      ],
    },
  },
};

// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "title": "Schema for Constructor",
//   "type": "array",
//   "minItems": 1,
//   "items": {
//     "anyOf": [
//       {
//         "type": "object",
//         "properties": {
//           "inputtype": {
//             "type": "string",
//             "const": "select"
//           },
//           "name": {
//             "type": "string"
//           },
//           "value": {
//             "type": ["string", "null"]
//           },
//           "placeholder": {
//             "type": "string"
//           },
//           "options": {
//             "type": "array",
//             "items": {
//               "type": "object",
//               "properties": {
//                 "value": {
//                   "type": "string"
//                 },
//                 "label": {
//                   "type": "string"
//                 },
//                 "disabled": {
//                   "type": "boolean"
//                 }
//               },
//               "required": ["value", "label", "disabled"]
//             }
//           },
//           "disabled": {
//             "type": "boolean",
//             "const": true
//           },
//           "validation": {
//             "type": "string",
//             "enum": ["none", "default"]
//           },
//           "heading": {
//             "type": "string"
//           },
//           "error": {
//             "type": "string"
//           },
//           "status": {
//             "type": "string",
//             "const": "warning"
//           },
//           "dividerTop": {
//             "type": "boolean",
//             "const": true
//           },
//           "dividerBottom": {
//             "type": "boolean",
//             "const": true
//           },
//           "helperInfo": {
//             "type": "object",
//             "minProperties": 1,
//             "properties": {
//               "text": {
//                 "type": "string"
//               },
//               "link": {
//                 "type": "object",
//                 "properties": {
//                   "text": {
//                     "type": "string"
//                   },
//                   "path": {
//                     "type": "string"
//                   },
//                   "type": {
//                     "type": "string",
//                     "enum": ["internal", "external"]
//                   }
//                 },
//                 "required": ["text", "path", "type"]
//               }
//             },
//             "additionalProperties": false
//           }
//         },
//         "required": ["inputtype", "name", "value", "placeholder", "options", "validation"]
//       },
//       {
//         "type": "object",
//         "properties": {
//           "inputtype": {
//             "type": "string",
//             "const": "text"
//           },
//           "name": {
//             "type": "string"
//           },
//           "value": {
//             "type": "string"
//           },
//           "placeholder": {
//             "type": "string"
//           },
//           "validation": {
//             "type": "string",
//             "enum": ["none", "default"]
//           },
//           "disabled": {
//             "type": "boolean",
//             "const": true
//           },
//           "heading": {
//             "type": "string"
//           },
//           "error": {
//             "type": "string"
//           },
//           "status": {
//             "type": "string",
//             "const": "warning"
//           },
//           "dividerTop": {
//             "type": "boolean",
//             "const": true
//           },
//           "dividerBottom": {
//             "type": "boolean",
//             "const": true
//           },
//           "helperInfo": {
//             "type": "object",
//             "minProperties": 1,
//             "properties": {
//               "text": {
//                 "type": "string"
//               },
//               "link": {
//                 "type": "object",
//                 "properties": {
//                   "text": {
//                     "type": "string"
//                   },
//                   "path": {
//                     "type": "string"
//                   },
//                   "type": {
//                     "type": "string",
//                     "enum": ["internal", "external"]
//                   }
//                 },
//                 "required": ["text", "path", "type"]
//               }
//             },
//             "additionalProperties": false
//           }
//         },
//         "required": ["inputtype", "name", "value", "placeholder", "validation"]
//       }
//     ]
//   }
// }
