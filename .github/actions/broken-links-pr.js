const { Octokit } = require('@octokit/action')

const octokit = new Octokit()

const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')

async function main() {
  const prs = await octokit.pulls.list({
    owner,
    repo,
    state: 'open',
    head: `${owner}:action-remove-broken-links`,
  })

  if (prs.data.length === 0) {
    const pr = await octokit.pulls.create({
      owner,
      repo,
      title: 'chore: delete apps with broken links',
      base: 'master',
      head: 'action-remove-broken-links',
      body: 'Auto-update from GitHub Actions.',
      maintainer_can_modify: true,
    })
    console.log('Pull request created:', pr.html_url)
  } else {
    console.log('Pull request updated:', prs.data[0].html_url)
  }
}

main()
