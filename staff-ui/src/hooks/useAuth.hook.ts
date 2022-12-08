import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../services/store/slices/user.slice";
import { User } from "../types/user.types";

export default function useAuth(roles: string[] = []): [User | null, boolean] {
  const currentUser = useSelector(selectUser);
  const [authorized, setAuthorized] = useState<boolean>(false);

  if (!currentUser) window.location.replace("/login");

  if (currentUser && roles.length > 0) {
    if (!currentUser.roles.find((r) => roles.includes(r))) {
      setAuthorized(false);
      window.location.replace("/login");
    }
  }

  return [currentUser, authorized];
}
