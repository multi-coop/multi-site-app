
export const gitProviders = {
  github: {
    root: 'https://github.com/',
    raw: 'https://raw.githubusercontent.com/',
    fix: ''
    // root: 'https://github.com                /co-demos/multi-site-contents/ blob/ master/config/global.md',
    // raw:  'https://raw.githubusercontent.com /co-demos/multi-site-contents/       master/config/global.md',
  },
  gitlab: {
    root: 'https://gitlab.com/',
    raw: 'https://gitlab.com/',
    fix: '/-/raw/'
    // root: 'https://gitlab.com/jailbreak/jailbreak.paris/ -/blob/ master/package.json'
    // raw:  'https://gitlab.com/jailbreak/jailbreak.paris/ -/raw/  master/package.json',
  }
}

export const convertToRawUrl = ( url, gitInfos ) => {
}

export const extractGitInfos = (str) => {

  console.log( '-U- extractGitInfos > str : ', str ) 
  let provider, orga, repo, branch, rawRoot, remaining
  let gitRef, trimmed, split, rawUrl

  if ( str.startsWith( gitProviders.github.root ) || str.startsWith( gitProviders.github.raw ) ) {
    provider = 'github'
    gitRef = gitProviders.github
    rawUrl = str.startsWith(gitRef.raw)
    trimmed = rawUrl ? str.replace(gitRef.raw, '') : str.replace(gitRef.root, '')
    split = trimmed.split('/')
    orga = split[0]
    repo = split[1]
    branch = rawUrl ? split[2] : split[3]
    remaining = rawUrl ? split.splice(3).join('/') : split.splice(4).join('/')
  } 
  else {
    provider = 'gitlab'
    gitRef = gitProviders.gitlab
    // rawUrl = str.includes('/-/raw/')
    trimmed = str.replace(gitRef.root, '')
    split = trimmed.split('/')
    orga = split[0]
    repo = split[1]
    branch = split[4]
    remaining = split.splice(5).join('/')
  }

  rawRoot = `${gitRef.raw}${orga}/${repo}`
  if (orga === 'github') {
    rawRoot = `${rawRoot}${gitRef.fix}/${branch}/`
  } else {
    rawRoot = `${rawRoot}${gitRef.fix}/${branch}/`
  }

  return {
    gitProvider: provider,
    gitOrga: orga,
    gitRepo: repo,
    gitBranch: branch || 'master',
    gitRawRoot: rawRoot,
    remainingString: remaining,
  }
}


