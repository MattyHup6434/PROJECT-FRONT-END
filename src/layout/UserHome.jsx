import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function UserHome() {
  const { user } = useAuth();
  return (
    <div className="text-white">
      {user && (
        <>
          <div>ROLE: {user.role} || STATUS: {user?.id ? user.StatusUser:'NULL'}</div>
        </>
      )}
    </div>
  );
}
