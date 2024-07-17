import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { Avatar } from "@mui/material";
import { withRouter } from "storybook-addon-remix-react-router";

import { Menu } from "./Menu";

import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";
import { WalletIcon } from "~/shared/ui/Menu/icons/WalletIcon";
import { ProfileIcon } from "~/shared/ui/Menu/icons/ProfileIcon";

const meta = {
  title: "Общие компоненты/Menu",
  component: Menu,
  tags: ["autodocs"],
  decorators: [withRouter],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Description />
          <DocBlock.Canvas />
          <DocBlock.ArgTypes />
          <DocBlock.Stories />
        </>
      ),
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Menu (базовый вид)",
  args: {
    links: [
      {
        to: "/",
        notification: false,
        disabled: false,
        icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/wallet",
        notification: false,
        disabled: false,
        icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/profile",
        notification: false,
        disabled: false,
        icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
      },
    ],
  },
};

export const PrimaryDisabled: Story = {
  name: "Menu (отключенный)",
  args: {
    links: [
      {
        to: "/",
        notification: false,
        disabled: true,
        icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/wallet",
        notification: false,
        disabled: false,
        icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/profile",
        notification: false,
        disabled: false,
        icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
      },
    ],
  },
};

export const PrimaryAuth: Story = {
  name: "Menu (авторизованный)",
  args: {
    links: [
      {
        to: "/",
        notification: false,
        disabled: false,
        icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/wallet",
        notification: false,
        disabled: false,
        icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/profile",
        notification: false,
        disabled: false,
        icon: (
          <Avatar
            src="/client_marriator_front/mockImg/avatar.jpg"
            sx={{
              width: 30,
              height: 30,
              border: "1px solid",
              borderColor: "inherit",
            }}
          />
        ),
      },
    ],
  },
};

export const PrimaryAuthDisabled: Story = {
  name: "Menu (авторизованный отключенный)",
  args: {
    links: [
      {
        to: "/",
        notification: false,
        disabled: true,
        icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/wallet",
        notification: false,
        disabled: false,
        icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/profile",
        notification: false,
        disabled: true,
        icon: (
          <Avatar
            src="/client_marriator_front/mockImg/avatar.jpg"
            sx={{
              width: 30,
              height: 30,
              border: "1px solid",
              borderColor: "inherit",
            }}
          />
        ),
      },
    ],
  },
};

export const PrimaryAuthSelected: Story = {
  name: "Menu (авторизованный, выбранный пользователь)",
  args: {
    links: [
      {
        to: "/дlist",
        notification: false,
        disabled: false,
        icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/wallet",
        notification: false,
        disabled: false,
        icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/",
        notification: false,
        disabled: false,
        icon: (
          <Avatar
            src="/client_marriator_front/mockImg/avatar.jpg"
            sx={{
              width: 30,
              height: 30,
              border: "1px solid",
              borderColor: "inherit",
            }}
          />
        ),
      },
    ],
  },
};

export const PrimaryNotification: Story = {
  name: "Menu (уведомление)",
  args: {
    links: [
      {
        to: "/",
        notification: false,
        disabled: false,
        icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/wallet",
        notification: true,
        disabled: false,
        icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
      },
      {
        to: "/profile",
        notification: false,
        disabled: false,
        icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
      },
    ],
  },
};
