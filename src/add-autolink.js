


const fs = require('fs');
const core = require('@actions/core');
const { context } = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const token = core.getInput('token');
const keyPrefix = core.getInput('keyPrefix');
const url = core.getInput('url');

const octokit = new Octokit({ auth: token });
const { owner, repo } = context.repo;
console.log(`owner: ${owner}, repo: ${repo}`)


async function setAutolinkTag(txt, dest) {
  try {
    const keyPrefix = 'ab#';
    const url = 'https://dev.azure.com/Keyfactor/Integration/_workitems/edit/';

    const autolinks = await octokit.rest.repos.listAutolinks({
      owner,
      repo
    });
    const existingAutolink = autolinks.data.find((autolink) => autolink.key_prefix === keyPrefix);
    if (existingAutolink) {
      console.log(`Autolink exists: ${JSON.stringify(existingAutolink, null, 2)}`)
      core.setOutput('result', 'Autolink exists');
    } else {
      console.log(`Setting autolink reference for ${keyPrefix} on ${url}`);
      core.setOutput('result', 'Create Autolink');
      const setResult = await octokit.request('POST /repos/{owner}/{repo}/autolinks', {
        owner,
        repo,
        key_prefix: keyPrefix,
        url_template: url + '<num>',
        is_alphanumeric: true
      });
      console.log(setResult.data);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

setAutolinkTag('AB#', "http://https://dev.azure.com/Keyfactor/Integration/_workitems/edit/")
