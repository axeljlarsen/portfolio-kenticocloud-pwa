export function resolveContentLink(link) {
  switch (link.type) {
    case "portfolioItem":
      return "/portfolio-embed/" + link.url_slug;
    default:
      return "";
  }
}