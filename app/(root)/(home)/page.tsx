"use client";

import { useTheme } from "@/context/ThemeProvider";

import React from "react";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const mode = useTheme();

  return <div> Home Page</div>;
};

export default Home;
