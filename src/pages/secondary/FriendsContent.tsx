import {User, Link} from "@nextui-org/react";


function Example () {
    return (
        <User   
      name="Junior Garcia"
      description={(
        <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
          @jrgarciadev
        </Link>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
        isBordered: true,
        color: "default" 
      }}
    />
    )
}

function UserItem (un: string, uid: string, avatar: string) {
    return (
        <User   
      name={un}
      description={(
        <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
          {uid}
        </Link>
      )}
      avatarProps={{
        src: avatar,
        isBordered: true,
        color: "default" 
      }}
    />
    )
}

function FriendsContent() {
  return (
    <div>
      <h1>Friends</h1>
      <div className="grid grid-cols-4 gap-4">
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      </div>


    </div>
  );
}

export default FriendsContent;