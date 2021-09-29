export function appendComments(commentBox) {
  const commentScript = document.createElement('script')
  const theme = typeof window !== 'undefined' && window.__theme
  const commentsTheme = theme === 'dark' ? 'photon-dark' : 'github-light'

  commentScript.async = true
  commentScript.src = 'https://utteranc.es/client.js'
  commentScript.setAttribute('repo', 'ArthurPedroti/comments')
  commentScript.setAttribute('issue-term', 'pathname')
  commentScript.setAttribute('id', 'utterances')
  commentScript.setAttribute('theme', commentsTheme)
  commentScript.setAttribute('crossorigin', 'anonymous')

  if (commentBox && commentBox.current) {
    commentBox.current.appendChild(commentScript)
  } else {
    console.log(`Error adding utterances comments on: ${commentBox}`)
  }
}
