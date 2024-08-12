import { Octokit } from "octokit";
const accessKey = import.meta.env.VITE_ACESS_KEY;
const octokit = new Octokit({
  auth: accessKey,
});

export default octokit;
