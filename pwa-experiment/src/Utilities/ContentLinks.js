export function resolveContentLink(link) {
  switch (link.type) {
    case "portfolioItem":
      return "/portfolioItems/" + link.url_slug;
    default:
      return "";
  }
}