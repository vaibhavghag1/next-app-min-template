"use client";
import { useEffect, useState } from "react";
import { Card, Button, Group } from "@mantine/core";
import {
  IconAt,
  IconPhone,
  IconWorld,
  IconUserPlus,
  IconUserMinus,
  IconTrash,
  IconStar,
} from "@tabler/icons-react";
import "./css/index.css";

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);

  useEffect(() => {
    const fetchUserListData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserListData();
  }, []);

  const generateAvatarUrl = (username: string) => {
    const uname = encodeURIComponent(username);
    return `https://api.dicebear.com/7.x/initials/svg?seed=${uname}`;
  };

  const handleFollowClick = (userId: number) => {
    if (followedUsers.includes(userId)) {
      setFollowedUsers(followedUsers.filter((id) => id !== userId));
    } else {
      setFollowedUsers([...followedUsers, userId]);
    }
  };

  const handleDeleteClick = (userId: number) => {
    const updatedData = data.filter((user: any) => user.id !== userId);
    setData(updatedData);
  };

  return (
    <div className="card-container">
      {data &&
        data.map((user: any) => (
          <Card
            key={user.id}
            shadow="xs"
            className="card"
            padding="lg"
            radius="md"
          >
            <div className="card-content">
              <img
                src={generateAvatarUrl(user.name)}
                className="avatar"
                alt="User Avatar"
              />
              <h3 className="user-name">
                {user.name}
                {followedUsers.includes(user.id) && (
                  <IconStar stroke={2} className="iconHeight" />
                )}
              </h3>
            </div>
            <div className="info">
              <p>
                <IconAt className="iconHeight" />
                {user.email}
              </p>
              <p>
                <IconPhone className="iconHeight" />
                {user.phone}
              </p>
              <p>
                <IconWorld className="iconHeight" />
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.website}
                </a>
              </p>
            </div>
            <Group
              align="center"
              className="button-group"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => handleFollowClick(user.id)}
                variant={
                  followedUsers.includes(user.id) ? "outline" : undefined
                }
                style={{ flex: 1, marginRight: "5px" }}
              >
                {followedUsers.includes(user.id) ? (
                  <IconUserMinus />
                ) : (
                  <IconUserPlus />
                )}
                {followedUsers.includes(user.id) ? "Unfollow" : "Follow"}
              </Button>

              <Button
                variant="outline"
                color="blue"
                onClick={() => handleDeleteClick(user.id)}
                style={{ flex: 1, marginLeft: "5px" }}
              >
                <IconTrash />
                Delete
              </Button>
            </Group>
          </Card>
        ))}
    </div>
  );
}
