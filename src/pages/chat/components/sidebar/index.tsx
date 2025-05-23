import { useNavigate } from "react-router-dom";
import { BsFillMoonFill, BsMoon } from "react-icons/bs";

import SidebarAlert from "./alert";
import InboxContact from "./contacts";
import OptionsMenu from "../option-menu";
import SearchField from "../search-field";
import Icon from "common/components/icons";
import { useAppTheme } from "common/theme";
import { Inbox } from "common/types/common.type";
import { useChatContext } from "pages/chat/context/chat";
import {
  Actions,
  Avatar,
  ContactContainer,
  Header,
  ImageWrapper,
  SidebarContainer,
  ThemeIconContainer,
} from "./styles";

export default function Sidebar() {
  const theme = useAppTheme();
  const navigate = useNavigate();
  const chatCtx = useChatContext();

  const handleChangeThemeMode = () => {
    theme.onChangeThemeMode();
  };

  const handleChangeChat = (chat: Inbox) => {
    chatCtx.onChangeChat(chat);
    navigate("/" + chat.id);
  };

  const handleMenuOption = (option: string) => {
    if (option === "Log out") {
      // Remove login flag from localStorage
      localStorage.removeItem("isLoggedIn");
      // Remove token from cookies (for completeness)
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Use React Router to reload the app
      navigate(0);
    }
    // Handle other options if needed
  };

  return (
    <SidebarContainer>
      <Header>
        <ImageWrapper>
          <Avatar src="/assets/images/profile.png" />
        </ImageWrapper>
        <Actions>
          <ThemeIconContainer onClick={handleChangeThemeMode}>
            {theme.mode === "light" ? <BsMoon /> : <BsFillMoonFill />}
          </ThemeIconContainer>
          <button aria-label="Status">
            <Icon id="status" className="icon" />
          </button>
          <button aria-label="New chat">
            <Icon id="chat" className="icon" />
          </button>
          <OptionsMenu
            iconClassName="icon"
            className="icon"
            ariaLabel="Menu"
            iconId="menu"
            options={[
              "New group",
              "Create a room",
              "Profile",
              "Archived",
              "Starred",
              "Settings",
              "Log out",
            ]}
            onSelect={handleMenuOption}
          />
        </Actions>
      </Header>
      <SidebarAlert />
      <SearchField />
      <ContactContainer>
        {chatCtx.inbox.map((inbox) => (
          <InboxContact
            key={inbox.id}
            inbox={inbox}
            isActive={inbox.id === chatCtx.activeChat?.id}
            onChangeChat={handleChangeChat}
          />
        ))}
      </ContactContainer>
    </SidebarContainer>
  );
}
