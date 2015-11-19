export function getPagerInfo(items, opts) {
  const defaultOpts = {
    page: 1,
    perPage: 48,
  };
  const page = opts.page || defaultOpts.page;
  const perPage = opts.perPage || defaultOpts.perPage;
  const totalItems = items.length;
  const maxPage = Math.ceil(totalItems / perPage);
  const pageIndex = page < maxPage ? page : maxPage;
  const itemsStart = (pageIndex - 1) * perPage;
  const itemsEnd = itemsStart + perPage;
  const list = items.slice(itemsStart, itemsEnd);
  return {
    hasLess: pageIndex > 1,
    hasMore: pageIndex < maxPage,
    list,
    maxPage,
    pageIndex,
    perPage,
    totalItems,
  };
}
