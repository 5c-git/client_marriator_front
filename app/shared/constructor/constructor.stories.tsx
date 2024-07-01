import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import { withRouter } from "storybook-addon-remix-react-router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import inputsSchema from "./inputs.schema.json";
import { Inputs } from "./inputs";

import {
  generateDefaultValues,
  generateValidationSchema,
  generateInputsMarkup,
} from "./constructor";

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(inputsSchema);

const Сonstructor = ({ data }: { data: Inputs }) => {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    trigger,
    getValues,
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
      {generateInputsMarkup(data, errors, control, setValue, trigger, () => {
        console.log(getValues());
      })}

      <button type="submit">submit</button>
    </form>
  );
};

const DataLoader = ({ url }: { url: string }) => {
  const [data, setData] = useState<Inputs | undefined | null>(undefined);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: Inputs) => {
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
            code={JSON.stringify(inputsSchema, null, 2)}
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
              inputType: "text",
              name: "place",
              value: "Воркута",
              validation: "none",
              placeholder: "Куда доставить автомобиль?",
              error: "В данный город доставка не осуществляется",
            },
            {
              inputType: "radio",
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
              inputType: "checkbox",
              validation: "unchecked",
              name: "radioOne",
              value: false,
              label: "Моё доверенное лицо",
            },
            {
              inputType: "checkboxMultiple",
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
              inputType: "select",
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
              inputType: "select",
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
              inputType: "text",
              name: "firstName",
              value: "",
              validation: "default",
              placeholder: "Укажите имя",
            },
            {
              inputType: "text",
              name: "middleName",
              value: "",
              validation: "default",
              placeholder: "Укажите отчество",
            },
            {
              inputType: "text",
              name: "lastName",
              value: "",
              validation: "default",
              placeholder: "Укажите фамилию",
            },
            {
              inputType: "text",
              name: "funnyName",
              value: "Косой",
              validation: "none",
              placeholder: "Укажите кличку",
            },
            {
              inputType: "select",
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
              inputType: "file",
              name: "filee",
              value: "",
              // error: "ошибка!",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              placeholder: "Приложи документ",
              validation: "default",
            },
          ]);
        }),
        http.get("/photo", async () => {
          await delay(2000);
          return HttpResponse.json([
            // {
            //   inputType: "photo",
            //   name: "photo",
            //   value: "",
            //   url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
            //   validation: "default",
            // },
            {
              inputType: "phone",
              name: "phone",
              value: "",
              placeholder: "Номер телефона",
              validation: "default",
            },
            // {
            //   inputType: "date",
            //   name: "date",
            //   value: null,
            //   placeholder: "Укажите дату",
            //   validation: "default",
            // },
            // {
            //   inputType: "email",
            //   name: "email",
            //   value: "",
            //   placeholder: "Укажите email",
            //   validation: "default",
            // },
            // {
            //   inputType: "card",
            //   name: "card",
            //   value: "",
            //   placeholder: "Введите номер карты",
            //   validation: "default",
            // },
          ]);
        }),
        http.get("/step4", async () => {
          await delay(2000);
          return HttpResponse.json([
            {
              inputType: "photo",
              name: "photo",
              value: "",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              validation: "default",
            },
            {
              inputType: "text",
              name: "lastName",
              value: "",
              placeholder: "Фамилия",
              validation: "default",
            },
            {
              inputType: "text",
              name: "name",
              value: "",
              placeholder: "Имя",
              validation: "default",
            },
            {
              inputType: "radio",
              value: "",
              name: "isMiddleName",
              validation: "default",
              options: [
                {
                  value: "dontHave",
                  label: "Нет отчества",
                  disabled: false,
                },
                {
                  value: "have",
                  label: "Есть отчество",
                  disabled: false,
                },
              ],
            },
            {
              inputType: "text",
              name: "middleName",
              value: "",
              placeholder: "Отчество",
              validation: "default",
            },
            {
              inputType: "date",
              name: "birthday",
              value: null,
              placeholder: "Дата рождения",
              validation: "16years",
            },
            {
              inputType: "select",
              name: "sex",
              value: "",
              placeholder: "Пол",
              validation: "default",
              options: [
                {
                  value: "male",
                  label: "Мужской",
                  disabled: false,
                },
                {
                  value: "female",
                  label: "Женский",
                  disabled: false,
                },
              ],
            },
            {
              inputType: "phone",
              name: "phone",
              value: "",
              placeholder: "Мобильный телефон",
              validation: "default",
              dividerTop: true,
              helperInfo: {
                text: "Будет отправлен код подтверждения",
              },
            },
            {
              inputType: "radio",
              value: "",
              name: "messenger",
              validation: "default",
              options: [
                {
                  value: "whatsApp",
                  label: "WhatsApp",
                  icon: "whatsapp",
                  disabled: false,
                },
                {
                  value: "telegram",
                  label: "Telegram",
                  icon: "telegram",
                  disabled: false,
                },
                {
                  value: "viber",
                  label: "Viber",
                  icon: "viber",
                  disabled: false,
                },
                {
                  value: "no",
                  label: "Я не пользуюсь",
                  disabled: false,
                },
              ],
              heading: "Выбери мессенджер:",
            },
            {
              inputType: "email",
              name: "email",
              value: "",
              placeholder: "E-mail",
              validation: "default",
              helperInfo: {
                text: "Будет отправлен код подтверждения",
              },
            },
            {
              inputType: "radio",
              value: "",
              name: "passport",
              validation: "default",
              options: [
                {
                  value: "passport",
                  label: "Паспорт",
                  disabled: false,
                },
                {
                  value: "blank",
                  label: "Анкета соискателя",
                  disabled: false,
                },
              ],
              dividerTop: true,
              heading: "Документ удостоверяющий личность",
              helperInfo: {
                text: "Для изменения данных выбери тип документа и загрузи его фотографии",
              },
            },
            {
              inputType: "file",
              name: "passportDoc",
              value: "",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              placeholder: "Приложи документ",
              validation: "default",
            },
            {
              inputType: "file",
              name: "you",
              value: "",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              placeholder: "Приложи документ",
              validation: "default",
              heading: "Справка самозанятого",
              helperInfo: {
                text: "Для подтверждения приложи фотографию документа",
              },
            },
            {
              inputType: "file",
              name: "parents",
              value: "",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              placeholder: "Приложи документ",
              validation: "default",
              heading: "Согласие родителей",
              dividerTop: true,
              helperInfo: {
                text: "Для подтверждения приложи фотографию документа",
                link: {
                  type: "external",
                  path: "https://www.google.com/",
                  text: " Скачать шаблон.",
                },
              },
            },

            {
              inputType: "select",
              name: "clothes",
              value: "",
              placeholder: "Размер одежды",
              validation: "default",
              options: [
                {
                  value: "44-46",
                  label: "44-46",
                  disabled: false,
                },
                {
                  value: "46-48",
                  label: "46-48",
                  disabled: false,
                },
                {
                  value: "48-50",
                  label: "48-50",
                  disabled: false,
                },
              ],
            },
            {
              inputType: "select",
              name: "hairColor",
              value: "",
              placeholder: "Цвет волос",
              validation: "default",
              options: [
                {
                  value: "light",
                  label: "светлые",
                  disabled: false,
                },
                {
                  value: "dark",
                  label: "тёмные",
                  disabled: false,
                },
              ],
            },
            {
              inputType: "select",
              name: "hairLenght",
              value: "",
              placeholder: "Длина волос",
              validation: "default",
              options: [
                {
                  value: "short",
                  label: "Короткие",
                  disabled: false,
                },
                {
                  value: "normal",
                  label: "Средние",
                  disabled: false,
                },
                {
                  value: "long",
                  label: "Длинные",
                  disabled: false,
                },
              ],
            },
            {
              inputType: "file",
              name: "driverLicence",
              value: "",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              placeholder: "Приложи документ",
              validation: "default",
              heading: "Водительское удостоверение",
              dividerTop: true,
              helperInfo: {
                text: "Для подтверждения приложи фотографию документа",
              },
            },
            {
              inputType: "file",
              name: "medicalDriverLicence",
              value: "",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              placeholder: "Приложи документ",
              validation: "default",
              heading: "Медицинский допуск к управлению ТС",

              helperInfo: {
                text: "Для подтверждения приложи фотографию документа",
              },
            },
            {
              inputType: "file",
              name: "anyLicence",
              value: "",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              placeholder: "Приложи документ",
              validation: "default",
              heading: "Пример любого допуска к работе",
              helperInfo: {
                text: "Для подтверждения приложи фотографию документа",
              },
            },
            {
              inputType: "radio",
              value: "",
              name: "medBook",
              validation: "default",
              dividerTop: true,
              heading: "Медкнижка",
              options: [
                {
                  value: "have",
                  label: "В наличии",
                  disabled: false,
                },
                {
                  value: "dontHave",
                  label: "На оформлении",
                  disabled: false,
                },
              ],
            },
            {
              inputType: "file",
              name: "medBookFile",
              value: "",
              url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
              placeholder: "Приложи документ",
              validation: "default",
              helperInfo: {
                text: "Для подтверждения приложи фотографию документа",
              },
            },
          ]);
        }),
        http.get("/test", async () => {
          await delay(2000);
          return HttpResponse.json([
            {
              inputType: "photoCheckbox",
              name: "testitem",
              value: "directory_activities1",
              options: [
                {
                  value: "directory_activities1",
                  label: "Строитель",
                  disabled: false,
                  img: "/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
                },
                {
                  value: "directory_activities2",
                  label: "Продавец",
                  disabled: false,
                  img: "/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
                },
              ],
              validation: "default",
              dividerTop: true,
            },
          ]);
        }),
      ],
    },
  },
};
