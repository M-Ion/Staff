import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../services/store/slices/user.slice";

type Props = {
  children?: ReactNode | ReactNode[];
  roles?: string[];
};

const OnlyAuth = ({ children, roles }: Props) => {
  const currentUser = useSelector(selectUser);

  const [forbid, setForbid] = useState<boolean>(true);

  const authorize = () => {
    let authorized = false;

    if (currentUser) {
      authorized = true;

      if (roles) {
        roles.forEach((role) => {
          if (!currentUser.roles.includes(role)) authorized = false;
        });
      }
    }

    setForbid(!authorized);
  };

  useEffect(() => {
    authorize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return forbid ? null : <>{children}</>;
};

export default OnlyAuth;
