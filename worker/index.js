export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const hiddenProductRoutes = new Set([
      "/direct-assignment",
      "/direct-assignment.html",
      "/securitisation",
      "/securitisation.html",
      "/securitization",
      "/securitization.html",
    ]);

    if (hiddenProductRoutes.has(url.pathname.toLowerCase())) {
      return new Response("Not Found", {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-robots-tag": "noindex, nofollow",
        },
      });
    }

    if (url.pathname.endsWith("/")) {
      url.pathname += "index.html";
    }

    return env.ASSETS.fetch(new Request(url, request));
  },
};
