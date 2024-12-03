import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import Certificates from "./certificates";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { json } from "react-router";
import { delay, http, HttpResponse } from "msw";

import {
  getDocumentInquiries,
  mockResponseSuccess as Inquiries,
} from "~/requests/getDocumentInquiries/getDocumentInquiries";
import {
  getCompanyAndCertificatesInquiries,
  mockResponseSuccess as CertificatesInquiries,
} from "~/requests/getCompanyAndCertificatesInquiries/getCompanyAndCertificatesInquiries";
import {
  postRequestInquiries,
  mockResponseSuccess as postInquiries,
} from "~/requests/postRequestInquiries/postRequestInquiries";

const meta = {
  title: "Страницы/Внутренние/Профиль/Документы/Cправки",
  component: Certificates,
  tags: ["autodocs"],
  decorators: [withRouter],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /profile/documents/certificates</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getDocumentInquiries() - VITE_GET_DOCUMENTS_INQUIRIES -{" "}
            {import.meta.env.VITE_GET_DOCUMENTS_INQUIRIES}
          </p>
          <p>
            getCompanyAndCertificatesInquiries() -
            VITE_GET_COMPANY_AND_CERTIFICATES_INQUIRIES -{" "}
            {import.meta.env.VITE_GET_COMPANY_AND_CERTIFICATES_INQUIRIES}
          </p>
          <p>
            postRequestInquiries() - VITE_REQUEST_INQUIRIES -{" "}
            {import.meta.env.VITE_REQUEST_INQUIRIES}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Certificates>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_DOCUMENTS_INQUIRIES, async () => {
          await delay(2000);
          return HttpResponse.json(Inquiries);
        }),
        http.get(
          import.meta.env.VITE_GET_COMPANY_AND_CERTIFICATES_INQUIRIES,
          async () => {
            await delay(2000);
            return HttpResponse.json(CertificatesInquiries);
          }
        ),
        http.post(import.meta.env.VITE_REQUEST_INQUIRIES, async () => {
          await delay(2000);
          return HttpResponse.json(postInquiries);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/documents/certificates",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const certificatesData = await getDocumentInquiries("token");
              const fieldsData = await getCompanyAndCertificatesInquiries(
                "token"
              );

              return json({
                certificates: certificatesData.result,
                fields: fieldsData.result,
              });
            },
            action: async (request) => {
              const fields = await request.request.json();

              await postRequestInquiries(
                "token",
                fields.organization,
                fields.certificate
              );

              return null;
            },
          },
        ],
      },
    }),
  },
};
