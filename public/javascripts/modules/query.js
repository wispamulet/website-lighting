function queryOpen(query, overlay) {
  query.classList.add('query-display');
  overlay.classList.add('query-display');
}

function queryClose(query, overlay) {
  query.classList.remove('query-display');
  overlay.classList.remove('query-display');
}

export { queryOpen, queryClose };
