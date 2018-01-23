export function resolveContentLink(link) {
  switch (link.type) {
    case "portfolioItem":
      return "/portfolio/" + link.url_slug;
    default:
      return "";
  }
}