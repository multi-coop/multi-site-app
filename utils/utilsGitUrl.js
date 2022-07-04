
export const gitProviders = {
  github: {
    root: 'https://github.com/',
    rootFix: '/blob',
    raw: 'https://raw.githubusercontent.com/',
    fix: ''
    // root: 'https://github.com                /co-demos/ multi-site-contents/ blob/ master/config/global.md',
    // raw:  'https://raw.githubusercontent.com /co-demos/ multi-site-contents/       master/config/global.md',
  },
  gitlab: {
    root: 'https://gitlab.com/',
    rootFix: '/~/blob',
    raw: 'https://gitlab.com/',
    apiFix: 'api/v4',
    fix: '/-/raw/'
    // root: 'https://gitlab.com/ multi-coop/ gitribute-documentation-content/ -/blob/ master/config/global.md'
    // raw:  'https://gitlab.com/ multi-coop/ gitribute-documentation-content/ -/raw/  master/config/global.md',
  },
  localhost: {
    root: 'http://localhost',
    rootFix: 'http://localhost',
    raw: 'http://localhost',
    apiFix: 'http://localhost',
    fix: undefined
    // root: '/Users/jpy/Dropbox/_FLASK/_MULTI/gitribute-project/ gitribute-documentation-content/ config/global.md'
    // raw:  '/Users/jpy/Dropbox/_FLASK/_MULTI/gitribute-project/ gitribute-documentation-content/ config/global.md',
  }
}

export const extractGitInfos = (str) => {

  // console.log( '-U- utilsGitUrl > extractGitInfos > str : ', str ) 
  let provider, orga, repo, branch, remaining, api
  let gitRef, trimmed, split, rawUrl, publicRoot
  let port, localFolder

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
    api = gitRef.apiFix
    /*
      fileraw: "https://raw.githubusercontent.com/multi-coop/multi-site-contents/main/config/global.md"
      gitApi: undefined
      gitBranch: "main"
      gitOrga: "multi-coop"
      gitProvider: "github"
      gitPublicRoot: "https://github.com/multi-coop/multi-site-contents/blob/main/"
      gitRawRoot: "https://raw.githubusercontent.com/multi-coop/multi-site-contents/main/"
      gitRepo: "multi-site-contents"
      gitRepoUrl: "https://github.com/multi-coop/multi-site-contents"
      remainingString: "config/global.md"
    */
  } else if ( str.startsWith( gitProviders.gitlab.root ) || str.startsWith( gitProviders.gitlab.raw ) ) {
    provider = 'gitlab'
    gitRef = gitProviders.gitlab
    rawUrl = str.includes('/-/raw/')
    // trimmed = str.replace(gitRef.root, '')
    // split = trimmed.split('/')
    // orga = split[0]
    // repo = split[1]
    // branch = split[4]
    // remaining = split.splice(5).join('/')
    const urlCut = str.split('//')
    const host = urlCut[1].split('/')[0]
    trimmed = str.replace(gitRef.root, '')
    split = trimmed.split('/')
    orga = split[0]
    repo = split[1]
    branch = split[4]
    remaining = split.splice(5).join('/')
    api = `https://${host}/${gitRef.apiFix}`
   } else if ( str.startsWith( gitProviders.localhost.root ) ) {
    provider = 'localhost'
    orga = 'localhost-orga'
    branch = 'localhost-branch'
    gitRef = gitProviders.localhost
    const urlCut = str.split('//')
    // console.log( '-U- utilsGitUrl > extractGitInfos > urlCut : ', urlCut )
    const urlPath = urlCut[1].split('/')
    const host = urlPath[0]
    // console.log( '-U- utilsGitUrl > extractGitInfos > host : ', host )
    port = host.split(':')[1]
    // console.log( '-U- utilsGitUrl > extractGitInfos > port : ', port )
    const folderIdx = urlPath.indexOf('config') - 1
    // console.log( '-U- utilsGitUrl > extractGitInfos > folderIdx : ', folderIdx )
    repo = urlPath[folderIdx]
    // console.log( '-U- utilsGitUrl > extractGitInfos > repo : ', repo )
    localFolder = [...urlPath].splice(1, folderIdx).join('/')
    // console.log( '-U- utilsGitUrl > extractGitInfos > localFolder : ', localFolder )
    remaining = [...urlPath].splice(folderIdx + 1 ).join('/')
    // console.log( '-U- utilsGitUrl > extractGitInfos > remaining : ', remaining )
    /*
      fileraw: "http:/localhost:8800/content/config/global.md"
      gitApi: ""
      gitBranch: "local-branch"
      gitOrga: "local-orga"
      gitProvider: "local"
      gitPublicRoot: "http:/localhost:8800/content/"
      gitRawRoot: "http:/localhost:8800/content/"
      gitRepo: "gitribute-documentation-content"
      gitRepoUrl: "http:/localhost:8800/content/"
      remainingString: "config/global.md"
    */
  }

  let rawRoot, publicRootUrl, fileRaw

  if (provider === 'github' || provider === 'gitlab') {
    // https://raw.githubusercontent.com/multi-coop/gitribute-content-test/main/texts/markdown/jailbreak-devient-multi-fr.md
    publicRootUrl = `${gitRef.root}${orga}/${repo}`
    rawRoot = `${gitRef.raw}${orga}/${repo}${gitRef.fix}/${branch}/`
    publicRoot = `${publicRootUrl}${gitRef.rootFix}/${branch}/`
    fileRaw = `${rawRoot}${remaining}`
  } else if (provider === 'localhost') {
    // file://Users/jpy/Dropbox/_FLASK/_MULTI/gitribute-project/gitribute-documentation-content/config/global.md
    publicRootUrl = publicRoot = rawRoot = `${gitRef.rootFix}:${port}/${localFolder}/`
    fileRaw = `${rawRoot}${remaining}`
    api = ''
  }

  return {
    gitProvider: provider,
    gitApi: api,
    fileraw: fileRaw,
    gitOrga: orga,
    gitRepo: repo,
    gitBranch: branch || 'master',
    gitRepoUrl: publicRootUrl,
    gitRawRoot: rawRoot,
    gitPublicRoot: publicRoot,
    remainingString: remaining
  }
}


