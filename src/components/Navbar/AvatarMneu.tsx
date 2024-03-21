"use client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { profileClick } from "./actions";

interface AvatarMenuProps {
  userImage: string;
}

interface AvatarMenuState {}

class AvatarMenu extends React.Component<AvatarMenuProps, AvatarMenuState> {
  constructor(props: AvatarMenuProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Avatar className="w-9 h-9" onClick={() => profileClick()}>
        <AvatarImage src={this.props.userImage} />
      </Avatar>
    );
  }
}

export default AvatarMenu;
