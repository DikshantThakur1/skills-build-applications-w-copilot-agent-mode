export function buildApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000';
  const protocol = codespaceName ? 'https' : 'http';
  return `${protocol}://${host}/api/${resource}/`;
}
