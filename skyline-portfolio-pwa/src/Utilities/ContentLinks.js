export function resolveContentLink(link) {
  switch (link.type) {
    case "portfolioItem":
      return "/webportfolio/" + link.url_slug;
    default:
      return "";
  }
}