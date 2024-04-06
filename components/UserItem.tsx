import React from "react";
import {Link, User} from "@nextui-org/react";

interface UserItemProps {
  un: string;
  name_show: string;
  avatar: string;
}

const UserItem: React.FC<UserItemProps> = ({ un, name_show, avatar }) => {
  return (
    <User
      name={name_show}
      description={(
        <Link href={"https://tieba.baidu.com/home/main?id="+avatar} size="sm" isExternal>
          @{un}
        </Link>
      )}
      avatarProps={{
        src: '/portrait/'+avatar,
        isBordered: true,
        color: "default"
      }}
    />
  )
}

export default UserItem;