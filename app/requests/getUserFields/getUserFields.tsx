import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import textSchema from "../../shared/ui/StyledTextField/StyledTextField.schema.json";
import selectSchema from "../../shared/ui/StyledSelect/StyledSelect.schema.json";
import radioSchema from "../../shared/ui/StyledRadioButton/StyledRadioButton.schema.json";
import checkboxMultipleSchema from "../../shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.schema.json";
import photoCheckboxSchema from "../../shared/ui/StyledPhotoCheckbox/StyledPhotoCheckbox.schema.json";
import checkboxSchema from "../../shared/ui/StyledCheckbox/StyledCheckbox.schema.json";
import fileSchema from "../../shared/ui/StyledFileInput/StyledFileInput.schema.json";
import photoSchema from "../../shared/ui/StyledPhotoInput/StyledPhotoInput.schema.json";
import phoneSchema from "../../shared/ui/StyledPhoneField/StyledPhoneField.schema.json";
import dateSchema from "../../shared/ui/StyledDateField/StyledDateField.schema.json";
import cardSchema from "../../shared/ui/StyledCardField/StyledCardField.schema.json";
import monthSchema from "../../shared/ui/StyledMonthField/StyledMonthField.schema.json";
import emailSchema from "../../shared/ui/StyledEmailField/StyledEmailField.schema.json";
import accountSchema from "../../shared/ui/StyledAccountField/StyledAccountField.schema.json";
import innSchema from "../../shared/ui/StyledInnField/StyledInnField.schema.json";
import snilsSchema from "../../shared/ui/StyledSnilsField/StyledSnilsField.schema.json";
import smsSchema from "../../shared/ui/StyledSmsField/StyledSmsField.schema.json";
import autocompleteSchema from "../../shared/ui/StyledAutocomplete/StyledAutocomplete.schema.json";
import selectMultipleSchema from "../../shared/ui/StyledSelectMultiple/StyledSelectMultiple.schema.json";

import getUserFieldsSchema from "./getUserFields.schema.json";
import { GetUserFieldsSuccess } from "./getUserFields.type";

const ajv = new Ajv();
addFormats(ajv);

ajv.addSchema(textSchema);
ajv.addSchema(selectSchema);
ajv.addSchema(radioSchema);
ajv.addSchema(checkboxMultipleSchema);
ajv.addSchema(photoCheckboxSchema);
ajv.addSchema(checkboxSchema);
ajv.addSchema(fileSchema);
ajv.addSchema(photoSchema);
ajv.addSchema(phoneSchema);
ajv.addSchema(dateSchema);
ajv.addSchema(cardSchema);
ajv.addSchema(monthSchema);
ajv.addSchema(emailSchema);
ajv.addSchema(accountSchema);
ajv.addSchema(innSchema);
ajv.addSchema(snilsSchema);
ajv.addSchema(smsSchema);
ajv.addSchema(autocompleteSchema);
ajv.addSchema(selectMultipleSchema);

const validateSuccess = ajv.compile(getUserFieldsSchema);

export const getUserFieldsKeys = ["getUserFields"];

export const getUserFields = async (
  accessToken: string,
  section: string
): Promise<GetUserFieldsSuccess> => {
  const url = new URL(import.meta.env.VITE_GET_USER_FIELDS);

  url.searchParams.append("section", section);

  const request = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const response = await request.json();

  let data;

  if (request.status === 401) {
    throw new Response("Unauthorized", {
      status: 401,
    });
  }

  if (validateSuccess(response)) {
    data = response as unknown as GetUserFieldsSuccess;
  } else {
    console.log(validateSuccess.errors);
    throw new Response(`Данные запроса getUserFields не валидны схеме`);
  }

  return data;
};

// MOCKS
export const mockResponseSuccess = {
  result: {
    formData: [
      {
        inputType: "text",
        name: "X2CSwnQZntQEdPc1Xq5lgeLahytrna",
        value: "test",
        disabled: false,
        validation: "default",
        placeholder: "Фамилия*",
      },
      {
        inputType: "select",
        name: "nalogstatus",
        value: "nalogstatus_samozanyatyj",
        disabled: false,
        options: [
          {
            value: "nalogstatus_samozanyatyj",
            label: "Самозанятый",
            disabled: false,
          },
          {
            value: "nalogstatus_fiz_lico",
            label: "Физическое лицо",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Налоговый статус",
        helperInfo: {
          link: {
            path: "https://lknpd.nalog.ru/auth/login",
            text: "Стань самозанятым",
            type: "internal",
          },
        },
      },
      {
        inputType: "checkbox",
        name: "xId3LKEIZ1w1hidPtsoEP2jPLvJoCz",
        value: false,
        label: "Мое доверенное лицо",
        disabled: false,
        validation: "none",
      },
      {
        inputType: "select",
        name: "bdM1RtrjFrn9STfGT3GG8AiU9NtqR2",
        value: "weight40",
        disabled: false,
        options: [
          {
            value: "weight40",
            label: "40",
            disabled: false,
          },
          {
            value: "weight42",
            label: "42",
            disabled: false,
          },
          {
            value: "weight44",
            label: "44",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Вес*",
      },
      {
        inputType: "inn",
        name: "9nuDjP3c3Ule99uIiPArhyE1rssGHF",
        value: "444444444444",
        label: "ИНН",
        disabled: false,
        validation: "none",
        placeholder: "ИНН",
        helperInfo: {
          link: {
            path: "https://service.nalog.ru/inn.do",
            text: "Узнай свой ИНН",
            type: "internal",
          },
        },
      },
      {
        inputType: "text",
        name: "QsZI3i3WLzO5rNO2ZJjXBtx9nJBosd",
        value: "test",
        disabled: false,
        validation: "default",
        placeholder: "Имя*",
      },
      {
        inputType: "text",
        name: "P93JuDTcWlnJfgOJOmM1VtP9vSVnK8",
        value: "",
        disabled: false,
        validation: "none",
        placeholder: "ФИО получателя",
      },
      {
        inputType: "checkbox",
        name: "jX8nCU3YLHkkME7fBUWnPKPfPhSuYT",
        value: true,
        label: "Да",
        disabled: false,
        validation: "none",
        heading: "Ограничить прием заявок?",
      },
      {
        inputType: "select",
        name: "qFq7ZZ6ADUYcAV2f6hDaS35yJ3T65z",
        value: "height140",
        disabled: false,
        options: [
          {
            value: "height140",
            label: "140",
            disabled: false,
          },
          {
            value: "height141",
            label: "141",
            disabled: false,
          },
          {
            value: "height142",
            label: "142",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Рост*",
      },
      {
        inputType: "snils",
        name: "IloSAoeA5hNj6iKQuM3saaBSmw7nvC",
        value: "44444444444",
        label: "СНИЛС",
        disabled: false,
        validation: "none",
        placeholder: "СНИЛС",
        helperInfo: {
          link: {
            path: "https://es.pfrf.ru/",
            text: "Электронные услуги и сервисы СФР",
            type: "internal",
          },
        },
      },
      {
        inputType: "selectMultiple",
        name: "RjJLN6y6qDD9KBwKyKFbnaIlLRRiMs",
        value: [],
        placeholder: "",
        disabled: false,
        options: [
          {
            value: "directory_organization_KTkwbD8zAXPy0l4WbKaMa6dggbVUce",
            label: "ИП Белкин",
            disabled: false,
          },
          {
            value: "directory_organization_ZES8p5khlCP5Bnk8F5H4BkoX7d7nK4",
            label: 'ООО "БиЭнТи Альянс"',
            disabled: false,
          },
        ],
        validation: "default",
        heading: "От каких организаций принимать заявки?",
      },
      {
        inputType: "checkbox",
        name: "qfyZsDpYNPdRGxZFdPrbNPZhR5oHI5",
        value: true,
        label: "Есть отчество",
        disabled: false,
        validation: "none",
      },
      {
        inputType: "file",
        name: "cjQR6vTQzEopYaOmlvFyAKaplVQlh4",
        value:
          "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/YOZubUGBtyjXthyFdj52.pdf",
        disabled: false,
        placeholder: "Приложи документ",
        validation: "default",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Адрес регистрации",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "select",
        name: "5nibSuUwMDHHB965TRu8iT4exCxhRN",
        value: "4444444343444444444444",
        disabled: false,
        options: [
          {
            value: "directory_bank_qvaF529W1qOjnHSwKv32TiFCXgloVS",
            label: '"ИНТЕРАКТИВНЫЙ БАНК" (ООО)',
            disabled: false,
          },
          {
            value: "alfa2",
            label: "АльфаБанк",
            disabled: false,
          },
          {
            value: "sber1",
            label: "Сбербанк",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "БИК",
      },
      {
        inputType: "select",
        name: "87ONZiY1OqKYKiTsrKZ5q1y0KsuH2n",
        value: "shoes35",
        disabled: false,
        options: [
          {
            value: "shoes35",
            label: "35",
            disabled: false,
          },
          {
            value: "shoes355",
            label: "35.5",
            disabled: false,
          },
          {
            value: "shoes36",
            label: "36",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Размер обуви*",
      },
      {
        inputType: "text",
        name: "NU6zM7fYI1dK3MV9MITtlpvhybVkez",
        value: "",
        disabled: false,
        validation: "default",
        placeholder: "Отчество*",
      },
      {
        inputType: "account",
        name: "n1bZyr8bWZYmCOcT5KFQg1MRqvQzj2",
        value: "4444444444",
        label: "Лицевой счет",
        disabled: false,
        validation: "default",
        placeholder: "Лицевой счет",
      },
      {
        inputType: "file",
        name: "PNHKP24PzkJcUGI492xRoK4FdxVGmZ",
        value:
          "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/MwD98VjrzjsmmYFIITIO.pdf",
        disabled: false,
        placeholder: "Приложи документ*",
        validation: "default",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Миграционная карта",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "select",
        name: "3tslFpWgadwSvvmDXQ6rvvc3aTfd47",
        value: "size44-46",
        disabled: false,
        options: [
          {
            value: "size44-46",
            label: "44-46",
            disabled: false,
          },
          {
            value: "size48-50",
            label: "48-50",
            disabled: false,
          },
          {
            value: "size52-54",
            label: "52-54",
            disabled: false,
          },
          {
            value: "size56-58",
            label: "56-58",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Размер одежды*",
      },
      {
        inputType: "select",
        name: "PuGyZOcha8UkkMywTQw2Wa4DcLlD5m",
        value: "2024-07-10",
        disabled: false,
        options: [
          {
            value: "directory_age_QEHdyudK0aqJLIri74Q1yBvKVQ2TPB",
            label: "16",
            disabled: false,
          },
          {
            value: "directory_age_5A3mDbMYbHpYDBaWSKW3Zx75JPgjZc",
            label: "17",
            disabled: false,
          },
          {
            value: "directory_age_ocVO5J9l420eOrfNn4fTRJGlcQPTVj",
            label: "18",
            disabled: false,
          },
          {
            value: "directory_age_7ee1n5WzxlUVeK7jW2Rgk8O1W8L8Sb",
            label: "19",
            disabled: false,
          },
          {
            value: "directory_age_pc5AOqbqVueQNGN5rwclZouQc7gbm2",
            label: "20",
            disabled: false,
          },
          {
            value: "directory_age_zUaUL7IWXpcIR9oo7FSo5nUKh002KU",
            label: "21",
            disabled: false,
          },
          {
            value: "directory_age_eKBTF8af3a3vdGXDXt3PxHsgMO4EhD",
            label: "22",
            disabled: false,
          },
          {
            value: "directory_age_VCqnRS8pQKP99qMF31ymstnaNqemwj",
            label: "23",
            disabled: false,
          },
          {
            value: "directory_age_7Zrj5DB7350Y0FxVjUE8m4SVmsswLT",
            label: "24",
            disabled: false,
          },
          {
            value: "directory_age_22zkC6sl4qo0ITOKopxhBwwm0FiDcD",
            label: "25",
            disabled: false,
          },
          {
            value: "directory_age_jNnm2raFfQQ2c0DEWn0jOaXc2afZoT",
            label: "26",
            disabled: false,
          },
          {
            value: "directory_age_dobJSzuU94Ta9RitXi4MV2Y7sxhI3G",
            label: "27",
            disabled: false,
          },
          {
            value: "directory_age_WKEjM9OSoYDngcJoalG68SqoRI0mpS",
            label: "28",
            disabled: false,
          },
          {
            value: "directory_age_tHAR0mbV2B8sd3bOKIGU75JavZqQ8l",
            label: "29",
            disabled: false,
          },
          {
            value: "directory_age_IrlSYHmEbfGXS8eHxrqzFvcqaO9Hsj",
            label: "30",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Возраст (полных лет) *",
      },
      {
        inputType: "file",
        name: "ZmHWXnDnL3VQmQPzt8cj4FFbVRzssN",
        value: "",
        disabled: false,
        placeholder: "Приложи документ",
        validation: "none",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Дактилоскопия",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "select",
        name: "HP2kvziquWyhpAPv9UmhlkRaIISQWz",
        value: "volosy_dlinnye",
        disabled: false,
        options: [
          {
            value: "volosy_dlinnye",
            label: "Длинные",
            disabled: false,
          },
          {
            value: "volosy_korotkie",
            label: "Короткие",
            disabled: false,
          },
          {
            value: "volosy_srednie",
            label: "Средние",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Длина волос*",
      },
      {
        inputType: "card",
        name: "HpecJclZpUWpkI7voOZmYrjv06PG3a",
        value: "",
        label: "Номер банковской карты",
        disabled: false,
        validation: "default",
        placeholder: "Номер банковской карты",
      },
      {
        inputType: "select",
        name: "7nNCUNdoVpAy5x1gXYp6jgvrvxOSqm",
        value: "",
        disabled: false,
        options: [
          {
            value: "volosy_svetlye",
            label: "Светлые",
            disabled: false,
          },
          {
            value: "volosy_temnye",
            label: "Темные",
            disabled: false,
          },
        ],
        validation: "none",
        placeholder: "Цвет волос",
      },
      {
        inputType: "checkbox",
        name: "QtbukuJ4ALhNnMCwBQvA9PE5pIu6Zh",
        value: true,
        label: "Да",
        disabled: false,
        validation: "none",
        heading: "Платежи по номеру банковской карты?",
      },
      {
        inputType: "file",
        name: "MZ562TBT1VVWW7nYNJcPG4BlBFRXSc",
        value:
          "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/VfAF0eTmUk1ZrRq7LkEu.pdf",
        disabled: false,
        placeholder: "Приложи документ*",
        validation: "default",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Водительское удостоверение",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "select",
        name: "unC20BLqzsZbEEGWlnT663EkueUBUi",
        value: "male_gender",
        disabled: false,
        options: [
          {
            value: "female_gender",
            label: "Женский",
            disabled: false,
          },
          {
            value: "male_gender",
            label: "Мужской",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Пол*",
      },
      {
        inputType: "file",
        name: "NhJmY9kzLgrF5vwVix7BiEMCXu3Skl",
        value: "",
        disabled: false,
        placeholder: "Приложи документ",
        validation: "none",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Уведомление о прибытии",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "file",
        name: "nCbrHGJ11nqZrAcBzMhQgJUsK5aJ4y",
        value:
          "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/zCIrVphq1ss6I8cR5KpH.pdf",
        disabled: false,
        placeholder: "Приложи документ*",
        validation: "default",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Медицинский допуск к управлению ТС",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
        drawerInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "file",
        name: "4qTJxPiblqfk0MySQBb6ErqHH2k6NT",
        value: "",
        disabled: false,
        placeholder: "Приложи документ",
        validation: "none",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Патент",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "month",
        name: "ktnWQlExQvDV7ucFdFOyW7ekL8aREv",
        value: "2021-08-03",
        label: "Срок действия карты",
        disabled: false,
        validation: "default",
        placeholder: "Срок окончания действия карты",
      },
      {
        inputType: "file",
        name: "X8pLILRyG3rqSixdugK8fo2ng0Qn75",
        value: "",
        disabled: false,
        placeholder: "Приложи документ",
        validation: "none",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Квитанция оплаты патента",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "select",
        name: "pnIXSuSWPMsx1T5IVWU7x9SNBZ7Ss4",
        value: "mess-Telegram",
        disabled: false,
        options: [
          {
            value: "mess-Telegram",
            label: "Telegram",
            disabled: false,
          },
          {
            value: "mess-Viber",
            label: "Viber",
            disabled: false,
          },
          {
            value: "mess-WhatsApp",
            label: "WhatsApp",
            disabled: false,
          },
          {
            value: "mess-not",
            label: "Я-не-пользуюсь",
            disabled: false,
          },
        ],
        validation: "default",
        heading: "Выбери мессенджер:*",
        placeholder: "",
      },
      {
        inputType: "file",
        name: "TA8vxv9JUcfHTtYC1Q3nFiZ4kWgULT",
        value:
          "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/3AnrOnZFZOGT5nuPF49y.pdf",
        disabled: false,
        placeholder: "Приложи документ*",
        validation: "none",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Пример любого допуска к работе",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "file",
        name: "8nnGyBf1OErAWa8EZkispver2ozsHO",
        value: "",
        disabled: false,
        placeholder: "Приложи документ",
        validation: "none",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "Разрешение на работу",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "file",
        name: "2Vr2TFKPAmY12FHtnyqWr2Sngg9F6s",
        value:
          "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/fhbqB2cJp5nYhWO80TVs.pdf",
        disabled: false,
        placeholder: "Приложи документ*",
        validation: "none",
        url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile/",
        heading: "ОСАГО",
        helperInfo: {
          text: "Для подтверждения приложи фотографию документа",
        },
      },
      {
        inputType: "text",
        name: "WJWEOeCGKJMKHNrlDbat5QfuEXXo4a",
        value: "444444444444444",
        disabled: false,
        validation: "none",
        placeholder: "Код супервайзера",
        helperInfo: {
          text: "При регистрации с помощью супервайзера введите его уникальный код",
        },
      },
      {
        inputType: "photoCheckbox",
        name: "testitem",
        value: ["directory_activities1"],
        disabled: false,
        options: [
          {
            value: "directory_activities_5pHRd5GLhXfs2DXtwmQoAt6tdT9scU",
            label: "Безопасность",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_6YMPeugNHX07gh6RjJEtdNOebuQOnQ",
            label: "Бэк-офис",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_wj7SyGXYISVgbnJqv64iBmVbY47bHt",
            label: "Доставка",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_buy800vaDyuZiAOc4TaVFk2NVb37pp",
            label: "Досуг",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_9MZkzPCw1LSwdpWpNtXjRKqH7dwjpa",
            label: "ЖКХ",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_ByVw4HmlpWpAU53OmRwqGTGyTHr0sH",
            label: "Колл-центр",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities2",
            label: "Магазин",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_vGTGwKChg2jO98T6CyD3hgItuvdQbz",
            label: "Маркетинг",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_9XPf1G7EP98vzDD6cg3jPT5gd35LOA",
            label: "Общепит",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_pX9g4QHPuAWtflp3KeCG7TAyVEqzrk",
            label: "Производство",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_T3epGchK36k0ZO8d2AA004QPHPKcBP",
            label: "Рекрутинг",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_cvIQuhGRCZqnD5JTXBeod3U2aibtrM",
            label: "Сельское хозяйство",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_b3z92flmK8aOMS9Crm0q1WqsJOglAu",
            label: "Склад",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities1",
            label: "Строитель",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
        ],
        validation: "default",
        heading: "Выбери чем хочешь заниматься",
        dividerTop: true,
      },
    ],
    type: "needRequired",
    section: [
      {
        name: "Персональные данные",
        value: 1,
        notification: true,
      },
      {
        name: "Допуски, справки, удостоверения",
        value: 2,
        notification: false,
      },
      {
        name: "Радиус поиска работы",
        value: 3,
        notification: false,
      },
      {
        name: "Документы иностранного гражданина",
        value: 4,
        notification: false,
      },
    ],
  },
  status: "success",
};

export const mockResponseSuccessEmpty = {
  result: {
    formData: [],
    type: "needRequired",
    section: [
      {
        name: "Персональные данные",
        value: 1,
        notification: true,
      },
      {
        name: "Допуски, справки, удостоверения",
        value: 2,
        notification: false,
      },
      {
        name: "Радиус поиска работы",
        value: 3,
        notification: false,
      },
      {
        name: "Документы иностранного гражданина",
        value: 4,
        notification: false,
      },
    ],
  },
  status: "success",
};

export const getUserFieldsMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_FIELDS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccessEmpty);
  }
);
