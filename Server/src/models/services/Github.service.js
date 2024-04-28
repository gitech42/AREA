const { disconnect } = require("mongoose");
const { Octokit } = require("octokit");

async function call_api_to_create_repo(user, repo_name, description_repo, mesCouille, antoine, temp) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

  const res = await octokit.request("POST /user/repos", {
    name: repo_name,
    description: description_repo,
    homepage: "https://github.com",
    private: false,
    is_template: true,
  });

  if (res.status == 201) {
    console.log(res.data);
  }
}

async function call_api_to_delete_repo(user, repo_name, temp, temp1, temp2, ttt) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

  const res = await octokit.request("DELETE /repos/{owner}/{repo}", {
    owner: user.github_username,
    repo: repo_name,
  });

  if (res.status == 204) {
    console.log("repo suprimer");
  }
}

async function call_api_to_get_forks_repo(user, repo_name, last_forks) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

  const res = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: user.github_username,
    repo: repo_name,
  });

  if (res.status == 200) {
    console.log(res.data.forks_count);
    forks = res.data.forks_count;
  }
  return {
    data: forks,
    check: forks !== parseInt(last_forks),
  };
}

async function call_api_to_get_vue_repo(user, repo_name, last_vue) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

   const res = await octokit.request("GET /repos/{owner}/{repo}", {
     owner: user.github_username,
     repo: repo_name,
   });

   if (res.status == 200) {
     // console.log(res.data);
     vue = res.data.subscribers_count;
   }
   
  return {
    data: vue,
    check: vue !== parseInt(last_vue),
  };
}

async function call_api_to_get_lastpush_repo(user, repo_name, last_push) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

  const res = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: user.github_username,
    repo: repo_name,
  });

  if (res.status == 200) {
    push = res.data.pushed_at;
  }
  if (last_push === undefined) {
    last_push = ""
  } else {
    last_push = last_push.replace("\"", "");
    last_push = last_push.replace("\"", "");
  }
  console.log("lastpush =====",last_push);

  return {
    data: push,
    check: push !== last_push,
  };
}

async function call_api_to_search_user(user, user_to_search) {
  const octokit = new Octokit({
    auth: user.github_token,
  });
  const res = await octokit.request("GET /users/{username}/repos", {
    username: user_to_search,
  });
  console.log(res.data);

  return {
    data: res.data,
  };
}

async function call_api_to_create_pr(
  user,
  repo_name,
  title_pr,
  body_msg,
  head_branche,
  base_branche
) {
  const octokit = new Octokit({
    auth: user.github_token,
  });
  const res = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
    owner: user.github_username,
    repo: repo_name,
    title: title_pr,
    body: body_msg,
    head: head_branche, // bra,che to merge
    base: base_branche, //generally master
  });
  if (res.status === 201) {
    console.log(res.data);
  }
}

async function call_api_to_check_if_pr_is_merge(user, repo_name, pull_number) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

  const res = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/merge",
    {
      owner: user.github_username,
      repo: repo_name,
      pull_number: pull_number,
    }
  );
  if (res.status === 204) {
    console.log(res.data);
    return {
      data: true,
      check: true
    }
  }
  else {
    return{
      data:false,
      check:false
    }
  }
}

async function call_api_to_merge_pr(
  user,
  repo_name,
  pull_number,
  title_commit,
  msg_commit,
  temp
) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

  const res = await octokit.request(
    "PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge",
    {
      owner: user.github_token,
      repo: repo_name,
      pull_number: pull_number,
      commit_title: title_commit,
      commit_message: msg_commit,
    }
  );
  if (res.status === 200) {
    console.log(res.data);
  }
}

async function call_api_to_rename_branche(
  user,
  repo_name,
  origin_branch,
  new_name_branch,
  temp, temp1
) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

  await octokit.request("POST /repos/{owner}/{repo}/branches/{branch}/rename", {
    owner: user.github_username,
    repo: repo_name,
    branch: origin_branch,
    new_name: new_name_branch,
  });
  if (res.status === 201) {
    console.log(res.data);
  }
}

async function call_api_to_merge_branche(
  user,
  repo_name,
  base_branche,
  head_branche,
  commit_msg,
  temp
) {
  const octokit = new Octokit({
    auth: user.github_token,
  });

  await octokit.request("POST /repos/{owner}/{repo}/merges", {
    owner: user.github_username,
    repo: repo_name,
    base: base_branche, //generally master
    head: head_branche,
    commit_message: commit_msg,
  });
  if (res.status == 201) {
    console.log(res.data);
  }
}

const all_github_action_reaction = {
  reactions: {
    "create repo": {
      functions: call_api_to_create_repo,
      description: "this reaction create a repository",
      name: "create repo",
      parameter: [
        "name of repo",
        "text",
        "description of repo",
        "text",
        "is private",
        "text",
      ],
    },
    "delete repo": {
      functions: call_api_to_delete_repo,
      description: "this reaction delete repository",
      name: "delete repo",
      parameter: ["name of repo", "text"],
    },
    "create pr": {
      functions: call_api_to_create_pr,
      description: "this reaction create pull request",
      name: "create pr",
      parameter: [
        "name of repo",
        "text",
        "title of pr",
        "text",
        "msg body",
        "text",
        "branche to merge with other",
        "text",
        "branch wich receipt the merge",
        "text",
      ],
    },
    "merge pr": {
      functions: call_api_to_merge_pr,
      description: "this reaction merge a pr",
      name: "merge pr",
      parameter: [
        "name of repo",
        "text",
        "pull number",
        "text",
        "title of commit",
        "text",
        "message of commit",
        "text",
      ],
    },
    "rename branch": {
      functions: call_api_to_rename_branche,
      description: "this reaction rename branch",
      name: "rename branch",
      parameter: [
        "name of repo",
        "text",
        "origin name of branch",
        "text",
        "new name to give to the branch",
        "text",
      ],
    },
    "merge branche": {
      functions: call_api_to_merge_branche,
      description: "this reaction merge branch",
      name: "merge branche",
      parameter: [
        "name of repo",
        "text",
        "branch which receipt the merge (generally master)",
        "text",
        "branch to merge with an other",
        "text",
        "commit message",
        "text",
      ],
    },
  },
  actions: {
    /////////////////////////////////////////////////
    //////// mising loop request to check view forks and push on a repo ////////////////
    /////////////////////////////////////////////////////
    "search user profil": {
      functions: call_api_to_search_user,
      description: "this action search a user profil",
      name: "search user profil",
      parameter: ["timer", "text","name of user", "text"],
      is_checker: false,
      is_timer: true
    },
    "check if pr is merge": {
      functions: call_api_to_check_if_pr_is_merge,
      description: "this action check if pr is merge",
      name: "check if pr is merge",
      parameter: ["name of repo", "text", "pull number", "text"],
      is_checker: true,
      is_timer: false,
    },
    "get forks repo": {
      functions: call_api_to_get_forks_repo,
      description: "get forks of repo",
      name: "get forks repo",
      parameter: ["name of repo", "text"],
      is_checker: true,
      is_timer: false,
    },
    "get lastpush repo": {
      functions: call_api_to_get_lastpush_repo,
      description: "get lastpush of repo",
      name: "get lastpush repo",
      parameter: ["name of repo", "text"],
      is_checker: true,
      is_timer: false,
    },
    "get vue repo": {
      functions: call_api_to_get_vue_repo,
      description: "get vue of repo",
      name: "get vue repo",
      parameter: ["name of repo", "text"],
      is_checker: true,
      is_timer: false,
    },
  },
};

module.exports = {
  call_api_to_create_repo,
  call_api_to_delete_repo,
  call_api_to_get_forks_repo,
  call_api_to_get_lastpush_repo,
  call_api_to_get_vue_repo,
  call_api_to_search_user,
  call_api_to_create_pr,
  call_api_to_check_if_pr_is_merge,
  call_api_to_merge_pr,
  call_api_to_rename_branche,
  all_github_action_reaction,
};
