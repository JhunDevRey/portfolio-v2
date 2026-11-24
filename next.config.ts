import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop `next dev` from recreating AGENTS.md / CLAUDE.md
  agentRules: false,
};

export default nextConfig;
